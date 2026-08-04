from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from .filters import TouristPlaceFilter
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status 
from django.utils import timezone
from django.contrib.gis.geos import Point
from django.contrib.gis.db.models.functions import Distance
from django.contrib.gis.measure import D
import math


from .models import (Category, District, TouristPlace, TouristPlaceImage, 
                     Review)
from .serializers import( CategorySerializer, DistrictSerializer, 
                         TouristPlaceSerializer, TouristPlaceImageSerializer,
                           ReviewSerializer, TripPlannerSerializer)
from .permissions import TouristPlacePermission, ReviewPermission
from apps.accounts.permissions import IsMunicipalityAdminOrSuperAdmin
    
class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsMunicipalityAdminOrSuperAdmin]

class DistrictViewSet(viewsets.ModelViewSet):
    queryset = District.objects.all()
    serializer_class = DistrictSerializer
    permission_classes = [IsMunicipalityAdminOrSuperAdmin]

class TouristPlaceViewSet(viewsets.ModelViewSet):
    serializer_class = TouristPlaceSerializer
    permission_classes = [TouristPlacePermission]

    def get_queryset(self):
        queryset = TouristPlace.objects.all()

        user = self.request.user

        # Public visitors
        if not user.is_authenticated:
            return queryset.filter(
                status="approved",
                is_active=True,
            )
        # Admins
        return queryset

    filter_backends = [
        DjangoFilterBackend,
        SearchFilter,
        OrderingFilter,
    ]
    filterset_class = TouristPlaceFilter
    search_fields = [
        'name',
        'description',
        'address',
    ]
    ordering_fields = [
        'name',
        'created_at',
    ]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    @action(detail=True, methods=["post"])
    def approve(self, request, pk=None):
        place = self.get_object()

        place.status = "approved"
        place.approved_by = request.user
        place.approved_at = timezone.now()
        place.rejection_reason = ""

        place.save()

        return Response({
            "message": "Place approved successfully"
        })
    @action(detail=True, methods=["post"])
    def reject(self, request, pk=None):
        place = self.get_object()

        place.status = "rejected"
        place.approved_by = request.user

        place.rejection_reason = request.data.get(
            "reason",
            ""
        )

        place.save()

        return Response({
            "message": "Place rejected successfully"
        })
    
    @action(detail=True, methods=["get"])
    def nearby(self, request, pk=None):
        place = self.get_object()

        nearby_places = (
            TouristPlace.objects
            .exclude(id=place.id)
            .annotate(
                distance=Distance(
                    "location",
                    place.location,
                )
            )
            .filter(
                location__distance_lte=(
                    place.location,
                    D(km=50),
                )
            )
            .order_by("distance")[:3]
        )

        serializer = self.get_serializer(
            nearby_places,
            many=True,
        )

        return Response(serializer.data)
    
    @action(detail=False, methods=["get"])
    def radius(self, request):

        lat = request.query_params.get("lat")
        lng = request.query_params.get("lng")
        radius = request.query_params.get("radius")

        if not lat or not lng or not radius:
            return Response(
                {
                    "error": "lat, lng and radius are required."
                },
                status=400,
            )

        point = Point(
            float(lng),
            float(lat),
            srid=4326,
        )

        places = (
            TouristPlace.objects
            .annotate(
                distance=Distance(
                    "location",
                    point,
                )
            )
            .filter(
                location__distance_lte=(
                    point,
                    D(km=float(radius)),
                )
            )
            .order_by("distance")
        )

        serializer = self.get_serializer(
            places,
            many=True,
        )

        return Response(serializer.data)

   
class TouristPlaceImageViewSet(viewsets.ModelViewSet):
    queryset = TouristPlaceImage.objects.all()
    serializer_class = TouristPlaceImageSerializer
    permission_classes = [TouristPlacePermission]

    def create(self, request, *args, **kwargs):
        place_id = request.data.get("place")

        if not place_id:
            return Response(
                {"error": "place is required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [ReviewPermission]

    def get_queryset(self):
        queryset = Review.objects.select_related(
            'user','place'
        )

        place_id = self.request.query_params.get('place')

        if place_id:
            queryset = queryset.filter(place_id=place_id)
        return queryset
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

# This is an APIView because it is not backed by a model viewset.
class TripPlannerView(APIView):
    def post(self, request):
        serializer = TripPlannerSerializer(
            data=request.data
        )
        serializer.is_valid(
            raise_exception=True
        )
        data = serializer.validated_data
        province = data['province']
        days = data['days']
        categories = data['categories']

        places = TouristPlace.objects.filter(
            status="approved",
            district__province=province,
        )

        if categories:
            places = places.filter(
                category_id__in=categories
            )

        places = places.order_by(
            '-is_featured',
            '-created_at',
        )
        places = list(places)
        max_places = days * 3
        places = places[:max_places]
        places_per_day = math.ceil(
            len(places) / days
        )
        itinerary = []
        for day in range(days):

            start = day * places_per_day
            end = start + places_per_day

            day_places = places[start:end]

            if not day_places:
                break

            itinerary.append(
                {
                    "day": day + 1,
                    "places": TouristPlaceSerializer(
                        day_places,
                        many=True,
                        context={"request": request},
                    ).data,
                }
            )
        return Response(
            {
                "province": province,
                "days": itinerary,
            }
        )
        
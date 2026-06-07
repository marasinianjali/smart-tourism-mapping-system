from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, AllowAny
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from .filters import TouristPlaceFilter
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status 

from .models import Category, District, TouristPlace, TouristPlaceImage
from .serializers import( CategorySerializer, DistrictSerializer, 
                         TouristPlaceSerializer, TouristPlaceImageSerializer)
from .permissions import TouristPlacePermission
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
    queryset = TouristPlace.objects.all()
    serializer_class = TouristPlaceSerializer
    permission_classes = [TouristPlacePermission]

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


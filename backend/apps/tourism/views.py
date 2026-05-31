from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from .filters import TouristPlaceFilter

from .models import Category, District, TouristPlace
from .serializers import( CategorySerializer, DistrictSerializer, 
                         TouristPlaceSerializer)
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


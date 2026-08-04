from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import (
    CategoryViewSet,
    DistrictViewSet,
    TouristPlaceViewSet,
    TouristPlaceImageViewSet,
    ReviewViewSet,
    TripPlannerView
)
app_name = "tourism"

router = DefaultRouter()

router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'districts', DistrictViewSet, basename='district')
router.register(r'places', TouristPlaceViewSet, basename='tourist-place')
router.register(r'images', TouristPlaceImageViewSet, basename='tourist-image')
router.register(r'reviews', ReviewViewSet, basename='review')


# This is a service endpoint
urlpatterns = router.urls + [
    path('trip-planner/', TripPlannerView.as_view(), name='trip-planner'),
]
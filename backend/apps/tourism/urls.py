from rest_framework.routers import DefaultRouter

from .views import (
    CategoryViewSet,
    DistrictViewSet,
    TouristPlaceViewSet,
    TouristPlaceImageViewSet,
    ReviewViewSet,
)
app_name = "tourism"

router = DefaultRouter()

router.register(r"categories", CategoryViewSet, basename="category")
router.register(r"districts", DistrictViewSet, basename="district")
router.register(r"places", TouristPlaceViewSet, basename="tourist-place")
router.register(r'images', TouristPlaceImageViewSet, basename='tourist-image')
router.register(r'reviews', ReviewViewSet, basename='review')

urlpatterns = router.urls
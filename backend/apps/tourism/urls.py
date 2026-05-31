from rest_framework.routers import DefaultRouter

from .views import (
    CategoryViewSet,
    DistrictViewSet,
    TouristPlaceViewSet,
)
app_name = "tourism"

router = DefaultRouter()

router.register(r"categories", CategoryViewSet, basename="category")

router.register(r"districts", DistrictViewSet, basename="district")

router.register(r"places", TouristPlaceViewSet, basename="tourist-place")

urlpatterns = router.urls
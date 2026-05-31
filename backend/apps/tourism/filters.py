import django_filters
from .models import TouristPlace


class TouristPlaceFilter(django_filters.FilterSet):
    province = django_filters.CharFilter(
        field_name='district__province'
    )

    class Meta:
        model = TouristPlace
        fields = [
            'category',
            'district',
            'province',
            'is_featured',
            'is_active',
        ]
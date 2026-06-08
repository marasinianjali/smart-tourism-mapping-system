from rest_framework import serializers
from .models import Category, District, TouristPlace, TouristPlaceImage

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"

class DistrictSerializer(serializers.ModelSerializer):
    class Meta:
        model = District
        fields = "__all__"

class TouristPlaceSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(
        source="category.name", read_only=True
    )
    district_name = serializers.CharField(
        source="district.name", read_only=True
    )
    province_name = serializers.CharField(
        source="district.province", read_only=True
    )
    created_by_username = serializers.CharField(
        source="created_by.full_name", read_only=True
    )

    class Meta:
        model = TouristPlace
        fields = "__all__"

class TouristPlaceImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = TouristPlaceImage
        fields = "__all__"
        read_only_fields = ["id"]

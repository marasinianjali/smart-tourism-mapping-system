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

class TouristPlaceImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = TouristPlaceImage
        fields = [
            "id",
            "image",
            "caption",
            "is_primary",
        ]

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
    approved_by_username = serializers.CharField(
        source="approved_by.full_name", read_only=True
    )
    images = TouristPlaceImageSerializer(
        many=True,
        read_only=True,
    )
    primary_image = serializers.SerializerMethodField()

    class Meta:
        model = TouristPlace
        fields = "__all__"

    def get_primary_image(self, obj):
        image = obj.images.filter(is_primary=True).first()

        if image:
            return image.image.url

        image = obj.images.first()

        if image:
            return image.image.url

        return None


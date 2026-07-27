from rest_framework import serializers
from .models import Category, District, TouristPlace, TouristPlaceImage, Review

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"

class DistrictSerializer(serializers.ModelSerializer):

    province_display = serializers.CharField(
        source="get_province_display",
        read_only=True
    )

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

class ReviewSerializer(serializers.ModelSerializer):
    user_full_name = serializers.CharField(
        source="user.full_name",
        read_only=True,
    )

    class Meta:
        model = Review
        fields = [
            "id",
            "place",
            "user",
            "user_full_name",
            "rating",
            "comment",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "user",
            "created_at",
            "updated_at",
        ]
    def validate(self, attrs):
        user = self.context["request"].user

        place = attrs.get("place")

        if place is None and self.instance:
            place = self.instance.place

        if (
            Review.objects.filter(
                user=user,
                place=place,
            )
            .exclude(
                id=self.instance.id if self.instance else None
            )
            .exists()
        ):
            raise serializers.ValidationError(
                "You have already reviewed this place."
            )

        return attrs

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
    average_rating = serializers.SerializerMethodField()
    review_count = serializers.SerializerMethodField()
    reviews = ReviewSerializer(many=True, read_only=True)
    distance = serializers.SerializerMethodField()

    class Meta:
        model = TouristPlace
        fields = [
            "id",
            "name",
            "description",
            "category",
            "category_name",
            "district",
            "district_name",
            "province_name",
            "address",
            "latitude",
            "longitude",
            "status",
            "created_by",
            "created_by_username",
            "approved_by",
            "approved_by_username",
            "approved_at",
            "rejection_reason",
            "is_active",
            "is_featured",
            "images",
            "primary_image",
            "average_rating",
            "review_count",
            "reviews",
            "distance",
        ]

    def get_primary_image(self, obj):
        image = obj.images.filter(is_primary=True).first()

        if image:
            return image.image.url

        image = obj.images.first()

        if image:
            return image.image.url

        return None
    
    def get_average_rating(self, obj):
        reviews = obj.reviews.all()

        if not reviews.exists():
            return 0

        average = (
            sum(review.rating for review in reviews)
            / reviews.count()
        )

        return round(average, 1)


    def get_review_count(self, obj):
        return obj.reviews.count()
    
    def get_distance(self, obj):
        if hasattr(obj, "distance"):
            return round(obj.distance.km, 2)
        return None


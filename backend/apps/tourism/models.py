from django.db import models
from apps.common.models import TimeStampedModel
from django.conf import settings
from django.core.validators import MinValueValidator, MaxValueValidator
from apps.common.models import TimeStampedModel


class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name
    

class District(models.Model):
    class Province(models.TextChoices):
        KOSHI = "KOSHI", "Koshi"
        MADESH = "MADESH", "Madhesh"
        BAGMATI = "BAGMATI", "Bagmati"
        GANDAKI = "GANDAKI", "Gandaki"
        LUMBINI = "LUMBINI", "Lumbini"
        KARNALI = "KARNALI", "Karnali"
        SUDURPASHCHIM = "SUDURPASHCHIM", "Sudurpashchim"

    name = models.CharField(max_length=100)
    province = models.CharField(
        max_length=20,
        choices=Province.choices
    )

    def __str__(self):
        return self.name
    
class TouristPlace(TimeStampedModel):
    STATUS_CHOICES = (
    ("pending", "Pending"),
    ("approved", "Approved"),
    ("rejected", "Rejected"),
    )
    name = models.CharField(max_length=200)
    description = models.TextField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    district = models.ForeignKey(District, on_delete=models.CASCADE)
    address = models.CharField(max_length=255, blank=True)
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)
    status = models.CharField(
            max_length=20,
            choices=STATUS_CHOICES,
            default="pending",
        )
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, 
                                   null=True, blank=True)
    approved_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, 
                                    null=True, blank=True, related_name='approved_places')
    approved_at = models.DateTimeField(null=True, blank=True)
    rejection_reason = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)
    is_featured = models.BooleanField(default=False)

    def __str__(self):
        return self.name 
    
class TouristPlaceImage(models.Model):
    place = models.ForeignKey(TouristPlace, related_name='images',
                               on_delete=models.CASCADE)
    image = models.ImageField(upload_to='tourist_places/')
    caption = models.CharField(max_length=255, blank=True)
    is_primary = models.BooleanField(default=False)

    def __str__(self):
        return f"Image for {self.place.name} - {self.caption}"
    
class Review(TimeStampedModel):
    place = models.ForeignKey(TouristPlace, on_delete=models.CASCADE, 
                              related_name='reviews')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, 
                                   related_name='reviews')
    rating = models.PositiveSmallIntegerField(
        validators=[
            MinValueValidator(1),
            MaxValueValidator(5),
        ]
    )
    comment = models.TextField()
    
    class Meta:
        unique_together = ('place', 'user')
        ordering = ['-created_at']

    def __str__(self):
        return f"Review by {self.user.fullname} for {self.place.name}"
    
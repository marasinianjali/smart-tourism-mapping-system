from django.db import models
from apps.common.models import TimeStampedModel
from django.conf import settings

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
    name = models.CharField(max_length=200)
    description = models.TextField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    district = models.ForeignKey(District, on_delete=models.CASCADE)
    address = models.CharField(max_length=255, blank=True)
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)

    # Track who created and last updated the tourist place
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, 
                                   null=True, blank=True)
    is_active = models.BooleanField(default=True)
    is_featured = models.BooleanField(default=False)

    def __str__(self):
        return self.name 

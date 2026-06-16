from django.contrib import admin

from .models import Category, District, TouristPlace

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    search_fields = ('name',)

@admin.register(District)
class DistrictAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'province')
    search_fields = ('name',)
    list_filter = ('province',)

@admin.register(TouristPlace)
class TouristPlaceAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'category', 'district', 'is_active', 'is_featured', 'latitude', 'longitude', 
                   )
    search_fields = ('name', 'description')
    list_filter = ('category', 'district', 'is_active', 'is_featured')


from django.urls import path 
from .views import property_list, property_detail

urlpatterns = [
    path("", property_list, name="property-list"),
    path("<int:id>/", property_detail, name="property_detail"),
]

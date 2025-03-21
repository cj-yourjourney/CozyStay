from django.db import models
from profiles.models import Profile  # Import your Profile model


class Property(models.Model):
    owner = models.ForeignKey(
        Profile, on_delete=models.CASCADE, related_name="properties"
    )
    title = models.CharField(max_length=255)
    image = models.CharField(max_length=255, null=True, blank=True)
    description = models.TextField(blank=True, null=True)
    price_per_night = models.DecimalField(max_digits=8, decimal_places=2)
    location = models.CharField(max_length=255)
    available = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)

    def __str__(self):
        return self.title

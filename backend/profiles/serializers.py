from .models import Profile 
from rest_framework import serializers
from django.contrib.auth.hashers import make_password


class ProfileSignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Profile
        fields = [
            "name",
            "email",
            "password"
        ]

    def create(self, validated_data):
        profile = Profile(
            name=validated_data["name"],
            email=validated_data["email"],
            password=make_password(validated_data['password'])
        )
        profile.save()
        return profile 

    def validate_email(self, value):
        if Profile.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email is already exsit!!")  
        return value 

    def validate_password(self, value):
        if len(value) < 8:
            raise serializers.ValidationError("Password must be at least 8 characters long.")
        return value        
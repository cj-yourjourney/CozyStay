from .models import Profile 
from rest_framework import serializers
from django.contrib.auth.hashers import make_password, check_password


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


class ProfileLoginSerializer(serializers.Serializer):
    # Define fields for email and password
    email = serializers.EmailField()
    password = serializers.CharField()

    # extract email and password
    def validate(self, data):
        email = data.get('email')
        password = data.get('password')
        print("data in validate function:", data)

        # check if email exists in the database
        try:
            profile = Profile.objects.get(email=email)
        except Profile.DoesNotExist:
            raise serializers.ValidationError("Email does not exist!!")

        # check if password is correct
        if not check_password(password, profile.password):
            raise serializers.ValidationError("Password is incorrect!!")

        data["profile"] = profile
        print("data in validate function:", data)

        return data

    # check if email exists in the database
    # check if password is correct
    # return the profile object if email and password are correct

from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .serializers import ProfileSignupSerializer, ProfileLoginSerializer
# Create your views here.

@api_view(["POST"])
def signup(request):
    print("request data: ", request.data)
    serializer = ProfileSignupSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def login(request):
    seriializer = ProfileLoginSerializer(data=request.data)
    print("request.data in login view:", request.data)
    if seriializer.is_valid():
        profile = seriializer.validated_data["profile"]

        request.session["profile_id"] = profile.id
        return Response({"message": "Login successful"}, status=status.HTTP_200_OK)

    return Response(seriializer.errors, status=status.HTTP_400_BAD_REQUEST)

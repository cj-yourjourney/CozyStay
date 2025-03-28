from django.shortcuts import render
from .models import Property
from .serializers import PropertySerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
# Create your views here.


@api_view(['GET'])
def property_list(request):
    properties = Property.objects.all()
    serializer = PropertySerializer(properties, many=True)

    return Response(serializer.data)


@api_view(["GET"])
def property_detail(request, id):
    try:
        # Get the property by the provided id
        property_instance = Property.objects.get(id=id)
        serializer = PropertySerializer(property_instance)
        return Response(serializer.data)
    except Property.DoesNotExist:
        # If the property doesn't exist, return an error message
        return Response({"error": "Property not found"}, status=404)

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


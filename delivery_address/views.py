from rest_framework import generics
from . import models
from . import serializers


class DeliveryAddressCreate(generics.ListCreateAPIView):
    queryset = models.DeliveryAddress.objects.all()
    serializer_class = serializers.DeliveryAddressSerializer


class DeliveryAddressRetrieve(generics.ListAPIView):
    queryset = models.DeliveryAddress.objects.all()
    serializer_class = serializers.DeliveryAddressSerializer

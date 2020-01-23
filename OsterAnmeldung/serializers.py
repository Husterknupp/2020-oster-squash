from rest_framework import serializers
from .models import Registration


class RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Registration
        fields = ('id', 'emailAddress', 'timeFrameBegin', 'dateOfRegistration', 'adultsCount', 'childCount', 'state')

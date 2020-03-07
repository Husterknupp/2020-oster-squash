from rest_framework import serializers

from .models import Registration


class RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Registration
        # fields for /api/registrations/
        # def to_representation(self, value) is the method that might come in handy later
        fields = ('id', 'timeFrameBegin', 'adultsCount', 'childCount', 'state')


class RegistrationSerializerCreate(serializers.ModelSerializer):
    class Meta:
        model = Registration
        fields = ('id', 'emailAddress', 'timeFrameBegin', 'adultsCount', 'childCount', 'state')

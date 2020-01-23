from rest_framework import viewsets

from .models import Registration
from .serializers import RegistrationSerializer


class RegistrationView(viewsets.ModelViewSet):
    serializer_class = RegistrationSerializer
    queryset = Registration.objects.all()

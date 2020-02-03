import uuid

from rest_framework import viewsets

from .models import Registration
from .serializers import RegistrationSerializer


class State:
    WAITING_FOR_SANITY_CHECK = 'WAITING_FOR_SANITY_CHECK'
    CHECKED = 'CHECKED'
    DELETED = 'DELETED'


class RegistrationView(viewsets.ModelViewSet):
    serializer_class = RegistrationSerializer
    # noinspection PyUnresolvedReferences
    queryset = Registration.objects.all()

    def create(self, request, *args, **kwargs):
        request.data['id'] = str(uuid.uuid4())
        request.data['state'] = State.WAITING_FOR_SANITY_CHECK
        return super(RegistrationView, self).create(request, args, kwargs)

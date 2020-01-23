from django.contrib import admin

from .models import Registration


class RegistrationAdmin(admin.ModelAdmin):
    list_display = ('emailAddress', 'timeFrameBegin', 'adultsCount', 'childCount', 'dateOfRegistration', 'state')


# Register your models here.
admin.site.register(Registration, RegistrationAdmin)

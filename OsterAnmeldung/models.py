from django.db import models


class Registration(models.Model):
    id = models.CharField(primary_key=True, unique=True, max_length=120)
    emailAddress = models.TextField()
    timeFrameBegin = models.DateTimeField()
    dateOfRegistration = models.DateTimeField(auto_now=True)
    adultsCount = models.IntegerField()
    childCount = models.IntegerField()
    state = models.CharField(max_length=120)

    def _str_(self):
        return str(self.timeFrameBegin) + " (" + str(self.emailAddress) + ")"

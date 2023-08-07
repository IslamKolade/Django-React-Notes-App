from django.db import models

# Create your models here.
class Note(models.Model):
    title = models.CharField(null=True, blank=True, max_length=200)
    body = models.TextField(null=True, blank=True)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title[0:50]


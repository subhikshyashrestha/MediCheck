from django.db import models
from django.contrib.auth.models import User

class Medicine(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    dosage = models.CharField(max_length=100)
    reminder_time = models.TimeField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class InteractionCheck(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    medicine_a = models.CharField(max_length=200)
    medicine_b = models.CharField(max_length=200)
    severity = models.CharField(max_length=50)
    ai_explanation = models.TextField()
    checked_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.medicine_a} + {self.medicine_b}"
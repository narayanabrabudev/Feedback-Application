from django.db import models

class Feedback(models.Model):
    FEEDBACK_TYPES = [
        ("Bug Report", "Bug Report"),
        ("Feature Request", "Feature Request"),
        ("General Feedback", "General Feedback"),
        ("Complaint", "Complaint"),
        ("Appreciation", "Appreciation"),
    ]

    name = models.CharField(max_length=100, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    feedback_type = models.CharField(
        max_length=20,
        choices=FEEDBACK_TYPES,
        default="General Feedback"
    )
    rating = models.IntegerField(blank=True, null=True)
    subject = models.CharField(max_length=200, blank=True, null=True)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name or 'Anonymous'} - {self.feedback_type}"

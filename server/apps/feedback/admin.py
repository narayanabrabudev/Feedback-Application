from django.contrib import admin
from .models import Feedback

@admin.register(Feedback)
class FeedbackAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "feedback_type", "rating", "subject", "created_at")
    list_filter = ("feedback_type", "rating", "created_at")
    search_fields = ("name", "email", "subject", "message")
    ordering = ("-created_at",)

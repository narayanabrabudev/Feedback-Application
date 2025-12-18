from rest_framework import serializers
from ..models import Feedback
import re

class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = '__all__'

    # name - optional, stripped, cannot be empty if provided
    def validate_name(self, value):
        if value:
            value = value.strip()
            if not value:
                raise serializers.ValidationError("Name cannot be empty if provided")
        return value

    # email - optional, must be valid if provided
    def validate_email(self, value):
        if value and not re.match(r"[^@\s]+@[^@\s]+\.[^@\s]+$", value):
            raise serializers.ValidationError("Email is not valid")
        return value

    # phone - optional, digits + allowed symbols
    def validate_phone(self, value):
        if value and not re.match(r"^[0-9\s\-()+]+$", value):
            raise serializers.ValidationError("Phone number is not valid")
        return value

    # feedback_type - optional, must be in allowed list
    def validate_feedback_type(self, value):
        allowed = ["Bug Report", "Feature Request", "General Feedback", "Complaint", "Appreciation"]
        if value and value not in allowed:
            raise serializers.ValidationError(f"Feedback type must be one of {allowed}")
        return value or "General Feedback"

    # rating - optional, 1-5
    def validate_rating(self, value):
        if value is not None:
            if not (1 <= value <= 5):
                raise serializers.ValidationError("Rating must be between 1 and 5")
        return value

    # subject - optional, stripped, cannot be empty if provided
    def validate_subject(self, value):
        if value:
            value = value.strip()
            if not value:
                raise serializers.ValidationError("Subject cannot be empty if provided")
        return value

    # message - required
    def validate(self, data):
        message = data.get("message")
        if not message or not str(message).strip():
            raise serializers.ValidationError({"message": "Message is required"})
        return data

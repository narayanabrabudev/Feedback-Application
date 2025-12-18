from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from datetime import datetime

from .services.mongo_service import save_feedback, get_all_feedback
from .services.file_service import save_to_file
from .serializers.feedback_serializer import FeedbackSerializer


@api_view(["POST"])
def submit_feedback(request):
    raw = request.data
    # Normalize request data to a plain dict (works for dict or QueryDict)
    try:
        if hasattr(raw, "dict"):
            data = raw.dict()
        elif isinstance(raw, dict):
            data = raw.copy()
        else:
            data = dict(raw)
    except Exception:
        data = dict(raw)

    # Validate input using DRF serializer
    serializer = FeedbackSerializer(data=data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Use validated data (convert to plain dict)
    data = dict(serializer.validated_data)

    # Add timestamp (datetime) — file_service will convert to ISO when writing
    data["created_at"] = datetime.utcnow()

    # Save to MongoDB
    save_feedback(data)

    # Save to JSON file
    save_to_file(data)

    return Response(
        {"message": "Feedback submitted successfully"},
        status=status.HTTP_201_CREATED
    )



@api_view(["GET"])
def list_feedback(request):
    feedbacks = get_all_feedback()
    return Response(feedbacks, status=status.HTTP_200_OK)

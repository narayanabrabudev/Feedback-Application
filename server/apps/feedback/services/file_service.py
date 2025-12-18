import json
import os
from datetime import datetime
from django.conf import settings
from bson import ObjectId

# Project root (same directory where manage.py exists)
BASE_DIR = settings.BASE_DIR

DATA_DIR = os.path.join(BASE_DIR, "data", "user_info")
FILE_PATH = os.path.join(DATA_DIR, "user_info.json")


def save_to_file(data):
    """
    Save a single feedback dict to user_info.json.
    Ensures the JSON file always contains a list of feedback objects.
    """

    # Create directory if it doesn't exist
    os.makedirs(DATA_DIR, exist_ok=True)

    # Load existing data if file exists and is not empty
    if os.path.exists(FILE_PATH) and os.stat(FILE_PATH).st_size > 0:
        try:
            with open(FILE_PATH, "r", encoding="utf-8") as f:
                existing = json.load(f)

            # If existing data is a dict, convert to list
            if isinstance(existing, dict):
                existing = [existing]

            # If existing data is not a list, reset to empty list
            elif not isinstance(existing, list):
                existing = []

        except json.JSONDecodeError:
            existing = []
    else:
        existing = []

    # Ensure datetimes in `data` are JSON-serializable (ISO strings)
    def _convert_datetimes(obj):
        if isinstance(obj, dict):
            return {k: _convert_datetimes(v) for k, v in obj.items()}
        if isinstance(obj, list):
            return [_convert_datetimes(v) for v in obj]
        if isinstance(obj, datetime):
            return obj.isoformat()
        # Convert MongoDB ObjectId to string for JSON serialization
        if isinstance(obj, ObjectId):
            return str(obj)
        return obj

    safe_data = _convert_datetimes(data)

    # Append new feedback
    existing.append(safe_data)

    # Write back to file
    with open(FILE_PATH, "w", encoding="utf-8") as f:
        json.dump(existing, f, indent=4)

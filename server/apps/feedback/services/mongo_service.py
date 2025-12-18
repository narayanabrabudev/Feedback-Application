from pymongo import MongoClient
from datetime import datetime

client = MongoClient("mongodb://localhost:27017/")
db = client["feedback_db"]
collection = db["feedbacks"]


def save_feedback(data):
    """
    Insert feedback into MongoDB without mutating the caller's dict.
    Stores `created_at` as a datetime in the DB.
    """
    doc = data.copy()
    doc["created_at"] = datetime.utcnow()
    collection.insert_one(doc)


def get_all_feedback():
    feedbacks = list(collection.find({}, {"_id": 0}))
    return feedbacks

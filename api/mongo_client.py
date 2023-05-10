import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv(dotenv_path="./.env.local")

MONGO_URL = os.environ.get("MONGO_URL", "mongo")  # docker will resolve mongo
MONGO_USERNAME = os.environ.get("MONGO_USERNAME", "root")
MONGO_PASSWORD = os.environ.get("MONGO_PASSWORD", "")
MONGO_PORT = os.environ.get("MONGO_PORT", 27017)

mongo_client = MongoClient(
  host=MONGO_URL,
  username=MONGO_USERNAME,
  password=MONGO_PASSWORD,
  port=MONGO_PORT,
)


def insert_test_document():
    """Inserts sample document to the test_collection in the test db"""
    db = mongo_client.test
    test_collention = db.collection
    res = test_collention.insert_one({"name": "Irina", "student": True})
    print(res)
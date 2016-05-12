from pymongo import MongoClient

client = MongoClient()

def get(query):
    census = []
    if not query or not isinstance(query, dict):
        return census
    db = client.blue
    for c in db.census.find(query):
        del c['_id']
        census.append(c)
    return census
  

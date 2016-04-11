import requests

service_url = "http://geocoding.geo.census.gov/geocoder/geographies/coordinates?x={1}&y={0}&vintage=Census2010_Census2010&benchmark=Public_AR_Census2010&format=json"

def from_coordinates(lat, lon):
    response = requests.get(service_url.format(lat, lon))
    # Function to deep search a dict
    def find(obj, key):
        if isinstance(obj, list):
            for i in obj:
                item = find(i, key)
                if item is not None:
                    return item
        if isinstance(obj, dict):
            if key in obj: return obj[key]
            for k, v in obj.items():
                item = find(v, key)
                if item is not None:
                    return item
    county = find(response.json(), "COUNTY")
    state = find(response.json(), "STATE")
    # Return the County and State codes
    return county, state

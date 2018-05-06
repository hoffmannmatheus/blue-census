import requests

service_url = 'https://maps.googleapis.com/maps/api/geocode/json'
service_options = '?sensor=false&latlng={0},{1}'
service_key= '&key=AIzaSyAbhoz54Q5_pGeVp5hSV57XvonlUj1Ohmw'  # locked for my domain :-)

def from_coordinates(lat, lon):
    url = service_url + service_options.format(lat, lon) + service_key
    response = requests.get(url).json()

    county = None
    state = None

    # Searching Restuls for State and County names.
    # Docs: https://developers.google.com/maps/documentation/geocoding/intro#Results
    if 'results' in response and type(response['results']) == list:
        for res in response['results']:
            if 'address_components' in res and type(res['address_components']) == list:
                for comp in res['address_components']:
                    if 'administrative_area_level_2' in comp['types']:
                        county = comp['long_name']
                    if 'administrative_area_level_1' in comp['types']:
                        state = comp['long_name']
                if state != None and county != None: break

    # Return the County and State names
    return county, state

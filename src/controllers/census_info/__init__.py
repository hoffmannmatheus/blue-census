import services.database as db
import services.county_finder as county_finder


def from_coordinates(args):
    lat = args.get('lat')
    lon = args.get('lon')
    try:
        float(lat)
        float(lon)
    except ValueError:
        return {'success': False, 'error': 'Invalid lat/lon.'}

    # As the current data is county-level, lets discover the county:
    county_code, state_code = county_finder.from_coordinates(lat, lon)
    if not county_code or not state_code:
        return {'success': False, 'error': 'County not found.'}
    
    query = {}
    query['COUNTY'] = county_code
    query['STATE'] = state_code

    # optionals
    query['YEAR'] = translate_year(args.get('year')) \
        if args.has_key('year') \
        else '7' # default year
    query['AGEGRP'] = translate_age(args.get('agegroup')) \
        if args.has_key('agegroup') \
        else '0'

    print(query)
    census = db.get(query)
    return {'success': True, 'results': census}

def from_county(args):
    county = args.get('county')
    return "hih" 

def from_state(args):
    return "hih" 

def translate_year(year):
    # These are the year codes available in the data.
    years = {
        '2010' : '3',
        '2011' : '4',
        '2012' : '5',
        '2013' : '6',
        '2014' : '7'
    }
    return years[year] if year in years else years['2014']

def translate_age(age):
    # Checks if age is a number and is within the accepted range.
    try:
        int_age = int(age)
        return age if 0 <= int_age and int_age <= 18 else '0'
    except ValueError:
        return '0'

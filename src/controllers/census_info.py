from services import database
from services import county_finder


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
    query['CTYNAME'] = county_code
    query['STNAME'] = state_code

    # optionals
    query['YEAR'] = translate_year(args.get('year'))
    query['AGEGRP'] = translate_age(args.get('agegroup'))

    census = database.get(query)
    return {'success': True, 'count': len(census), 'results': census}

def from_name(args):
    query = {}

    if args.has_key('county'):
        query['CTYNAME'] = str(args.get('county'))
    if args.has_key('state'):
        query['STNAME'] = str(args.get('state'))

    if len(query) == 0:
        return {'success': False, 'error': 'Error on County/State name.'}

    # optionals
    query['YEAR'] = translate_year(args.get('year'))
    query['AGEGRP'] = translate_age(args.get('agegroup'))

    census = database.get(query)

    if len(census) == 0:
        return {'success': False, 'error': 'County or State name not found.'}
    return {'success': True, 'count': len(census), 'results': census}

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
    except (ValueError, TypeError):
        return '0'

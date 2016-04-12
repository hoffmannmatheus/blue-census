from flask import Flask
from flask import request, abort, jsonify, render_template
from os.path import abspath, dirname

import controllers.census_info as census_info

app = Flask('blue')

@app.route('/', methods=['GET'])
def index():
    if not request.args.items():
        return render_template('home.html')

    elif request.args.has_key('lat') and request.args.has_key('lon'):
        return jsonify(census_info.from_coordinates(request.args))

    elif request.args.has_key('county') or request.args.has_key('state'):
        return jsonify(census_info.from_name(request.args))

    else:
        abort(400)

@app.errorhandler(400)
def page_not_found(error):
    return 'Error! Maybe you are missing a required argument?', 400

@app.errorhandler(404)
def page_not_found(error):
    return 'This page does not exist', 404

if __name__ == '__main__':
    app.debug = True
    app.root_path = abspath(dirname(__file__))
    app.run()

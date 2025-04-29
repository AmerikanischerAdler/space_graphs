import requests
from flask import Blueprint, render_template
from datetime import datetime

pages = Blueprint("pages", __name__)

@pages.route('/')
@pages.route('/home')
def home():
    spacex_url = "https://api.spacexdata.com/v4/launches/upcoming"
    response = requests.get(spacex_url)
    launches = response.json()

    launches.sort(key=lambda x: x['date_utc'])

    launch_data = []
    for launch in launches[:5]:
        launch_data.append({
            'name': launch['name'],
            'date_utc': launch['date_utc'],
            'id': launch['id'],
            'details': launch.get('details', 'No details available.'),
            'webcast': launch.get('links', {}).get('webcast', ''),
        })

    return render_template("dashboard.html", launches=launch_data)


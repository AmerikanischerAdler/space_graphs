import requests
from flask import Blueprint, render_template
from datetime import datetime

pages = Blueprint("pages", __name__)

@pages.route('/')
@pages.route('/dashboard')
def dashboard():
    rocketlaunch_url = "https://fdo.rocketlaunch.live/json/launches/next/5"
    response = requests.get(rocketlaunch_url)
    launches = response.json().get("result", [])

    launch_data = []
    for launch in launches:
        launch_data.append({
            'name': launch['name'],
            'date_utc': launch.get('win_open', None),
            'provider': launch['provider']['name'],
            'details': launch.get('launch_description', 'No details.'),
            'webcast': f"https://rocketlaunch.live/launch/{launch.get('slug')}",
            'pad_location': launch['pad']['location'] if launch.get('pad') else None,
            'lat': launch['pad']['location'].get('latitude', None) if launch.get('pad') else None,
            'lon': launch['pad']['location'].get('longitude', None) if launch.get('pad') else None
        })

    return render_template("dashboard.html", launches=launch_data)


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
            'datetime': launch['win_open'],
            'location': launch['pad']['location']['name'],
            'provider': launch['provider']['name'],
            'details': launch.get('missions', [{}])[0].get('description', 'No mission description available.')
        })

    return render_template("dashboard.html", launches=launch_data)


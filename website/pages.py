import os
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
        pad = launch.get('pad')
        location = pad.get('location') if pad else {}
        location_name = location.get('name')
        state = location.get('state')
        country = location.get('country')
    
        lat, lon = geocode_location(location_name, state, country)
        weather = get_weather(lat, lon)
    
        launch_data.append({
            'name': launch['name'],
            'date_utc': launch.get('win_open'),
            'provider': launch['provider']['name'],
            'details': launch.get('launch_description', 'No details.'),
            'webcast': f"https://rocketlaunch.live/launch/{launch.get('slug')}",
            'location': location_name,
            'lat': lat,
            'lon': lon,
            'weather': weather
        })

    return render_template("dashboard.html", launches=launch_data)

# Mapping
OPENCAGE_API_KEY = os.environ['OPENCAGE_API_KEY']
GEOCODE_URL = "https://api.opencagedata.com/geocode/v1/json"

def geocode_location(name, state=None, country=None):
    location_str = ", ".join(filter(None, [name, state, country]))
    params = {
        "q": location_str,
        "key": OPENCAGE_API_KEY,
        "limit": 1,
    }

    res = requests.get(GEOCODE_URL, params=params)
    data = res.json()

    if data.get("results"):
        coords = data["results"][0]["geometry"]
        return coords["lat"], coords["lng"]

    return None, None

# Weather
WEATHER_API_KEY = os.environ['WEATHER_MAP_API_KEY']

def get_weather(lat, lon):
    if not lat or not lon:
        return None
    url =f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={WEATHER_API_KEY}&units=metric"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        return {
            'description': data['weather'][0]['description'],
            'temp': data['main']['temp'],
            'wind': data['wind']['speed'],
            'icon': data['weather'][0]['icon']
        }
    return None


# Space Graphs

## Description

An intuitive interface to track satellite data

### Stack

| Type  | Structure | Style | Elements   | Routes  |
| :---: | :-------: | :---: | :--------: | :-----: |
| Flask | HTML5     | CSS3  | JavaScript | Python3 |

### APIs Used

*apis listed here*

## Installation

1) Open Terminal and Clone Repository:

```bash
git clone https://github.com/AmerikanischerAdler/space_graphs
```

2) Install Python:

If python3 is not installed on your machine, run:

**MacOS:**

```bash
brew update 
brew install python3
``` 

**TIP**: For MacOS, be sure that homebrew is installed on your machine. If not, visit https://brew.sh to install.

**Ubuntu:**

```bash
sudo apt update 
sudo apt install python3
```

3) Set Up Virtual Environment:

```bash
pip3 install virtualenv
python3 -m venv venv
source venv/bin/activate
```

4) Install Dependencies:

```bash
pip install -r requirements.txt
```

5) Terminate Virtual Environment:

```bash
deactivate
```

6) Set up API Keys

Create accounts with the following sites:

* OpenCage: [ https://opencagedata.com/ ]

* OpenWeatherMap: [ https://openweathermap.org/api ]

Add the API keys into your .bashrc file:

* OpenCage:

```bash
export OPENCAGE_API_KEY="my_api_key"
```

* OpenWeatherMap:

```bash
export WEATHER_MAP_API_KEY="my_api_key"
```

## Usage

1) Open Terminal

2) Navigate to space_graphs Directory:

```bash
cd space_graphs
```

3) Start Virtual Environment

```bash
python3 -m venv env
source env/bin/activate
```

**TIP**: To terminate your virtual environment, run:

```bash
deactivate
```

4) Start Flask App:

*This will spin up a local backend server*

```bash
python3 app.py
```

**TIP**: To terminate your local server, press CTRL-C

4) Open Web Browser to New Tab or Window

5) Enter Server Address in Search Bar:

You may be able to simply click this link: http://127.0.0.1:5000/


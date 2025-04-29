from flask import Flask

def create_app():
    app = Flask(__name__)

    from .pages import pages

    app.register_blueprint(pages, url_prefix="/")

    return app


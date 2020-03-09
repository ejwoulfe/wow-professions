from flask import Flask, request, jsonify
from flask_sqlalchemy import flask_sqlalchemy
from flask_marshmallow import Marshmallow
import os

# Init App
app = Flask(__name__)


# Run Server
if __name__ == '__main__':
    app.run(debug=True)

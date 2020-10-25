from flask import Flask
import os
from flask_restful import Api, Resource, reqparse
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity
import redis
from rq import Queue, Retry
from flask_socketio import SocketIO




app = Flask(__name__)
api = Api(app)

def register_extensions(app):
    db.init_app(app)
    jwt.init_app(app)
    socketio.init_app(app,async_mode='eventlet', cors_allowed_origins="*",message_queue='redis://localhost:6379/0')


def create_app():
    app = Flask(__name__)

    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get(
        'SQLALCHEMY_DATABASE_URI')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')
    app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY')
    app.config['JWT_BLACKLIST_ENABLED'] = True
    app.config['JWT_BLACKLIST_TOKEN_CHECKS'] = ['access']
    register_extensions(app)

    return app


db = SQLAlchemy()
api = Api()
jwt = JWTManager()
socketio = SocketIO()

redis = redis.Redis("localhost")
queue = Queue(connection=redis)
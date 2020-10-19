# to avoid circular import, must save with import views, models, resources at bottom
# to save without auto-formatting on vs code, `CTRL + K + SHIFT + S`

from flask import Flask
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
import os
import redis
from rq import Queue
import time

app = Flask(__name__)
api = Api(app)

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('SQLALCHEMY_DATABASE_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')
db = SQLAlchemy(app)


@app.before_first_request
def create_tables():
    db.create_all()

app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY')
jwt = JWTManager(app)

# enable blacklisting in configuration
app.config['JWT_BLACKLIST_ENABLED'] = True
# specify what kind of token to check, access
app.config['JWT_BLACKLIST_TOKEN_CHECKS'] = ['access']

##############

redis_instance = redis.Redis("localhost")
queue_object = Queue(connection=redis_instance)

###############

@jwt.token_in_blacklist_loader
def check_if_token_in_blacklist(decrypted_token):
    # @ decorator is called every time client tries to access secured endpoint
    # function will return True or False depending if the passed token is blacklisted
    jti = decrypted_token['jti']
    return revoked_token_model.RevokedTokenModel.is_jti_blacklisted(jti)


from server.resources.user_logout_access import UserLogoutAccess
from server.resources.user_login import UserLogin
from server.resources.user_registration import UserRegistration
from server.models import revoked_token_model
from server.resources.request_new import RequestNew
from server.resources.user_experience import UserExperience

api.add_resource(UserRegistration, '/registration')
api.add_resource(UserLogin, '/login')
api.add_resource(UserLogoutAccess, '/logout/access')
api.add_resource(RequestNew, '/new_request')
api.add_resource(UserExperience, '/experience')

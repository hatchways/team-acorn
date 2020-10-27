from flask import Flask
import os

from models import revoked_token_model
from resources.user_logout_access import UserLogoutAccess
from resources.user_login import UserLogin
from resources.user_registration import UserRegistration
from resources.request_new import RequestNew
from resources.user_experience import UserExperience
from resources.user_get import UserGet
from resources.stripe_checkout import HandlePayment
from resources.review_respond import ReviewRespond
from resources.send_message import SendMessage
from resources.user_get import UserGet
from resources.review_get import ReviewGet

# Testing routes, remove before production
from resources.test_resources.reset_review import ResetReview
from resources.test_resources.reset_user import ResetUser
from resources.test_resources.reset_user_review_count import ResetUserReviewCount
from resources.test_resources.reset_messages import ResetMessages
#######################################

from extensions import db, api, jwt, create_app


def create_api(app):
    api.add_resource(UserRegistration, '/registration')
    api.add_resource(UserLogin, '/login')
    api.add_resource(UserLogoutAccess, '/logout/access')
    api.add_resource(RequestNew, '/new_request')
    api.add_resource(UserExperience, '/experience')
    api.add_resource(UserGet, '/user')
    api.add_resource(ReviewRespond, '/review_respond')
    api.add_resource(SendMessage, '/send_message')
    api.add_resource(ReviewGet, '/review')
    api.add_resource(HandlePayment, '/charge')

    # Routes for testing, remove when in production
    api.add_resource(ResetUser, "/reset_users")
    api.add_resource(ResetReview, "/reset_reviews")
    api.add_resource(ResetUserReviewCount, "/reset_user_review_count")
    api.add_resource(ResetMessages, "/reset_messages")
    ############################################

    api.init_app(app)

    return api


app = create_app()
api = create_api(app)


@app.before_first_request
def create_tables():
    db.create_all()


@jwt.token_in_blacklist_loader
def check_if_token_in_blacklist(decrypted_token):
    # @ decorator is called every time client tries to access secured endpoint
    # function will return True or False depending if the passed token is blacklisted
    jti = decrypted_token['jti']
    return revoked_token_model.RevokedTokenModel.is_jti_blacklisted(jti)

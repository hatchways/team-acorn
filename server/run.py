# to avoid circular import, must save with import views, models, resources at bottom
# to save without auto-formatting on vs code, `CTRL + K + SHIFT + S`

from flask import Flask

import os


from server.models import revoked_token_model
from server.resources.user_logout_access import UserLogoutAccess
from server.resources.user_login import UserLogin
from server.resources.user_registration import UserRegistration
from server.resources.request_new import RequestNew
from server.resources.user_experience import UserExperience
from server.resources.user_get import UserGet

from server.resources.reset_review import ResetReview
from server.resources.reset_user import ResetUser
from server.resources.reset_user_review_count import ResetUserReviewCount

from server.extensions import db, api, jwt, create_app


def create_api(app):
    print("inside create_api")
    # register api

    api.add_resource(UserRegistration, '/registration')
    api.add_resource(UserLogin, '/login')
    api.add_resource(UserLogoutAccess, '/logout/access')
    api.add_resource(RequestNew, '/new_request')
    api.add_resource(UserExperience, '/experience')
    api.add_resource(UserGet, '/user')

    # Routes for testing, remove when in production
    api.add_resource(ResetUser, "/reset_users")
    api.add_resource(ResetReview, "/reset_reviews")
    api.add_resource(ResetUserReviewCount, "/reset_user_review_count")
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

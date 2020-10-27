from flask_restful import Resource, reqparse
from flask_jwt_extended import (
    create_access_token, jwt_required, get_jwt_identity)
from models.review_model import ReviewModel
import json


class RevieweeReviewsGet(Resource):
    # Get reviews that you requested for review
    @jwt_required
    def get(self):
        user_id = get_jwt_identity()

        reviews = ReviewModel.get_reviews(user_id, "reviewee")

        # check if user is participating in the requested review
        if(len(reviews["reviews"]) == 0):
            return {"error": "User with id {} has not made any requests for reviews.".format(user_id)}, 400

        try:
            return reviews, 201
        except:
            return{'error': 'Something went wrong'}, 500

import boto3, botocore, base64
from utils.s3_config import S3_KEY, S3_SECRET, S3_BUCKET
from flask_restful import Resource, reqparse, request
from flask_jwt_extended import (
    create_access_token, jwt_required, get_jwt_identity)
from models.user_model import UserModel
import json


class UserRatingSubmit(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('reviewerId',
                            help='This field cannot be blank', required=True)
        parser.add_argument('rating',
                            help='This field cannot be blank', required=True)
        data = parser.parse_args()
        reviewerId = data["reviewerId"]
        rating = data['rating']
        new_rating = UserModel.update_rating(reviewerId,rating)
        try:
            return {"rating": new_rating}, 201
        except:
            return{'error': 'Something went wrong'}, 500


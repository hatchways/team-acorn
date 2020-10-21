from flask_restful import Resource, reqparse
from flask_jwt_extended import (
    create_access_token, jwt_required, get_jwt_identity)
import datetime
from models.user_model import UserModel
import json


class UserExperience(Resource):
    @jwt_required
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument(
            'experience', help="This field cannot be blank", required=True)
        data = parser.parse_args()

        exp = data["experience"].replace("\'", "\"")
        exp = json.loads(exp)

        try:
            UserModel.update_experience(get_jwt_identity(), exp)
            return{'message': 'Experience updated'}, 200
        except:
            return{'error': 'Something went wrong'}, 500

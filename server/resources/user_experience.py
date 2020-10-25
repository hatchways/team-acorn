from flask_restful import Resource, reqparse
from flask_jwt_extended import (
    create_access_token, jwt_required, get_jwt_identity)
from models.user_model import UserModel
from models.experience_model import ExperienceModel
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

        print(exp)

        for key, value in exp.items():
            print("key: " + key)
            print("value: " + value)

        # get user_id
        user = UserModel.get_user(get_jwt_identity())

        try:
            for key, value in exp.items():
                new_exp = ExperienceModel(
                    user_id=user.id,
                    language=key,
                    level=value
                )
                new_exp.save_to_db()
            return{'message': 'Experience updated'}, 200
        except:
            return{'error': 'Something went wrong'}, 500

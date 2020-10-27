from extensions import Resource, reqparse, jwt_required, get_jwt_identity, json
from models.user_model import UserModel
from models.experience_model import ExperienceModel


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

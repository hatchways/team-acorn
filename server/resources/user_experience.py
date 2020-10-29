from extensions import Resource, reqparse, jwt_required, get_jwt_identity, json, sys
from models.user_model import UserModel
from models.experience_model import ExperienceModel
from models.language import Language


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
            for key, val in exp.items():
                print(Language[key.lower()].value)
                if(key.lower() not in Language.__members__):
                    return {"error": "Invalid language given"}, 400

                new_exp = ExperienceModel(
                    user_id=get_jwt_identity(),
                    language=Language[key.lower()].value,
                    level=val
                )
                new_exp.save_to_db()
            return{'message': 'Experience updated'}, 200
        except:
            print("Unexpected error:", sys.exc_info()[0])
            return{'error': 'Something went wrong'}, 500

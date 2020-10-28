from extensions import (Resource, jwt_required, get_jwt_identity)
from models.user_model import UserModel
from models.ExperienceModel import ExperienceModel


class UserGet(Resource):
    @jwt_required
    def get(self):

        user_id = get_jwt_identity()
        user = UserModel.get_user(user_id)
        user_experience = ExperienceModel.get_user_experience(user.id)

        json = {
            "user": {
                "full_name": user.full_name,
                "email": user.email,
                "experience": user_experience,
                "userId": user_id
            }
        }

        try:
            return json, 201
        except:
            return{'error': 'Something went wrong'}, 500

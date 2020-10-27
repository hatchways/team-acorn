from extensions import (Resource, jwt_required, get_jwt_identity)
from models.user_model import UserModel


class UserGet(Resource):
    @jwt_required
    def get(self):

        user_id = get_jwt_identity()
        user = UserModel.get_user(user_id)

        json = {
            "user": {
                "full_name": user.full_name,
                "email": user.email,
                "experience": user.experience
            }
        }

        try:
            return json, 201
        except:
            return{'error': 'Something went wrong'}, 500

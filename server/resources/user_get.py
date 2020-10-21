from server.extensions import Resource
from server.extensions import (jwt_required, get_jwt_identity)
from server.models.user_model import UserModel
import json

class UserGet(Resource):
    @jwt_required
    def get(self):

        user_id = get_jwt_identity()
        user = UserModel.get_user(user_id)

        json= {
            "full_name": user.full_name,
            "email": user.email,
            "experience": user.experience
        }

        try:
            return json, 201
        except:
            return{'error': 'Something went wrong'}, 500

from extensions import Resource, jwt_required, get_jwt_identity
from models.user_model import UserModel


class UserGet(Resource):
    @jwt_required
    def get(self):

        user = UserModel.get_user_with_experience(get_jwt_identity())
        json = {
            "user": {
                "full_name": user["full_name"],
                "email": user["email"],
                "experience": user["experience"],
                "balance": user["balance"],
                "userId": user["user_id"],
                "rating": user["rating"]
            }
        }

        try:
            return json, 201
        except:
            return {"error": "Something went wrong"}, 500

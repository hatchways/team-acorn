from extensions import Resource, jwt_required, get_jwt_identity
from models.user_model import UserModel


class GetProfile(Resource):
    def get(self, user_id):
        user = UserModel.get_user_with_experience(user_id)
        json = {
            "user": {
                "full_name": user["full_name"],
                "experience": user["experience"],
                "userId": user["user_id"],
                "dp": user["image"],
                "total_reviews": user["total_reviews"],
                "rating": user["rating"],
            }
        }

        try:
            return json, 201
        except:
            return {"error": "Something went wrong"}, 500

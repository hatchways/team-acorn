from extensions import datetime, Resource, reqparse, create_access_token
from models.user_model import UserModel
from models.experience_model import ExperienceModel
from datetime import timedelta


class UserLogin(Resource):
    def post(self):
        # parse request params, then lookup by email, if email doesnt exist return error message,
        # if user exists then check password, if password match then return user logged in message,
        # other wise return error
        parser = reqparse.RequestParser()
        parser.add_argument("email", help="This field cannot be blank", required=True)
        parser.add_argument("password", help="This field cannot be blank", required=True)
        data = parser.parse_args()
        current_email = UserModel.find_by_email(data["email"])

        if not current_email:
            return {"error": "Invalid email or password"}

        user = UserModel.get_user_with_experience(UserModel.get_id(data["email"]))

        if UserModel.verify_hash(data["password"], current_email.password):
            expires = timedelta(days=1)
            access_token = create_access_token(identity=UserModel.get_id(data["email"]), expires_delta=expires)
            return {
                "message": "Logged in as {}".format(current_email.email),
                "access_token": access_token,
                "full_name": user["full_name"],
                "email": user["email"],
                "experience": user["experience"],
                "userId": user["user_id"],
                "balance": user["balance"],
            }, 200
        else:
            return {"error": "Invalid email or password"}, 400

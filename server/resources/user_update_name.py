from flask_restful import Resource, reqparse
from flask_jwt_extended import (
    create_access_token, jwt_required, get_jwt_identity)
import datetime
from models.user_model import UserModel


class UserUpdateName(Resource):
    @jwt_required
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('name',
                            help='This field cannot be blank', required=True)
        data = parser.parse_args()
        name = data["name"]        
        try:
            UserModel.update_name(get_jwt_identity(), name)
            return{'message': 'Name updated', 'name': name}, 200
        except:
            return{'error': 'Something went wrong'}, 500

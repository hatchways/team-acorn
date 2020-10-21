from flask_restful import Resource, reqparse
from flask_jwt_extended import (jwt_required, get_jwt_identity)

from models.user_model import UserModel


class ResetUser(Resource):
    @jwt_required
    def delete(self):
        return UserModel.delete_all()

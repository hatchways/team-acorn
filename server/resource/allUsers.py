from flask_restful import Resource
from flask_jwt_extended import (jwt_required)
import sys
sys.path.append("..")
from models import UserModel


class AllUsers(Resource):
    @jwt_required
    def get(self):
        return UserModel.return_all()

    @jwt_required
    def delete(self):
        return UserModel.delete_all()

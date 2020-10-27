from flask_restful import Resource, reqparse
from flask_jwt_extended import (jwt_required, get_jwt_identity)

from models.message_model import MessageModel


class ResetMessages(Resource):
    @jwt_required
    def delete(self):
        return MessageModel.delete_all()

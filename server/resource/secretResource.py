from flask_restful import Resource
from flask_jwt_extended import (jwt_required)


class SecretResource(Resource):
    @jwt_required
    def get(self):
        return {
            'answer': 42
        }

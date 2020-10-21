from flask_restful import Resource, reqparse
from flask_jwt_extended import (jwt_required, get_jwt_identity)

from models.review_model import ReviewModel


class ResetReview(Resource):
    @jwt_required
    def delete(self):
        return ReviewModel.delete_all()

from extensions import Resource, jwt_required, get_jwt_identity
from flask_restful import reqparse, request
from models.user_model import UserModel
from models.review_model import ReviewModel


class CloseReview(Resource):
    @jwt_required
    def post(self):

        parser = reqparse.RequestParser()
        parser.add_argument("reviewId", help="This field cannot be blank", required=True)
        data = parser.parse_args()
        review_id = (data["reviewId"])
        ReviewModel.close_review(review_id)

        try:
            return {
                "message": "Review " + review_id + "has been closed"
            }, 200
        except Exception as e:
            return {"error": "something went wrong"}, 500

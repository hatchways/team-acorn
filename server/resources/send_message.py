from flask_restful import Resource, reqparse
from flask_jwt_extended import (jwt_required, get_jwt_identity)
from models.review_model import ReviewModel
from models.message_model import MessageModel
from datetime import datetime


class SendMessage(Resource):
    @jwt_required
    def post(self):
        # send a message to specific review
        user_id = get_jwt_identity()

        parser = reqparse.RequestParser()
        parser.add_argument(
            "review_id", help="This field cannot be blank", require=True)
        parser.add_argument(
            "message", help="This field cannot be blank", require=True)

        data = parser.parse_args()

        review = ReviewModel.get_review(data["review_id"])

        if(user_id != review.reviewer_id) or (user_id != review.reviewee_id):
            return {"error": "You are not permitted to send messages to this review"}

        new_message = MessageModel(
            review_id=review.id,
            content=data["message"],
            owner_id=user_id,
            timestamp=datetime.now()
        )

        return{
            "message": "Message sent"
        }, 200

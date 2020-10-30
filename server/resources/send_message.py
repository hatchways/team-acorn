from extensions import Resource, reqparse, jwt_required, get_jwt_identity, datetime
from models.review_model import ReviewModel
from models.message_model import MessageModel


class SendMessage(Resource):
    @jwt_required
    def post(self):
        # send a message to specific review
        user_id = get_jwt_identity()

        parser = reqparse.RequestParser()
        parser.add_argument(
            "review_id", help="This field cannot be blank", required=True)
        parser.add_argument(
            "message", help="This field cannot be blank", required=True)

        data = parser.parse_args()


        

        review = ReviewModel.get_review(data["review_id"])["review"]
        print(review)
        print(review["review_id"])
        if(user_id != review["reviewer_id"] and user_id != review["reviewee_id"]):
            return {"error": "You are not permitted to send messages to this review"}, 403
        elif(review["status"] != "in_review"):
            return {"error": "A party has not accepted the request yet"}

        new_message = MessageModel(
            review_id=review["review_id"],
            content=data["message"],
            owner_id=user_id,
            timestamp=datetime.now()
        )

        new_message.save_to_db()

        # send notification
        # TO-DO
        if(user_id == review["reviewee_id"]):
            # if owner of this message is id of reviewee, send notification to reviewer
            pass
        elif(user_id == review["reviewer_id"]):
            # if owner of this message is id of reviwer, send notification to reviewee
            pass

        return{
            "message": "Message sent"
        }, 200

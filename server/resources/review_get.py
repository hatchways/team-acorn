from extensions import Resource, reqparse, jwt_required, get_jwt_identity, json
from models.review_model import ReviewModel


class ReviewGet(Resource):
    # Get reviews that you are reviewing of others
    @jwt_required
    def get(self):

        parser = reqparse.RequestParser()
        parser.add_argument(
            "review_id", help="This field cannot be blank", required=True)

        data = parser.parse_args()
        user_id = get_jwt_identity()

        review_id = int(data["review_id"])
        review_with_messages = ReviewModel.get_review(review_id)
        print(review_with_messages)
        messages = review_with_messages["messages"]
        review = review_with_messages["review"]

        print(review)
        
        # check if user is participating in the requested review
        if(user_id != review["reviewee_id"] and user_id != review["reviewer_id"]):
            return {"error": "You are not permitted to get review with review_id {}".format(data["review_id"])}, 403

        
        json = {
            "review": {
                "reviewer_id": review["reviewer_id"],
                "reviewee_id": review["reviewee_id"],
                "title": review["title"],
                "status": review["status"],
                "language": review["language"],
                "code": review["code"],
                "messages": messages,
            }
        }

        try:
            return json, 201
        except:
            return{'error': 'Something went wrong'}, 500

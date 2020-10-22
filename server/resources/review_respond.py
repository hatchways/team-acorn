from flask_restful import Resource, reqparse
from flask_jwt_extended import (jwt_required, get_jwt_identity)

from models.review_model import ReviewModel


class ReviewRespond(Resource):
    @jwt_required
    def post(self):
        # get arguments
        parser = reqparse.RequestParser()
        parser.add_argument(
            "review_id", help="This field cannot be blank", required=True)
        data = parser.parse_args()

        review_id = int(data["review_id"])

        # get review
        user_id = get_jwt_identity()
        review = ReviewModel.get_review(review_id)

        if(review == None):
            return {'error': "Review with id [{}] does not exist".format(review_id)}, 400
        elif(review.reviewee_id != user_id):
            return {'error': "You are not authorized to alter this review"}, 400

        # update review status to in_review
        ReviewModel.update_status(review_id, "in_review")

        # send notification
        # TO-DO

        return {
            'message': "Review [{}] status changed to in_review.".format(review.title)
        }, 200

    @jwt_required
    def delete(self):
        # get review

        # update review status back to pending

        # requeue task to find reviewer

        # send notification

        return {
            'message': "delete route works"
        }, 200

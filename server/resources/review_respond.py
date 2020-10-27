from flask_restful import Resource, reqparse
from flask_jwt_extended import (jwt_required, get_jwt_identity)
from models.review_model import ReviewModel
from extensions import queue, create_app
from tasks.find_reviewer_task import find_reviewer
from datetime import timedelta


class ReviewRespond(Resource):
    @jwt_required
    def post(self):

        parser = reqparse.RequestParser()
        parser.add_argument(
            "review_id", help="This field cannot be blank", required=True)
        data = parser.parse_args()

        # get review
        user_id = get_jwt_identity()
        review = ReviewModel.get_review(data["review_id"])

        # update review status to in_review
        ReviewModel.update_status(review.id, "in_review")

        #  review has been updated, send notification reviewee and reviewer
        # TO-DO

        return {
            'message': "Review [{}] status changed to in_review.".format(review.title)
        }, 200

    @jwt_required
    def delete(self):
        # api route to reject an assigned reviewer

        # get review
        parser = reqparse.RequestParser()
        parser.add_argument(
            "review_id", help="This field cannot be blank", required=True)
        data = parser.parse_args()

        # get review
        user_id = get_jwt_identity()
        review = ReviewModel.get_review(data["review_id"])

        # update review status back to pending
        ReviewModel.update_status(review.id, "pending")

        # requeue task to find reviewer
        job = queue.enqueue_in(timedelta(seconds=10),
                               find_reviewer, review.id)

        return {
            'message': "Reviewer rejected. Requeuing task to find reviewer"
        }, 200

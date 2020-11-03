from extensions import Resource, reqparse, jwt_required, get_jwt_identity, queue
from models.review_model import ReviewModel
from models.user_model import UserModel
from models.blacklist_model import BlacklistModel
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
        if(review is None):
            return {'error': "No review with id of {} exists".format(data["review_id"])}
        elif(user_id != review.reviewer_id):
            return {'error': "You are not permitted to respond to this review."}, 403

        # update review status to in_review
        ReviewModel.update_status(review.id, "in_review")
        UserModel.add_review(user_id)

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

        if(review is None):
            return {'error': "No review with id of {} exists".format(data["review_id"])}
        elif(user_id != review.reviewer_id):
            return {'error': "You are not permitted to respond to this review."}, 403

        # update review status back to pending
        ReviewModel.update_status(review.id, "pending")

        # add reviewer to review blacklist
        blacklisted_user = BlacklistModel(
            user_id=user_id,
            review_id=review.id
        )
        blacklisted_user.save_to_db()

        # requeue task to find reviewer
        job = queue.enqueue_in(timedelta(seconds=10),
                               find_reviewer, review.id)

        return {
            'message': "Reviewer with id {} rejected. Requeuing task to find reviewer".format(user_id)
        }, 200

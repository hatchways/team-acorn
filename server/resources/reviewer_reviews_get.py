from extensions import Resource, jwt_required, get_jwt_identity
from models.review_model import ReviewModel


class ReviewerReviewsGet(Resource):
    # Get reviews that you are reviewing of others
    @jwt_required
    def get(self):
        user_id = get_jwt_identity()

        reviews = ReviewModel.get_reviews(user_id, "reviewer")

        # check if user is participating in the requested review
        if(len(reviews["reviews"]) == 0):
            return {"error": "User with id {} has no reviews assigned to them.".format(user_id)}, 400

        try:
            return reviews, 201
        except:
            return{'error': 'Something went wrong'}, 500

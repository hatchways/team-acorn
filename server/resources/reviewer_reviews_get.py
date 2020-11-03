from extensions import Resource, jwt_required, get_jwt_identity
from models.review_model import ReviewModel


class ReviewerReviewsGet(Resource):
    # Get reviews that you are reviewing of others
    @jwt_required
    def get(self):
        user_id = get_jwt_identity()

        reviews_from_reviewer = ReviewModel.get_reviews(user_id, "reviewer")[
            "reviews"]
        reviews_from_reviewee = ReviewModel.get_reviews(user_id, "reviewee")[
            "reviews"]

        # check if user is participating in the requested review
        # if(len(reviews_from_reviewer["reviews"]) == 0):
        #     return
        # elif(len(reviews_from_reviewee))

        try:
            return {"reviewee_reviews": reviews_from_reviewee, "reviewer_reviews": reviews_from_reviewer}, 201
        except:
            return{'error': 'Something went wrong'}, 500

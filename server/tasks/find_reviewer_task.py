from datetime import timedelta
from models.user_model import UserModel
from models.review_model import ReviewModel
from extensions import queue, create_app


def find_reviewer(review_id):
    # Takes in id of reviewee. If the user satisfies the requirements, assign
    # user to review
    app = create_app()
    app.app_context().push()

    # get specific review object
    review = ReviewModel.get_review(review_id)
    reviewee = UserModel.get_user(review.reviewee_id)

    if review.language not in reviewee.experience:
        level = 1
    elif int(reviewee.experience.get(review.language)) < 3:
        level = int(reviewee.experience.get(review.language)) + 1
    else:
        level = 3

    dict_lang_level = {review.language: level}

    # run UserModel.search_experience method to return list of user_ids
    # that meet language experience requirement
    # list is sorted, user with least amount of reviews in the beginning
    qualified_users_id = UserModel.search_experience(
        dict_lang_level, review.reviewee_id)

    print("list of qualified_users_id: " + str(qualified_users_id))

    if(len(qualified_users_id) == 0):
        # no qualified_users found, create new job and requeue
        job = queue.enqueue_in(timedelta(seconds=10), find_reviewer, review_id)
    elif(len(qualified_users_id) >= 1):
        # assign first user in list qualified_users_id as list comes sorted
        ReviewModel.assign_reviewee(review_id, qualified_users_id[0])
        ReviewModel.update_status(review_id, "assigned")
        UserModel.add_review(qualified_users_id[0])

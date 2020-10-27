from datetime import timedelta
from models.user_model import UserModel
from models.review_model import ReviewModel
from models.experience_model import ExperienceModel
from models.blacklist_model import BlacklistModel
from extensions import queue, create_app


def find_reviewer(review_id):
    # Takes in id of reviewee. If the user satisfies the requirements, assign
    # user to review
    app = create_app()
    app.app_context().push()

    # get specific review object
    review = ReviewModel.get_review(review_id)
    reviewee = UserModel.get_user(review.reviewee_id)

    reviewee_exp = ExperienceModel.get_user_experience(reviewee.id)
    print(reviewee_exp)

    if review.language not in reviewee_exp:
        level = 1
    elif int(reviewee_exp.get(review.language)) < 3:
        level = int(reviewee_exp.get(review.language)) + 1
    else:
        level = 3

    dict_lang_level = {review.language: level}

    # run UserModel.search_experience method to return list of user_ids
    # that meet language experience requirement
    # list is sorted, user with least amount of reviews in the beginning
    qualified_users = UserModel.search_experience(
        dict_lang_level, review.reviewee_id)

    # iterate through qualified users and remove blacklisted users
    qualified_users_with_blacklist = []
    for user in qualified_users:
        if(BlacklistModel.is_blacklisted(user.id, review.id)):
            print("User with id {} in blacklist".format(user.id))
        else:
            print("User with id {} not in blacklist".format(user.id))
            qualified_users_with_blacklist.append(user)

    if(len(qualified_users) == 0):
        # no qualified_users found, create new job and requeue
        job = queue.enqueue_in(timedelta(seconds=10), find_reviewer, review_id)
    elif(len(qualified_users) >= 1):
        # assign first user in list qualified_users_id as list comes sorted
        ReviewModel.assign_reviewee(
            review_id, qualified_users_with_blacklist[0].id)
        ReviewModel.update_status(review_id, "assigned")

        # TO-DO send notification to reviewee

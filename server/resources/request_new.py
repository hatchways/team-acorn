from flask_restful import Resource, reqparse
from flask_jwt_extended import (jwt_required, get_jwt_identity)

from models.review_model import ReviewModel
from tasks.find_reviewer_task import find_reviewer
from extensions import queue


import time
import json


class RequestNew(Resource):
    @jwt_required
    def post(self):

        # check if user already as a review in progress
        user_id = get_jwt_identity()
        if(ReviewModel.check_review_exists(user_id)):
            return{
                'error': "A review created by this user already exists"
            }, 400

        parser = reqparse.RequestParser()
        parser.add_argument(
            "title", help="This field cannot be blank", required=True)
        parser.add_argument(
            "code", help="This field cannot be blank", required=True)
        parser.add_argument(
            "language", help="This field cannot be blank", required=True)
        data = parser.parse_args()

        new_review = ReviewModel(
            reviewee_id=get_jwt_identity(),
            reviewer_id=None,
            title=data["title"],
            status="pending",
            messages={1: data["code"]},
            language=data["language"]
        )

        try:
            new_review.save_to_db()

            job = queue.enqueue(find_reviewer, new_review.id)

            q_len = len(queue)

            return{
                'message': "Review [{}] was created. Task added to queue. {} tasks in queue.".format(data["title"], q_len)
            }, 201
        except:
            return{'error': 'Something went wrong'}, 500

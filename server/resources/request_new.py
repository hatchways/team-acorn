from flask_restful import Resource, reqparse
from flask_jwt_extended import (jwt_required, get_jwt_identity)
from models.review_model import ReviewModel
from models.message_model import MessageModel
from tasks.find_reviewer_task import find_reviewer
from extensions import queue

from datetime import datetime
import json


class RequestNew(Resource):
    @jwt_required
    def post(self):

        user_id = get_jwt_identity()

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
            language=data["language"],
            code=data["code"]
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

from flask_restful import Resource, reqparse
from flask_jwt_extended import (jwt_required, get_jwt_identity)

from server.models.review_model import ReviewModel
#from server.run import queue_object, redis_instance
from server.tasks.find_reviewer_task import find_reviewer
from server.extensions import queue_object


import time
import json

class RequestNew(Resource):
    @jwt_required
    def post(self):
        # create review obj, add it to db
        # create task to find user for request
        parser = reqparse.RequestParser()
        parser.add_argument("title", help="This field cannot be blank", required=True)
        parser.add_argument("code", help="This field cannot be blank", required=True)
        parser.add_argument("lang_level", help="This field cannot be blank", required=True)
        data=parser.parse_args()
        user_id = get_jwt_identity()
        title = data["title"]
        messages_data = {1: data["code"]} 
        exp = data["lang_level"]

        new_review = ReviewModel(
            reviewee_id = user_id,
            reviewer_id = None,
            title = title,
            status = "pending",
            messages = messages_data,
            language = exp
        )

        try:
            new_review.save_to_db()

            job = queue_object.enqueue(find_reviewer, new_review.id)

            q_len = len(queue_object)

            return{
                'message': "Review [{}] was created. Task added to queue. {} tasks in queue.".format(title, q_len)
            }, 201
        except:
            return{'error': 'Something went wrong'}, 500
        
        
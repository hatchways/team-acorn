from flask_restful import Resource, reqparse
from flask_jwt_extended import (jwt_required, get_jwt_identity)

from server.models.revquest_model import RevquestModel

from server.run import queue_object, redis_instance
from server.tasks.find_reviewer_task import background_task
import time
import json

class RequestNew(Resource):
    @jwt_required
    def post(self):
        # create revquest obj, add it to db
        # create task to find user for request
        parser = reqparse.RequestParser()
        parser.add_argument("title", help="This field cannot be blank", required=True)
        parser.add_argument("code", help="This field cannot be blank", required=True)
        parser.add_argument("lang_level", help="This field cannot be blank", required=True)
        data=parser.parse_args()
        user_id = get_jwt_identity()
        title = data["title"]
        messages_data = {1: data["code"]} # need to think of better way to do this

        exp = data["lang_level"].replace("\'", "\"")
        exp = json.loads(exp)

        new_revquest = RevquestModel(
            reviewee_id = user_id,
            reviewer_id = None,
            title = title,
            status = "pending",
            messages = messages_data,
            lang_level = exp
        )
        
        try:
            new_revquest.save_to_db()
            
            # if revquest obj successfully added to db, create tast and add to queue
            # TO-DO

            str_test = "Sample string just to test"

            job = queue_object.enqueue(background_task, str_test )
 
            q_len = len(queue_object)

            return{
                'message': "Review [{}] was created. Task added to queue. {} tasks in queue.".format(title, q_len)
            }, 201
        except:
            return{'message': 'Something went wrong'}, 500
        

    # test function to see if api route is working
    @jwt_required
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('code', help='This field cannot be blank', required=True)
        data = parser.parse_args()
        user_id = get_jwt_identity()
        code = data['code']
        return {
            'user_id': user_id,
            'recieved code': code
        }

        
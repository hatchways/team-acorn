from flask_restful import Resource, reqparse
from flask_jwt_extended import (jwt_required, get_jwt_identity)

from server.models.request_model import RequestModel
from server.models.review_model import ReviewModel
from server.models.revquest_model import RevquestModel

class RequestNew(Resource):
    @jwt_required
    def post(self):
        # To-do 
        # create revquest obj, add it to db
        # create task to find user for request
        parser = reqparse.RequestParser()
        parser.add_argument("title", help="This field cannot be blank", required=True)
        parser.add_argument("code", help="This field cannot be blank", required=True)
        data=parser.parse_args()
        user_id = get_jwt_identity()
        title = data["title"]
        messages_data = {1: data["code"]}

        new_revquest = RevquestModel(
            reviewee_id = user_id,
            reviewer_id = None,
            title = title,
            status = "pending",
            messages = messages_data
        )
        
        try:
            new_revquest.save_to_db()
            # if revquest obj successfully added to db, create tast and add to queue
            # TO-DO

            return{
                'message': 'Review request [{}] was created'.format(data['title'])
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

    
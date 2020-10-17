from flask_restful import Resource, reqparse
from flask_jwt_extended import (jwt_required, get_jwt_identity)

from server.models.request_model import RequestModel
from server.models.review_model import ReviewModel

class RequestNew(Resource):
    @jwt_required
    def post(self):
        # To-do 
        # create request obj, review obj, link the two, add to db,
        # crate task to find user for request
        parser = reqparse.RequestParser()


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

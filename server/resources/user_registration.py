from flask_restful import Resource, reqparse
from flask_jwt_extended import (
    create_access_token, jwt_required, get_jwt_identity)
import datetime
from models.user_model import UserModel


class UserRegistration(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('email',
                            help='This field cannot be blank', required=True)
        parser.add_argument('password',
                            help='This field cannot be blank', required=True)
        parser.add_argument('name',
                            help='This field cannot be blank', required=True)
        data = parser.parse_args()

        if UserModel.find_by_email(data['email']):
            return {'error': 'User {} already exists'.format(data['email'])}, 400
        elif len(data['password']) < 6:
            return {'error': 'Password must be greater then 6 characters'}, 400

        new_user = UserModel(
            full_name=data['name'],
            email=data['email'],
            password=UserModel.generate_hash(data['password']),
            reviews=0
        )

        try:
            new_user.save_to_db()
            expires = datetime.timedelta(days=1)
            identity=UserModel.get_id(data['email'])
            access_token = create_access_token(identity, expires_delta=expires)
            return{
                'message': 'User {} was created'.format(data['email']),
                'access_token': access_token,
                'userId': identity
            }, 201
        except:
            return{'error': 'Something went wrong'}, 500

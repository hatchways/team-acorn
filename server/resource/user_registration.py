from flask_restful import Resource, reqparse
from server.models.user_model import UserModel


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
            password=UserModel.generate_hash(data['password'])
        )

        try:
            new_user.save_to_db()
            return{
                'message': 'User {} was created'.format(data['email']),
            }, 201
        except:
            return{'error': 'Something went wrong'}, 500

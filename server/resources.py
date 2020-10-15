from flask_restful import Resource, reqparse
from models import UserModel
from flask_jwt_extended import (create_access_token, create_refresh_token,
                                jwt_required, jwt_refresh_token_required, get_jwt_identity)

parser = reqparse.RequestParser()
parser.add_argument('email',
                    help='This field cannot be blank', required=True)
parser.add_argument('password',
                    help='This field cannot be blank', required=True)


class UserRegistration(Resource):
    def post(self):
        parser.add_argument('name',
                            help='This field cannot be blank', required=True)
        data = parser.parse_args()

        if UserModel.find_by_email(data['email']):
            return {'message': 'User {} already exists'.format(data['email'])}, 400
        elif len(data['password']) < 6:
            return {'message': 'Password must be greater then 6 characters'}, 400

        new_user = UserModel(
            full_name=data['name'],
            email=data['email'],
            password=UserModel.generate_hash(data['password'])
        )

        try:
            new_user.save_to_db()
            access_token = create_access_token(identity=data['email'])
            refresh_token = create_refresh_token(identity=data['email'])
            return{
                'message': 'User {} was created'.format(data['email']),
                'access_token': access_token,
                'refresh_token': refresh_token
            }, 201
        except:
            return{'message': 'Something went wrong'}, 500


class UserLogin(Resource):

    def post(self):
        # parse request params, then lookup by email, if email doesnt exist return error message,
        # if user exists then check password, if password match then return user logged in message,
        # other wise return error
        data = parser.parse_args()
        current_email = UserModel.find_by_email(data['email'])

        if not current_email:
            return {'message': 'email {} doesn\'t exist'.format(data['email'])}

        if UserModel.verify_hash(data['password'], current_email.password):
            access_token = create_access_token(identity=data['email'])
            refresh_token = create_refresh_token(identity=data['email'])
            return {
                'message': 'Logged in as {}'.format(current_email.email),
                'access_token': access_token,
                'refresh_token': refresh_token
            }
        else:
            return {'message': 'Wrong credentials'},


class UserLogoutAccess(Resource):
    @jwt_required
    def post(self):
        jti = get_raw_jwt()['jti']
        try:
            revoked_token = RevokedTokenModel(jti=jti)
            revoked_token.add()
            return {'message': 'Access token has been revoked'}
        except:
            return {'message': 'Something went wrong'}, 500


class UserLogoutRefresh(Resource):
    @jwt_refresh_token_required
    def post(self):
        jti = get_raw_jwt()['jti']
        try:
            revoked_token = RevokedTokenModel(jti=jti)
            revoked_token.add()
            return {'message': 'Refresh token has been revoked'}
        except:
            return {'message': 'Something went wrong'}, 500


class AllUsers(Resource):
    @jwt_required
    def get(self):
        return UserModel.return_all()

    @jwt_required
    def delete(self):
        return UserModel.delete_all()


class SecretResource(Resource):
    @jwt_required
    def get(self):
        return {
            'answer': 42
        }


class TokenRefresh(Resource):
    # @ decorator so you can only access this path with a refresh token
    @jwt_refresh_token_required
    def post(self):
        current_email = get_jwt_identity()
        access_token = create_access_token(identity=current_email)
        return {'access_token': access_token}

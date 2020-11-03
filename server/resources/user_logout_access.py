from extensions import Resource, jwt_required, get_raw_jwt
from models.revoked_token_model import RevokedTokenModel


class UserLogoutAccess(Resource):
    @jwt_required
    def post(self):
        jti = get_raw_jwt()["jti"]
        try:
            revoked_token = RevokedTokenModel(jti=jti)
            revoked_token.add()
            return {"message": "Access token has been revoked"}
        except:
            return {"error": "Something went wrong"}, 500

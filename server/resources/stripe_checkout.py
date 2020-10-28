from flask import request
from flask_restful import Resource
from flask_jwt_extended import (
    create_access_token, jwt_required, get_jwt_identity)
from models.user_model import UserModel
import stripe, os


stripe.api_key = os.environ.get('STRIPE_SECRET_KEY')

class HandlePayment(Resource):
    @jwt_required
    def post(self):
        try:
            data = request.get_json()
            charge = stripe.Charge.create(
                amount=data['credits']*1000,
                currency='cad',
                description='Credits Purchased',
                source=data['token']['id']
            )
            if charge:
                balance = UserModel.get_balance(get_jwt_identity())
                balance = balance + data['credits']
                UserModel.update_balance(get_jwt_identity(), balance)
                # When I am sending a object back, I am getting errors
                return { "message": "Transaction completed"}, 200
            else:
                return { "error": "something was wrong with the transaction"}, 400
        except Exception as e:
            return {"error": "something went wrong"}, 500
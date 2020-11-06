from extensions import Resource, reqparse, jwt_required, get_jwt_identity, queue, json
from models.review_model import ReviewModel
from models.message_model import MessageModel
from tasks.find_reviewer_task import find_reviewer
from models.language import Language
from datetime import datetime
from models.user_model import UserModel


class RequestNew(Resource):
    @jwt_required
    def post(self):

        user_id = get_jwt_identity()

        parser = reqparse.RequestParser()
        parser.add_argument("title", help="This field cannot be blank", required=True)
        parser.add_argument("code", help="This field cannot be blank", required=True)
        parser.add_argument("language", help="This field cannot be blank", required=True)
        data = parser.parse_args()

        if hasattr(Language, data["language"]) == False:
            return {"error": "Invalid language given"}, 400

        new_review = ReviewModel(
            reviewee_id=get_jwt_identity(),
            reviewer_id=None,
            title=data["title"].capitalize(),
            status="pending",
            language=data["language"],
            code=data["code"],
            timestamp=datetime.now(),
        )
        current_balance = UserModel.get_balance(user_id)
        try:
            if (current_balance == 0):
                return {"error": "No balance. Please topup to request reviews."}, 500
            new_review.save_to_db()
            UserModel.update_balance(user_id, current_balance - 1)
            job = queue.enqueue(find_reviewer, new_review.id)

            q_len = len(queue)

            return {
                "message": "Review [{}] was created. Task added to queue. {} tasks in queue.".format(
                    data["title"], q_len
                ),
                "new_balance": current_balance -1
            }, 201
        except:
            return {"error": "Something went wrong"}, 500

from extensions import db, sys


class MessageModel(db.Model):
    __tablename__ = "messages"

    id = db.Column(db.Integer, primary_key=True)
    review_id = db.Column(db.Integer, db.ForeignKey(
        "reviews.id"), nullable=False)
    content = db.Column(db.Text, nullable=True)
    owner_id = db.Column(db.Integer, nullable=False)
    timestamp = db.Column(db.DateTime, nullable=False)

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    @ classmethod
    def get_review_messages(cls, review_id):
        messages = cls.query.filter(MessageModel.review_id == review_id).all()
        return list(map(lambda x: MessageModel.to_json(x), messages))

    @classmethod
    def to_json(cls, x):
        return {
            'message_id': x.id,
            'review_id': x.review_id,
            'content': x.content,
            'owner_id': x.owner_id,
            'timestamp': str(x.timestamp)
        }

    # Test Method, delete later
    @ classmethod
    def delete_all(cls):
        try:
            messages = db.session.query(cls).all()
            length = len(messages)
            for mess in messages:
                db.session.delete(mess)
            db.session.commit()
            return {'message': '{} row(s) deleted'.format(length)}
        except:
            print("Unexpected error:", sys.exc_info()[0])
            return {'error': 'Something went wrong'}, 500

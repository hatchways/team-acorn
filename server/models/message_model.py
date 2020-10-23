from extensions import db


class MessageModel(db.Model):
    __tablename__ = "message"

    id = db.Column(db.Integer, primary_key=True)
    review_id = db.Column(db.Integer, nullable=False)
    content = db.Column(db.Text, nullable=False)
    owner_id = db.Column(db.Integer, nullable=False)
    timestamp = db.Column(db.DateTime, nullable=False)

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

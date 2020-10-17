from server.run import db


class ReviewModel(db.Model):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    reviewer_id = db.Column(db.Integer, nullable=True)
    reviewee_id = db.Column(db.Integer, nullable=False)
    title = db.Column(db.String(30), nullable=False)
    messages = db.Column(db.String(20), nullable=True)

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    
from server.run import db


class RequestModel(db.Model):
    __tablename__ = 'requests'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    review_id = db.Column(db.Integer, nullable=False)
    status = db.Column(db.String(20), nullable=True)

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    
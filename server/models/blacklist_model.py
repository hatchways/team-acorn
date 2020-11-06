from extensions import db


class BlacklistModel(db.Model):
    __tablename__ = "blacklist"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    review_id = db.Column(db.Integer, db.ForeignKey("reviews.id"), nullable=False)

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def is_blacklisted(cls, user_id, review_id):
        blacklist = (
            db.session.query(BlacklistModel)
            .filter(BlacklistModel.user_id == user_id)
            .filter(BlacklistModel.review_id == review_id)
            .all()
        )
        if blacklist:
            return True
        else:
            return False

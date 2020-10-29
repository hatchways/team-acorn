from extensions import db, sys
from models.message_model import MessageModel
from models.blacklist_model import BlacklistModel


class ReviewModel(db.Model):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    reviewer_id = db.Column(
        db.Integer, db.ForeignKey("users.id"), nullable=True)
    reviewee_id = db.Column(
        db.Integer, db.ForeignKey("users.id"), nullable=False)
    title = db.Column(db.String(30), nullable=False)
    status = db.Column(db.String(20), nullable=False)
    language = db.Column(db.String(20), nullable=False)
    code = db.Column(db.Text, nullable=False)
    blacklisted_users = db.relationship(
        "BlacklistModel", cascade="all, delete-orphan", backref="review", lazy=True)
    messages = db.relationship(
        "MessageModel", cascade="all, delete-orphan", backref="review", lazy=True)

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def assign_reviewee(cls, review_id, user_id):
        review = cls.query.get(review_id)
        review.reviewer_id = user_id
        db.session.commit()

    @classmethod
    def update_status(cls, review_id, status):
        review = ReviewModel.get_review(review_id)
        if(status == "pending"):
            review.reviewer_id = None
        review.status = status
        db.session.commit()

    @classmethod
    def close_review(cls, id):
        # deleting the review will also delete all associated messages
        review = cls.query.get(id)
        db.session.delete(review)
        db.session.commit()

    @classmethod
    def get_review(cls, id):
        review = cls.query.get(id)
        return review

    @classmethod
    def get_reviews(cls, id, requester):
        if(requester == "reviewer"):
            reviews = cls.query.filter(ReviewModel.reviewer_id == id).all()
        elif(requester == "reviewee"):
            reviews = cls.query.filter(ReviewModel.reviewee_id == id).all()
        else:
            reviews == None

        if reviews == None:
            return None
        else:
            return {'reviews': list(map(lambda x: ReviewModel.to_json(x), reviews))}

    @classmethod
    def to_json(cls, x):
        return {
            'review_id': x.id,
            'reviewer_id': x.reviewer_id,
            'reviewee_id': x.reviewee_id,
            'title': x.title,
            'status': x.status,
            'language': x.language
        }

    @classmethod
    def delete_all(cls):
        try:
            reviews = db.session.query(cls).all()
            length = len(reviews)
            for rev in reviews:
                db.session.delete(rev)
            db.session.commit()
            return {'message': '{} row(s) deleted'.format(length)}
        except:
            print("Unexpected error:", sys.exc_info()[0])
            return {'error': 'Something went wrong'}, 500
            

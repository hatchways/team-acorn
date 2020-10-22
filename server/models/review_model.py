from extensions import db


class ReviewModel(db.Model):
    __tablename__ = 'review'

    id = db.Column(db.Integer, primary_key=True)
    reviewer_id = db.Column(db.Integer, nullable=True)
    reviewee_id = db.Column(db.Integer, nullable=False)
    title = db.Column(db.String(30), nullable=False)
    status = db.Column(db.String(20), nullable=False)
    language = db.Column(db.String(20), nullable=False)

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
    def close_review(cls):
        # TO-DO
        pass

    @classmethod
    def get_review(cls, id):
        review = cls.query.get(id)
        return review

    @classmethod
    def get_review_from_reviewee(cls, id):
        review = cls.query.filter(ReviewModel.reviewee_id == id).one()
        return review

    @classmethod
    def check_review_exists(cls, reviewee_id):
        # checks if a user has already opened a review
        review = cls.query.filter(ReviewModel.reviewee_id == reviewee_id).all()
        if(len(review) == 0):
            return False
        else:
            return True

    @classmethod
    def delete_all(cls):
        try:
            num_rows_deleted = db.session.query(cls).delete()
            db.session.commit()
            return {'message': '{} row(s) deleted'.format(num_rows_deleted)}
        except:
            return {'message': 'Something went wrong'}

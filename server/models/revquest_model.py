from server.run import db


class RevquestModel(db.Model):
    __tablename__ = 'revquest'

    id = db.Column(db.Integer, primary_key=True)
    reviewer_id = db.Column(db.Integer, nullable=True)
    reviewee_id = db.Column(db.Integer, nullable=False)
    title = db.Column(db.String(30), nullable=False)
    status = db.Column(db.String(20), nullable=False)
    lang_level = db.Column(db.JSON, nullable = False)
    messages = db.Column(db.JSON, nullable=True)

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def assign_reviewee(cls, user_id):
        #TO-DO
        pass

    @classmethod
    def update_status(cls, status):
        #TO-DO
        pass


    @classmethod
    def close_revquest(cls):
        #TO-DO
        pass
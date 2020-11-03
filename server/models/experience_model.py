from extensions import db
from models.language import Language


class ExperienceModel(db.Model):
    __tablename__ = "experience"

    # id = db.Column(db.Integer, primary_key=True)
    # user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), primary_key=True, nullable=False)
    language = db.Column(db.String(20), primary_key=True, nullable=False)
    level = db.Column(db.Integer, nullable=False)
    users = db.relationship("UserModel")
    # __table_args__ = (db.UniqueConstraint("user_id", "language"),)

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def get_user_experience(cls, user_id):
        experience = cls.query.filter(ExperienceModel.user_id == user_id).all()
        dict_exp = {}
        for exp in experience:
            dict_exp[exp.language] = exp.level
        return dict_exp
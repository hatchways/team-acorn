from extensions import db


class ExperienceModel(db.Model):
    __tablename__ = "experience"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    language = db.Column(db.String(20), nullable=False)
    level = db.Column(db.Integer, nullable=False)

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

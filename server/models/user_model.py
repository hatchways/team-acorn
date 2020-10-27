from extensions import db
from passlib.hash import pbkdf2_sha256 as sha256


class UserModel(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    experience = db.Column(db.JSON, nullable=True)
    reviews = db.Column(db.Integer, nullable=False)
    #balance = db.Column(db.Integer, nullable=False)

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def get_id(cls, email):
        user = cls.query.filter_by(email=email).first()
        return user.id

    @classmethod
    def get_user(cls, id):
        user = cls.query.get(id)
        return user

    @classmethod
    def find_by_email(cls, email):
        return cls.query.filter_by(email=email).first()

    @staticmethod
    def generate_hash(password):
        # generate hashed string to store in the database
        return sha256.hash(password)

    @staticmethod
    def verify_hash(password, hash):
        # check given password
        return sha256.verify(password, hash)

    @classmethod
    def update_experience(cls, id, exp):
        user = cls.query.get(id)
        user.experience = exp
        db.session.commit()

    @classmethod
    def search_experience(cls, lang_levels, reviewee_id):
        # search users the are above certain experience level, return list of
        # users that match the requirements
        req_language = list(lang_levels)[0]
        req_level = int(lang_levels[req_language])
        users = cls.query.filter(UserModel.experience != None).filter(
            UserModel.id != reviewee_id).all()

        qualified_user_ids = []
        qualified_users = []

        for user in users:
            if (req_language in user.experience) and (int(user.experience.get(req_language)) >= req_level):
                qualified_users.append(user)

        # sort based on number of reviews
        qualified_users.sort(key=lambda user: user.reviews)

        for user in qualified_users:
            qualified_user_ids.append(user.id)

        return qualified_user_ids

    @classmethod
    def add_review(cls, id):
        user = cls.query.get(id)
        user.reviews += 1
        db.session.commit()

    @classmethod
    def remove_review(cls, id):
        user = cls.query.get(id)
        if(user.reviews > 0):
            user.reviews -= 1
            db.session.commit()

    @classmethod
    def delete_all(cls):
        try:
            num_rows_deleted = db.session.query(cls).delete()
            db.session.commit()
            return {'message': '{} row(s) deleted'.format(num_rows_deleted)}
        except:
            return {'message': 'Something went wrong'}

    @classmethod
    def delete_all_review_count(cls):
        users = UserModel.query.all()
        for user in users:
            user.reviews = 0

        db.session.commit()

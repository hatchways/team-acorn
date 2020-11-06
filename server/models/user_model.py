from extensions import db, sys
from models.experience_model import ExperienceModel
from models.experience_model import ExperienceModel
from passlib.hash import pbkdf2_sha256 as sha256


class UserModel(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    image = db.Column(db.String(), nullable=True)
    rating = db.Column(db.Float, nullable=True)
    total_reviews = db.Column(db.Integer,default=0, nullable=True)
    review_count = db.Column(db.Integer, nullable=False)
    reviews = db.relationship(
        "ReviewModel",
        cascade="save-update",
        backref="reviews",
        lazy=True,
        primaryjoin="UserModel.id==ReviewModel.reviewee_id",
    )
    experience = db.relationship("ExperienceModel", cascade="all, delete-orphan", backref="experience")
    balance = db.Column(db.Integer, nullable=False)

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def get_id(cls, email):
        user = cls.query.filter_by(email=email).first()
        return user.id

    @classmethod
    def get_user(cls, user_id):
        user = cls.query.get(user_id)
        return user

    @classmethod
    def get_user_with_experience(cls, user_id):
        user_with_exp = (
            db.session.query(UserModel, ExperienceModel)
            .filter(UserModel.id == user_id)
            .filter(ExperienceModel.user_id == user_id)
            .all()
        )
        if len(user_with_exp) == 0:
            # list is empty, most likely because experience hasn't
            # been set yet, return user with no exp
            user = db.session.query(UserModel).filter(UserModel.id == user_id).first()
            exp = None
        else:
            user = user_with_exp[0][0]
            exp = {}
            for tup in user_with_exp:
                exp[tup[1].language] = tup[1].level
        return {
            "full_name": user.full_name,
            "email": user.email,
            "experience": exp,
            "user_id": user.id,
            "balance": user.balance,
            "rating": user.rating
        }

    @classmethod
    def find_by_email(cls, email):
        return cls.query.filter_by(email=email).first()

    @classmethod
    def get_user_for_messages(cls, id):
        user = cls.query.filter(cls.id == id).first()
        return {
            "id": id,
            "full_name": user.full_name,
            "profile_link": "https://forums.developer.apple.com/forums/build-10052020-1/public/assets/avatars/1095.png",
            "designation": "senior developer at google",
        }

    @staticmethod
    def generate_hash(password):
        # generate hashed string to store in the database
        return sha256.hash(password)

    @staticmethod
    def verify_hash(password, hash):
        # check given password
        return sha256.verify(password, hash)

    @classmethod
    def update_balance(cls, id, balance):
        user = cls.query.get(id)
        user.balance = balance
        db.session.commit()

    @classmethod
    def get_balance(cls, id):
        user = cls.query.get(id)
        return user.balance

    @classmethod
    def search_experience(cls, lang_levels, reviewee_id):
        # search users the are above certain experience level, return list of
        # user_ids that match the requirements
        req_language = list(lang_levels)[0]
        req_level = int(lang_levels[req_language])

        qualified_experiences = (
            db.session.query(UserModel)
            .filter(UserModel.id == ExperienceModel.user_id)
            .filter(ExperienceModel.user_id != reviewee_id)
            .filter(ExperienceModel.language == req_language)
            .filter(ExperienceModel.level >= req_level)
            .order_by(UserModel.review_count)
            .all()
        )

        return qualified_experiences

    @classmethod
    def update_total_reviews(cls, id):
        user = cls.query.get(id)
        user.total_reviews += 1
        db.session.commit()
    @classmethod
    def add_review(cls, id):
        user = cls.query.get(id)
        user.review_count += 1
        db.session.commit()

    @classmethod
    def remove_review(cls, id):
        user = cls.query.get(id)
        if user.review_count > 0:
            user.review_count -= 1
            db.session.commit()

    # Testing method, remove before production
    @classmethod
    def delete_all(cls):
        try:
            users = db.session.query(cls).all()
            length = len(users)
            for u in users:
                db.session.delete(u)
            db.session.commit()
            return {"message": "{} row(s) deleted".format(length)}
        except:
            print("Unexpected error:", sys.exc_info()[0])
            return {"message": "Something went wrong"}, 500

    # Testing method, remove before production
    @classmethod
    def delete_all_review_count(cls):
        users = UserModel.query.all()
        for user in users:
            user.review_count = 0
            user.total_reviews = 0

        db.session.commit()

    @classmethod
    def update_profile_img(cls, id, url):
        user = cls.query.get(id)
        user.image = url
        db.session.commit()

    @classmethod
    def update_name(cls, id, name):
        user = cls.query.get(id)
        user.full_name = name
        db.session.commit()

    @classmethod
    def get_profile_img(cls, id):
        user = cls.query.get(id)
        return user.image

    @classmethod
    def get_rating(cls, id):
        user = cls.query.get(id)
        return user.rating
    
    @classmethod
    def update_rating(cls, id, new_rating):
        user = cls.query.get(id)
        total_reviews = user.total_reviews
        current_rating = user.rating
        if current_rating is None:
            current_rating = 0
        rating = (int(new_rating) + (current_rating * (total_reviews-1)))/total_reviews
        rating = round(rating, 1)
        user.rating = rating
        db.session.commit()
        return rating

    @classmethod
    def update_balance(cls, id):
        user = cls.query.get(id)
        user.balance += 1
        db.session.commit()

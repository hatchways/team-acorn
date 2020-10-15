from run import db
from passlib.hash import pbkdf2_sha256 as sha256


class UserModel(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def get_id(cls, email):
        user = cls.query.filter_by(email=email).first()
        return user.id

    @classmethod
    def find_by_email(cls, email):
        return cls.query.filter_by(email=email).first()

    @classmethod
    def return_all(cls):

        def to_json(x):
            return {
                'id': x.id,
                'email': x.email,
                'password': x.password
            }
        return {'users': list(map(lambda x: to_json(x), UserModel.query.all()))}

    @classmethod
    def delete_all(cls):
        try:
            num_rows_deleted = db.session.query(cls).delete()
            db.session.commit()
            return {'message': '{} row(s) deleted'.format(num_rows_deleted)}
        except:
            return {'message': 'Something went wrong'}

    @staticmethod
    def generate_hash(password):
        # generate hashed string to store in the database
        return sha256.hash(password)

    @staticmethod
    def verify_hash(password, hash):
        # check given password
        return sha256.verify(password, hash)


class RevokedTokenModel(db.Model):
    # store primary key id and jti(unique identifier of the token). add() method adds token
    # to the database. is_jti_blacklisted() checks if the token is revoked
    __tablename__ = 'revoked_tokens'
    id = db.Column(db.Integer, primary_key=True)
    jti = db.Column(db.String(120))

    def add(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def is_jti_blacklisted(cls, jti):
        query = cls.query.filter_by(jti=jti).first()
        return bool(query)

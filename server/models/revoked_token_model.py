from server.run import db
from passlib.hash import pbkdf2_sha256 as sha256


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

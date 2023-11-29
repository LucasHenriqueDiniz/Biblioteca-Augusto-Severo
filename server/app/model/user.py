from datetime import datetime, timedelta
import jwt

from app.model.blacklist import BlacklistToken

from app.config import key
from app import db
from app.extensions import flask_bcrypt
from app.service.livro_service import save_changes

class User(db.Model):
    """ User Model for storing user related details """
    __tablename__ = "user"
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(50), unique=True)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password_hash = db.Column(db.String(100))
    admin = db.Column(db.Boolean, nullable=False, default=False)
    reserved_books = db.relationship('Livro', backref='user', lazy='dynamic')
    
    
    @property
    def password(self):
        raise AttributeError('password: write-only field')

    @password.setter
    def password(self, password):
        self.password_hash = flask_bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return flask_bcrypt.check_password_hash(self.password_hash, password)

    def __repr__(self):
        return "<User '{}'>".format(self.username)
        
    def encode_auth_token(self, user_id, extra={}):
        """
        Generates the Auth Token
        :return: string
        """
        try:
            payload = {
                'exp': datetime.utcnow() + timedelta(days=1, seconds=5),
                'iat': datetime.utcnow(),
                'sub': user_id
            }
            # adds the values from extra in the payload
            payload.update(extra)
            return jwt.encode(
                payload,
                key,
                algorithm='HS256'
            )
        except Exception as e:
            return e
        
    @staticmethod  
    def decode_auth_token(auth_token):
        """
        Decodes the auth token
        :param auth_token:
        :return: integer|string
        """
        try:
            auth_token = str.replace(str(auth_token), 'Bearer ', '')
            payload = jwt.decode(auth_token, key, algorithms=['HS256'])
            is_blacklisted_token = BlacklistToken.check_blacklist(auth_token)
            if is_blacklisted_token:
                return 'Token blacklisted. Please log in again.'
            else:
                return payload['sub']
        except jwt.ExpiredSignatureError:
            return 'Signature expired. Please log in again.'
        except jwt.InvalidTokenError:
            return 'Invalid token. Please log in again.'
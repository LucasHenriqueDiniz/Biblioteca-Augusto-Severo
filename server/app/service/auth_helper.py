from app.model.user import User
from sqlalchemy.exc import SQLAlchemyError
from app.service.blacklist_service import save_token

class Auth:
    @staticmethod
    def login_user(data, extra={}):
        try:
            user = User.query.filter_by(email=data.get('email')).first()
            if user and user.check_password(data.get('password')):
                auth_token = user.encode_auth_token(user.id, extra)
                if auth_token:
                    return 200
            else:
                return 401

        except Exception as e:
            print(e)
            return 500

    @staticmethod
    def logout_user(data):
        if data:
            auth_token = data.split(" ")[1]
        else:
            auth_token = ''
        if auth_token:
            resp = User.decode_auth_token(auth_token)
            if not isinstance(resp, str):
                # mark the token as blacklisted
                return save_token(token=auth_token)
            else:
                response_object = {
                    'status': 'fail',
                    'message': resp
                }
                return response_object, 401
        else:
            response_object = {
                'status': 'fail',
                'message': 'Provide a valid auth token.'
            }
            return response_object, 403
        
    @staticmethod
    def get_logged_in_user(new_request):
        # Get the auth token
        auth_token = new_request.headers.get('Authorization')
        if not auth_token:
            response_object = {
                'status': 'fail',
                'message': 'Provide a valid auth token.'
            }
            return response_object, 401
        resp = User.decode_auth_token(auth_token)
        if isinstance(resp, str):
            response_object = {
                'status': 'fail',
                'message': resp
            }
            return response_object, 401
        user = User.query.filter_by(id=resp).first()
        response_object = {
            'status': 'success',
            'data': {
                'user_id': user.id,
                'email': user.email,
                'admin': user.admin,
                'created_at': str(user.created_at),
            }
        }
        return response_object, 200

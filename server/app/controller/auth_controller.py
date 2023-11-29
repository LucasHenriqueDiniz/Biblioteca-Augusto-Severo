from flask import request
from flask_restx import Resource

from app.service.auth_helper import Auth
from app.decorator import token_required, transaction
from app.dto.user_dto import AuthDto

api = AuthDto.api
_user_auth = AuthDto.user_auth


@api.route('/login')
class UserLogin(Resource):
    @api.doc('user login')
    @api.expect(_user_auth, validate=True)
    def post(self):
        post_data = request.json
        response = Auth.login_user(data=post_data)

        if response == 200:
            return response
        else:
            return {'message': 'Login failed'}, response


@api.route('/logout')
class LogoutAPI(Resource):
    @transaction
    @api.doc('logout a user')
    def post(self):
        # get auth token
        auth_header = request.headers.get('Authorization')
        return Auth.logout_user(data=auth_header)


@api.route('/validate')
class ValidateToken(Resource):
    @token_required
    @api.doc('blocked route for token validation')
    def get(self):
        # get auth token
        return None, 200
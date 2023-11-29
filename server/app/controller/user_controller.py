from flask import request
from flask_restx import Resource
from app.decorator import get_user_and_repository, token_required, transaction
from app.service.auth_helper import Auth

from app.dto.user_dto import UserDto
from app.service.auth_service import (
    save_new_user,
    get_all_users,
    get_a_user,
    change_user_password,
)

api = UserDto.api
_user = UserDto.user
_change_password = UserDto.change_password


@api.route("/")
class UserRoot(Resource):
    @token_required
    @api.doc("list_of_registered_users")
    @api.marshal_list_with(_user)
    def get(self):
        return get_all_users()

    @transaction
    @api.response(201, "User successfully created.")
    @api.doc("create a new user")
    @api.expect(_user, validate=True)
    def post(self):
        """Creates a new User"""
        data = request.json
        return save_new_user(data=data)


@api.route("/<username>")
@api.param("username", "The User identifier")
@api.response(404, "User not found.")
class User(Resource):
    @token_required
    @api.doc("get a user")
    @api.marshal_with(_user)
    def get(self, username):
        user = get_a_user(username)
        if not user:
            api.abort(404)
        else:
            return user


@api.route("/change-password")
class ChangePassword(Resource):
    @get_user_and_repository
    @api.response(200, "Password successfully changed.")
    @api.expect(_change_password, validate=True)
    def patch(self, active_user):
        """Change user password"""
        data = request.json
        return change_user_password(data=data, user_id=active_user["user_id"])

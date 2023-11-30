from flask_restx import Namespace, fields

passwordRegex = "(^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,32}$)"
usernameRegex = "(^[a-zA-Z0-9]{2,32}$)"
emailRegex = "(^[^@]+@[^@]+\.[^@]+$)"


class UserDto:
    """DTO para User"""

    api = Namespace("user", description="user related operations")
    user = api.model(
        "user",
        {
            "email": fields.String(
                required=True,
                description="user email address",
                min_length=5,
                pattern=emailRegex,
                example="teste@teste.com",
            ),
            "username": fields.String(
                required=True,
                description="user username",
                min_length=2,
                max_length=32,
                pattern=usernameRegex,
                example="teste",
            ),
            "password": fields.String(
                required=True,
                description="user password",
                min_length=8,
                max_length=32,
                pattern=passwordRegex,
                example="Password123",
            ),
            "public_id": fields.String(description="user Identifier"),
        },
    )

    change_password = api.model(
        "change_password",
        {
            "new_password": fields.String(
                required=True,
                description="user password",
                min_length=8,
                max_length=32,
                pattern=passwordRegex,
            ),
            "old_password": fields.String(
                required=True, description="user old password"
            ),
        },
    )


class AuthDto:
    api = Namespace("auth", description="authentication related operations")
    user_auth = api.model(
        "auth_details",
        {
            "email": fields.String(required=True, description="The email address"),
            "password": fields.String(required=True, description="The user password "),
        },
    )

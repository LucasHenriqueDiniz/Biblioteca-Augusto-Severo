from app import db
from app.model.user import User

def save_new_user(data):
    # Verificar se o email já existe
    user = User.query.filter_by(email=data["email"]).first()
    if user:
        response_object = {
            "status": "fail",
            "message": "Email already in use.",
        }
        return response_object
    
    # Verificar se o usuário já existe
    user = User.query.filter_by(username=data["username"]).first()
    if user:
        response_object = {
            "status": "fail",
            "message": "Username already in use.",
        }
        return response_object

    # Criar o novo usuário
    new_user = User(
        email=data["email"],
        username=data["username"],
        password=data["password"],
    )
    db.session.add(new_user)
    db.session.commit()

    return generate_token(new_user)


def get_all_users():
    return User.query.all()


def get_a_user(username):
    return User.query.filter_by(username=username).first()


def generate_token(user):
    try:
        # generate the auth token
        auth_token = user.encode_auth_token(user.id)
        response_object = {
            "status": "success",
            "message": "Successfully registered.",
            "Authorization": auth_token,
            "username": user.username,

        }
        return response_object
    except Exception as e:
        response_object = {
            "status": "fail",
            "message": "Some error occurred. Please try again.",
        }
        return response_object


def change_user_password(data, user_id):
    old_password = data.get("old_password")
    new_password = data.get("new_password")

    if old_password == new_password:
        response_object = {
            "status": "fail",
            "message": "Old password and new password are the same.",
        }
        return response_object
    
    active_user = User.query.filter_by(id=user_id).first()

    if active_user.check_password(old_password):
        active_user.password = new_password
        db.session.commit()
        response_object = {
            "status": "success",
            "message": "Password updated successfully.",
        }
        return response_object
    else:
        response_object = {
            "status": "fail",
            "message": "Old password is incorrect.",
        }
        return response_object
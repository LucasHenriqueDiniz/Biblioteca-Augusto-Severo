from flask_restx import Api
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt

db = SQLAlchemy()
migrate = Migrate()
flask_bcrypt = Bcrypt()
api = Api(
    title="Basicão Fullstack",
    version="1.0",
    description="API braba 🔥",
)

from flask_restx import Api
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt

db = SQLAlchemy()
migrate = Migrate()
flask_bcrypt = Bcrypt()
api = Api(
    title="Biblioteca de livros",
    version="0.5",
    description="API básica para biblioteca de livros semi-funcional.",
)

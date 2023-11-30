from flask_restx import Namespace, fields


class LivroDto:
    """DTO para Livro"""

    api = Namespace("livro", description="Book")
    livro = api.model(
        "livro",
        {
            "id": fields.Integer(),
            "titulo": fields.String(required=True),
            "autor": fields.String(required=True),
            "ano_publicacao": fields.Integer(required=True),
            "categoria": fields.String(required=True),
            "capa": fields.String(),
            "sinopse": fields.String(),
            "uuid": fields.String(),
            "reserved": fields.Boolean(),
            "user_id": fields.Integer(),
        },
    )

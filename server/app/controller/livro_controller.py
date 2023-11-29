from flask import request
from flask_restx import Resource

from app.util.dto import LivroDto
from app.service.livro_service import (
    devolver_livro,
    editar_livro,
    excluir_livro,
    get_livro_id_by_uuid,
    listar_livros_reservados,
    listar_todas_livros,
    criar_livro,
    reservar_livro,
)
from app.decorator import admin_token_required, token_required

api = LivroDto.api
_livro = LivroDto.livro


@api.route("/")
class Livro(Resource):
    @api.expect(_livro, validate=True)
    def post(self):
        print(request.headers)
        data = request.json
        try:
            response = criar_livro(data)
            return response, 201
        except Exception as e:
            return {"message": str(e)}, 500

    @api.marshal_list_with(_livro, envelope="data")
    def get(self):
        try:
            return listar_todas_livros(), 200
        except Exception as e:
            return {"message": str(e)}, 500

@api.route("/<string:uuid_livro>")
@api.param("uuid_livro", "Book UUID")
class LivroComId(Resource):
    @api.expect(_livro, validate=True)
    @admin_token_required
    def put(self, uuid_livro):
        data = request.json
        try:
            livro = get_livro_id_by_uuid(uuid_livro)
            response = editar_livro(livro, data)
            return response, 200
        except Exception as e:
            return {"message": str(e)}

    def delete(self, uuid_livro):
        try:
            livro = get_livro_id_by_uuid(uuid_livro)
            response = excluir_livro(livro)  # Update this line
            return response, 204
        except Exception as e:
            return {"message": str(e), "status": 500}

    @api.route("/<string:livro_uuid>/reserve")
    @api.param("livro_uuid", "Book ID")
    class ReservarLivro(Resource):
        # @token_required
        def post(self, livro_uuid):
            try:
                print(livro_uuid)
                livro_id = get_livro_id_by_uuid(livro_uuid)
                response = reservar_livro(livro_id, 1)
                return response
            except Exception as e:
                return {"message": str(e), "status": 500}

    @api.route("/<string:livro_uuid>/return")
    @api.param("livro_uuid", "Book ID")
    class DevolverLivro(Resource):
        # @token_required
        def post(self, livro_uuid):
            try:
                livro_id = get_livro_id_by_uuid(livro_uuid)
                response = devolver_livro(livro_id, 1)
                return response
            except Exception as e:
                return {"message": str(e), "status": 500 }

    @api.route("/reserved")
    class LivrosReservados(Resource):
        # @token_required
        def get(self):
            try:
                active_user = 1
                response = listar_livros_reservados(active_user)
                return response, 200
            except Exception as e:
                return {"message": str(e)}, 500
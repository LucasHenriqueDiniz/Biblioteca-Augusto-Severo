import uuid
from app.model.livro_model import Livro
from app.extensions import db

def save_changes(data):
    db.session.add(data)
    db.session.commit()

def criar_livro(data):
    livro = Livro(
        titulo=data['titulo'],
        autor=data['autor'],
        ano_publicacao=data['ano_publicacao'],
        categoria=data['categoria'],
        capa=data['capa'],
        sinopse=data['sinopse'],
        uuid=uuid.uuid4().hex
    )
    save_changes(livro)
    return {"created": livro.id}

def listar_todas_livros():
    return Livro.query.all()

def editar_livro(livro_id, data):
    livro = Livro.query.get(livro_id)
    if not livro:
        raise Exception("Book not found")
    
    livro.titulo = data['titulo']
    livro.autor = data['autor']
    livro.ano_publicacao = data['ano_publicacao']
    livro.categoria = data['categoria']
    livro.capa = data['capa']
    livro.sinopse = data['sinopse']
    
    save_changes(livro)
    return {"id": livro.id}

def excluir_livro(livro_id):
    livro = Livro.query.get(livro_id)
    if not livro:
        raise Exception("Book not found")
    
    db.session.delete(livro)
    db.session.commit()
    return {"deleted": livro.id}

def reservar_livro(livro_id, user_id):
    # Verifica se o usuário já tem algum livro reservado
    livros_reservados_usuario = listar_livros_reservados(user_id)
    if livros_reservados_usuario:
        raise Exception("You already have a book reserved")

    # Verifica se o livro em questão já está reservado
    livro = Livro.query.get(livro_id)
    if not livro:
        raise Exception("Book not found") 


    if livro.reserved:
        raise Exception("Book already reserved")

    # Realiza a reserva
    livro.reserved = True
    livro.user_id = user_id

    save_changes(livro)
    return {"id": livro.id}

def devolver_livro(livro_id, user_id):
    # Verifica se o livro em questão já está reservado
    livro = Livro.query.get(livro_id)
    if not livro:
        raise Exception("Book not found")

    if not livro.reserved:
        raise Exception("Book is not reserved")

    # Verifica se o usuário que está devolvendo o livro é o mesmo que o reservou
    if livro.user_id != user_id:
        raise Exception("You can only return books that you have reserved")

    # Realiza a devolução
    livro.reserved = False
    livro.user_id = None

    save_changes(livro)
    return {"id": livro.id}

def listar_livros_reservados(user_id):
    return Livro.query.filter_by(user_id=user_id, reserved=True).all()

def listar_livros_disponiveis():
    return Livro.query.filter_by(reserved=False).all()

def get_livro_id_by_uuid(livro_uuid):
    livro = Livro.query.filter_by(uuid=livro_uuid).first()
    if not livro:
        raise Exception("Book not found")
    return livro.id

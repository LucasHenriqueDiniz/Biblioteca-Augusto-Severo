from app import db
import uuid
class Livro(db.Model):
    """ Book Model for storing book details """
    __tablename__ = "livro"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    uuid = db.Column(db.String(255), unique=True, nullable=False)
    titulo = db.Column(db.String(255), unique=True, nullable=False)
    autor = db.Column(db.String(255), nullable=False)
    ano_publicacao = db.Column(db.Integer, nullable=False)
    categoria = db.Column(db.String(255), nullable=False)
    capa = db.Column(db.String(255), nullable=True)
    sinopse = db.Column(db.String(255), nullable=True)
    reserved = db.Column(db.Boolean, nullable=False, default=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    def __init__(self, titulo, autor, ano_publicacao, categoria, capa, sinopse, uuid):
        self.titulo = titulo
        self.autor = autor
        self.ano_publicacao = ano_publicacao
        self.categoria = categoria
        self.capa = capa
        self.sinopse = sinopse
        self.uuid = uuid
        self.reserved = False
        
    def __repr__(self):
        return "<Livro '{}'>".format(self.titulo)

export type livroType = {
    id?: number;
    titulo: string;
    autor: string;
    ano_publicacao: number;
    categoria: string;
    capa: string;
    sinopse: string;
    reservado?: boolean;
    reservado_por?: string;
    uuid?: string;
    user_id?: number;
}

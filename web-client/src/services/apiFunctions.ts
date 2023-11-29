import axios from "axios";
import { livroType } from "../types/livro";
const API_BASE_URL = 'http://localhost:5000';

export function criarLivro(livro: livroType) {
  return axios.post(`${API_BASE_URL}/livro/`, livro);
}

export function todosLivros() {
  return axios.get(`${API_BASE_URL}/livro/`);
}

export function editarLivro(livroId: any, livro: livroType) {
  return axios.put(`${API_BASE_URL}/livro/${livroId}`, livro);
}

export function excluirLivro(livroId: any) {
  return axios.delete(`${API_BASE_URL}/livro/${livroId}`);
}

export function reservarLivro(livroId: any, reservedBy: any) {
  return axios.post(`${API_BASE_URL}/livro/${livroId}/reserve`);
}

// export function reservarLivro(livroId: any, reservedBy: any) {
//   return axios.post(`${API_BASE_URL}/livro/${livroId}/reserve`, {}, {
//     headers: {
//       'user-id': reservedBy  // Assuming 'user-id' is the header for user ID
//     }
//   });
// }

export function devolverLivro(livroId: any, reservedBy: any) {
  return axios.post(`${API_BASE_URL}/livro/${livroId}/return`);
}

export function listarLivrosReservados() {
  return axios.get(`${API_BASE_URL}/livro/reserved`);
}
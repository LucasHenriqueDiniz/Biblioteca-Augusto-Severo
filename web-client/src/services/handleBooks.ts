import { message } from "antd";
import { reservarLivro, excluirLivro, devolverLivro } from "./apiFunctions";

export const ReservarLivro = async (uuid: string) => {
  const user_id = localStorage.getItem("user_id") || 1;
  try {
    const data = await reservarLivro(uuid, user_id);
    console.log(data);
    if (data.data.status === 200 || data.data.status === 204) {
      message.success("Livro reservado com sucesso!");
    } else {
      message.error("Erro ao reservar livro!");
    }
  } catch (error) {
    console.error(error);
  }
};

export const ExcluirLivro = async (uuid: string) => {
  try {
    const data = await excluirLivro(uuid);
    if (data.status === 200 || data.status === 204) {
      message.success("Livro excluído com sucesso!");
    } else {
      message.error("Erro ao excluir livro!");
    }
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

export const DevolverLivro = async (uuid: string) => {
  const user_id = localStorage.getItem("user_id") || 1;
  try {
    const data = await devolverLivro(uuid, user_id);
    console.log(data);
    if (data.data.status === 200 || data.data.status === 204) {
      message.success("Livro devolvido com sucesso!");
    } else {
      message.error("Erro ao devolver livro!");
    }
  } catch (error) {
    console.error(error);
  }
};

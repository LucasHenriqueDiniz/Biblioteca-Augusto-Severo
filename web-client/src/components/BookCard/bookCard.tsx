import {
  ShoppingCartOutlined,
  DeleteFilled,
  EyeOutlined,
} from "@ant-design/icons";
import { Card, Button, Image, message } from "antd";
import {
  reservarLivro,
  devolverLivro,
  excluirLivro,
} from "../../services/apiFunctions";
import { livroType } from "../../types/livro";

interface BookCardProps {
  titulo: string;
  autor: string;
  capa: string;
  sinopse: string;
  isAdmin: boolean; // Adicionei a propriedade isAdmin
  isReserved: boolean; // Adicionei a propriedade isReserved
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  selectedBook: livroType | null;
  setSelectedBook: (selectedBook: livroType | null) => void;
  props: any;
}

const BookCard = ({
  titulo,
  autor,
  capa,
  sinopse,
  isAdmin,
  isReserved,
  setShowModal,
  setSelectedBook,
  props,
}: BookCardProps) => {
  const ReservarLivro = async (uuid: string) => {
    try {
      const data = await reservarLivro(uuid, 1);
      console.log(data);
      if (data.data.status === 200) {
        message.success("Livro reservado com sucesso!");
      } else {
        message.error("Erro ao reservar livro!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const ExcluirLivro = async (uuid: string) => {
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

  const DevolverLivro = async (uuid: string) => {
    try {
      const data = await devolverLivro(uuid, 1);
      console.log(data);
      if (data.data.status === 200) {
        message.success("Livro devolvido com sucesso!");
      } else {
        message.error("Erro ao devolver livro!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const openModal = () => {
    setSelectedBook(props);
    setShowModal(true);
  };

  return (
    <Card
      title={
        <>
          <p title={titulo} className="text-lg mt-4">
            {titulo}
          </p>
          <div className="font-semibold text-sm text-center mb-2" title={autor}>
            {autor}
          </div>
        </>
      }
      hoverable
      actions={[
        !isReserved ? (
          <div className="flex items-center justify-center h-[30px]">
            <Button
              className="text-lg flex items-center hover:border-blue-400 p-4"
              type="link"
              onClick={() => ReservarLivro(props.uuid)}
            >
              <ShoppingCartOutlined /> Reservar
            </Button>
          </div>
        ) : (
          <div className="flex items-center justify-center h-[30px]">
            <Button
              className="text-lg flex items-center hover:border-blue-400 p-4"
              type="link"
              onClick={() => DevolverLivro(props.uuid)}
            >
              <ShoppingCartOutlined /> Devolver
            </Button>
          </div>
        ),
      ]}
      cover={
        <Image
          src={capa}
          className={`min-h-[350px] max-h-[350px] ${
            isReserved ? "grayscale" : ""
          }`}
        />
      }
      bordered={true}
    >
      {isAdmin && (
        <Button
          type="link"
          danger
          className="absolute top-0 right-0 hover:scale-105"
          onClick={() => ExcluirLivro(props.uuid)}
        >
          <DeleteFilled />
        </Button>
      )}
      <div className="flex items-center justify-center">
        <Button
          type="link"
          onClick={() => openModal()}
          className="flex items-center justifty-center"
        >
          Ver mais <EyeOutlined />
        </Button>
      </div>
    </Card>
  );
};

export default BookCard;

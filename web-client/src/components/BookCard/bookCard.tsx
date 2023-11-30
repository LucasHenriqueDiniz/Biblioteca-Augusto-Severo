import {
  ShoppingCartOutlined,
  DeleteFilled,
  EyeOutlined,
} from "@ant-design/icons";
import { Card, Button, Image } from "antd";
import { ReservarLivro, DevolverLivro, ExcluirLivro } from "../../services/handleBooks";
import { BookCardProps } from "../../types/BookCard";

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

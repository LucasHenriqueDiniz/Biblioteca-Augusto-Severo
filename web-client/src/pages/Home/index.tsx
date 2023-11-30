import { Button, Modal, Spin, Typography } from "antd";
import { Content } from "antd/es/layout/layout";
import { Row, Col, Image } from "antd";
import AddButton from "../../components/addButton/addButton";
import { todosLivros } from "../../services/apiFunctions";
import { useEffect, useState } from "react";
import { livroType } from "../../types/livro";
import BookCard from "../../components/BookCard/bookCard";

interface BookModalProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  props: any;
}

const BookModal = ({ showModal, setShowModal, props }: BookModalProps) => {
  return (
    <>
      {props && (
        <Modal
          title={props.titulo}
          open={showModal}
          onCancel={() => setShowModal(false)}
          footer={[
            <Button key="back" danger onClick={() => setShowModal(false)}>
              Cancelar
            </Button>,
            <Button
              key="submit"
              type="primary"
              onClick={() => setShowModal(false)}
              className="bg-blue-400"
            >
              Reservar
            </Button>,
          ]}
        >
          <h1>{props.title}</h1>
          <div className="min-h-[400px] max-h-[400px]">
            <Image src={props.capa} />
          </div>
          <p>{props.autor}</p>
          <p>{props.sinopse}</p>
        </Modal>
      )}
    </>
  );
};

function Main() {
  const [livros, setLivros] = useState<livroType[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState<livroType | null>(null);
  const [loading, setLoading] = useState(true);

  function updateLivros() {
    todosLivros()
      .then((response) => {
        setLivros(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
      });
  }

  useEffect(() => {
    updateLivros();
  }, [updateLivros]);

  return (
    <Content
      style={{
        maxWidth: "100vw",
        minHeight: "100vh",
        backgroundColor: "#cdcdcd",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Row
        justify="start"
        style={{ padding: "1rem", width: "100%" }}
        align="stretch"
        className="flex flex-col"
        wrap={true}
        gutter={[15, 15]}
      >
        <Typography.Title level={2} className="text-start px-8 ">
          Livros Disponiveis
        </Typography.Title>

        <div className="flex mx-4">
          {loading && (
            <Spin
              size="large"
              style={{
                alignItems: "center",
                width: "100%",
                justifyContent: "center",
              }}
            />
          )}
          {livros.map((livro) => (
            <Col
              key={livro.id}
              xs={24}
              sm={12}
              md={8}
              lg={6}
              xl={4}
              xxl={3}
              className="min-w-[300px]"
            >
              <BookCard
                titulo={livro.titulo}
                autor={livro.autor}
                capa={livro.capa}
                sinopse={livro.sinopse}
                showModal={showModal}
                setShowModal={setShowModal}
                props={livro}
                selectedBook={selectedBook}
                setSelectedBook={setSelectedBook}
                isReserved={livro.user_id ? true : false}
                isAdmin={true}
              />
            </Col>
          ))}
          <AddButton updateBooksNow={() => updateLivros()} isAdmin={true} />
        </div>
      </Row>
      <BookModal
        showModal={showModal}
        setShowModal={setShowModal}
        props={selectedBook}
      />
    </Content>
  );
}

export default Main;

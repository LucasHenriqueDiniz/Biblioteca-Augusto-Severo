import { Layout } from "antd";

const Footer = () => {
  const anoAtual = new Date().getFullYear();
  const { Footer } = Layout;
  return (
    <Footer>
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {anoAtual} Biblioteca Augusto Severo. Todos os direitos reservados.
        </p>
      </div>
    </Footer>
  );
};

export default Footer;

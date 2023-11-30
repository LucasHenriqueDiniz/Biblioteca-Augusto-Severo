import { livroType } from "./livro";

export interface BookCardProps {
  titulo: string;
  autor: string;
  capa: string;
  sinopse: string;
  isAdmin: boolean;
  isReserved: boolean;
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  selectedBook: livroType | null;
  setSelectedBook: (selectedBook: livroType | null) => void;
  props: any;
}

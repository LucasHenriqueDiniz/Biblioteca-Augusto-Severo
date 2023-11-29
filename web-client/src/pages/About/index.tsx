import { Layout } from "antd";

export default function Dashboard() {
  const { Content } = Layout;
  return (
    <Content className="flex items-center justify-center">
      <div className="flex flex-col text-xl max-w-[1300px] items-center justify-center">
        <h1>About Us</h1>
        <p>
          Welcome to the Augusto Severo Library, a place where knowledge comes
          alive and stories unfold. Our library is more than just a collection
          of books; it's a vibrant community hub dedicated to fostering a love
          for literature, learning, and exploration.
        </p>
        <p>
          Named in honor of Augusto Severo, a visionary figure in our community,
          our library strives to carry on his legacy of intellectual curiosity
          and innovation. We believe in the transformative power of books and
          their ability to inspire, educate, and connect people.
        </p>
        <p>
          Our diverse collection spans various genres, from classic literature
          to contemporary works, catering to readers of all ages and interests.
          We provide a welcoming space for individuals to engage in quiet study,
          lively discussions, or simply immerse themselves in the world of
          storytelling.
        </p>
        <p>
          Beyond books, we offer a range of events, workshops, and programs that
          enrich the cultural and educational experience of our community.
          Whether you're a student seeking resources, a book enthusiast, or
          someone looking for a cozy spot to read, the Augusto Severo Library is
          here to serve you.
        </p>
        <p>
          Join us on a journey of exploration, discovery, and lifelong learning.
          Together, let's create a vibrant literary community where every page
          turned is a new adventure.
        </p>
      </div>
    </Content>
  );
}

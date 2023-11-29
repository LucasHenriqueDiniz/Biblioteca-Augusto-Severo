import { Content } from "antd/es/layout/layout";

export default function Dashboard() {
  return (
    <Content className="flex items-center justify-center">
      <div className="flex flex-col text-xl max-w-[1300px] items-center justify-center">
        <h1>Contact Us</h1>
        <p>
          We'd love to hear from you! Whether you have questions, suggestions,
          or just want to say hello, feel free to reach out to us using the
          contact information below.
        </p>
        <div className="flex flex-col items-start">
          <div className="flex flex-col items-start">
            <h2>Email</h2>
            <p>
              General Inquiries:{" "}
              <a href="mailto:info@augustoseverolibrary.com">
                info@augustoseverolibrary.com
              </a>
            </p>
            <p>
              Membership Enquiries:{" "}
              <a href="mailto:membership@augustoseverolibrary.com">
                membership@augustoseverolibrary.com
              </a>
            </p>
          </div>
          <div className="flex flex-col items-start">
            <h2>Phone</h2>
            <p>Main Office: +123-456-7890</p>
            <p>Membership Services: +123-456-7891</p>
          </div>
          <div className="flex flex-col items-start">
            <h2>Visit Us</h2>
            <p>
              Augusto Severo Library
              <br />
              Street Address
              <br />
              City, Country
            </p>
          </div>
        </div>
      </div>
    </Content>
  );
}

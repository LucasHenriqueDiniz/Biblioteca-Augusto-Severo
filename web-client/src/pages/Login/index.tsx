// Login.jsx

import { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Image, Input, Layout, Space, Typography, message } from "antd";
import { useAuth } from "../../store/authContext";
import { Content } from "antd/es/layout/layout";
// import Logo from "../../../public/logo.png"

export function Login() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  type LoginFormType = {
    email: string;
    password: string;
  };

  const handleFinish = useCallback(async (values: LoginFormType) => {
    setIsLoading(true);
    if (await auth.logIn(values)) {
      navigate("/");
    } else {
      message.error("Login failed");
    }
    setIsLoading(false);
  }, []);

  return (
    <Layout className="min-h-screen flex items-center justify-center">
      <Content className="w-full max-w-screen-md flex">
        <div className="bg-white p-8 rounded shadow-md my-auto">
          {/* Adicione a sua logo aqui */}
          <div className="flex items-center justify-center">
          <Image src={"/logo.png?url"} alt="Logo" className="mb-6" width={100} preview={false} />
          </div>

          {/* Adicione a mensagem de boas-vindas aqui */}
          <Typography.Title level={1} className="text-3xl font-bold mb-6">
            Bem-vindo à Biblioteca Augusto Severo
          </Typography.Title>


          <Form requiredMark={false} onFinish={handleFinish} layout="vertical" className="flex flex-col gap-6">
            <Form.Item
              label="Email"
              name="email"
              className="font-semibold text-lg"
              rules={[
                {
                  required: true,
                  message: "Please enter your email",
                },
                {
                  type: "email",
                  message: "Please enter a valid email",
                },
              ]}
            >
              <Input type="email" placeholder="your-email@example.com" className="h-12" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              className="font-semibold text-lg"
              rules={[
                {
                  required: true,
                  message: "Please enter your password",
                },
              ]}
            >
              <Input.Password className="h-12" />
            </Form.Item>

            <Space className="justify-center">
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                loading={isLoading}
                className="text-white bg-blue-500 hover:bg-blue-600 h-12"
              >
                Login
              </Button>
              <Link to="/register" className="ml-2 text-blue-500">
                Register
              </Link>
            </Space>
          </Form>
        </div>
      </Content>
    </Layout>
  );
}

export default Login;

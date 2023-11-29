import { useCallback, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Form,
  Input,
  Space,
  Typography,
  message,
} from "antd";
import { useAuth } from "../../store/authContext";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Register.module.css";

type RegisterFormType = {
  email: string;
  username: string;
  password: string;
  confirm: string;
};

export function Register() {
  const [form] = Form.useForm<RegisterFormType>();
  const auth = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleFinish = useCallback(
    async ({ confirm, ...values }: RegisterFormType) => {
      try {
        setIsLoading(true);
        const registerResponse = await auth.register(values);
        console.log(registerResponse)
        if (registerResponse.success) {
          message.success("Registration successful");
          navigate("/");
        } else {
          message.error("Registration failed");
        }
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return (
    <div className={styles.parent}>
      <Card className={styles.registerCard} bodyStyle={{ width: "100%" }}>
        <Typography.Title>Sign up</Typography.Title>
        <Form
          form={form}
          requiredMark={false}
          onFinish={handleFinish}
          layout="vertical"
          style={{ width: "100%", padding: "0 1rem" }}
        >
          <Form.Item
            validateFirst
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input placeholder="your-email@example.com" min={5} />
          </Form.Item>
          <Form.Item
            validateFirst
            tooltip={
              <span>Username must contain only letters and numbers</span>
            }
            label="Username"
            name="username"
            rules={[
              { required: true, message: "Username é necessario" },
              { pattern: /^[a-zA-Z0-9]*$/, message: "1" },
              { min: 2, message: "2" },
              { max: 32, message: "3" },
            ]}
          >
            <Input placeholder="Username123" maxLength={32} />
          </Form.Item>
          <Form.Item
            validateFirst
            name="password"
            label="Password"
            tooltip="Password must contain at least one uppercase letter, one lowercase letter, and one number"
            rules={[
              {
                required: true,
                message: "Please enter your password",
              },
              { min: 8, message: "Password must be at least 8 characters" },
              { max: 32, message: "Password must be at most 32 characters" },
              {
                pattern: /(?=.*[A-Z])/,
                message: "Password must contain at least one uppercase letter",
              },
              {
                pattern: /(?=.*[a-z])/,
                message: "Password must contain at least one lowercase letter",
              },
              {
                pattern: /(?=.*[0-9])/,
                message: "Password must contain at least one number",
              },
            ]}
          >
            <Input.Password placeholder="Password123@" max={32} />
          </Form.Item>
          <Form.Item
            validateFirst
            label="Confirm password"
            name="confirm"
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "Please confirm your password",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The two passwords that you entered do not match")
                  );
                },
              }),
            ]}
          >
            <Input.Password max={32} />
          </Form.Item>
          <Space size={"large"}>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Confirm
            </Button>
            <Link to="/login">
              Login
            </Link>
          </Space>
        </Form>
      </Card>
    </div>
  );
}

export default Register;
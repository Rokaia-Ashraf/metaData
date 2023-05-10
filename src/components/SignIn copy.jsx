import "antd/dist/antd.min.css";
import Classes from "../styles/SignIn.module.css";
import { useState, useCallback } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    console.log(`name...${name},value....${value}`);
    setUser((u) => ({ ...u, [name]: value }));
  }, []);

  const navigate = useNavigate();

  const onFinish = (e) => {
    e.preventDefault();
    navigate("/mainInfo");
    console.log("Received values of form: ", e.target);
    console.log(user);
  };

  return (
    <>
      <div className={Classes.login}>
        <Form
          name="normal_login"
          className={Classes.login}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input
              name="username"             
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
              onChange={handleChange}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input
              name="password"
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              onChange={handleChange}
            />
          </Form.Item>

          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Link className={Classes.loginForget} to="">
              Forgot password
            </Link>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button m-2"
              onClick={onFinish}
            >
              Sign In
            </Button>
            Or <Link to="/signUp">SignUp now!</Link>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default SignIn;

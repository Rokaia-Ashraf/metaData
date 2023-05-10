import "antd/dist/antd.min.css";
import Classes from "../styles/SignIn.module.css";
import { useState } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import { LoginUser } from "../APIs/auth";
import { ToastContainer } from "react-toastify";

import { useNavigate } from "react-router";

const SignIn = ({ setToken }) => {
  // const [user, setUser] = useState({
  //   username: "",
  //   password: "",
  // });

  // const handleChange = useCallback((e) => {
  //   const { name, value } = e.target;
  //   console.log(`name...${name},value....${value}`);
  //   setUser((u) => ({ ...u, [name]: value }));
  // }, []);

  // const navigate = useNavigate();

  // const onFinish = (e) => {
  //   e.preventDefault();
  //   navigate("/mainInfo");
  //   console.log("Received values of form: ", e.target);
  //   console.log(user);
  // };

  ///////////////////////////////////

  // const userRef = useRef();
  // const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  // const [errMsg, setErrMsg] = useState("");
  const Navigate = useNavigate();
  // useEffect(() => {
  //   userRef.current.focus();
  // }, []);

  // useEffect(() => {
  //   setErrMsg("");
  // }, [user, pwd]);

  const onFinish = async (e) => {
    e.preventDefault();
    const response = await LoginUser(user, pwd);
    if (response) {
      const accessToken = response;
      setToken(accessToken);
      Navigate("/mainInfo");
    }
  };

  return (
    <>
      <ToastContainer />
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
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
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
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
            />
          </Form.Item>

          <div className="text-center">
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
          </div>
        </Form>
      </div>
    </>
  );
};

export default SignIn;

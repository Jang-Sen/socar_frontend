import React, { useState } from "react";
import axios from "axios";
import { Button, Container, Form } from "react-bootstrap";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("이메일 또는 비밀번호를 입력해주세요.");
    }

    console.log("email: " + email);
    console.log("password: " + password);

    try {
      await axios.post("http://localhost/api/v1/auth/login", {
        email,
        password,
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Container style={{ maxWidth: "400px", marginTop: "50px" }}>
      <h2 className="text-center mb-4">로그인</h2>

      <Form onSubmit={loginHandler}>
        <Form.Group controlId="formEmail" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="이메일을 입력하세요."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formPassword" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="비밀번호를 입력하세요."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          로그인
        </Button>
      </Form>

      <div className="text-center mt-3">
        <a href="/signup">회원가입</a>
      </div>
    </Container>
  );
};

export default Login;

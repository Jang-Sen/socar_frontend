import React, { useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useLogin } from "../../hook/useAuthentication";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const loginMutation = useLogin();

  const loginHandler = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("이메일 또는 비밀번호를 입력해주세요.");
      return;
    }

    loginMutation.mutate(
      { email, password },
      {
        onSuccess: () => {
          setError("");
        },
        onError: () => {
          setError("존재하지 않는 회원입니다.");
        },
      },
    );
  };

  return (
    <Container style={{ maxWidth: "400px", marginTop: "50px" }}>
      <h2 className="text-center mb-4">로그인</h2>

      {error && <Alert variant={"danger"}>{error}</Alert>}

      <Form onSubmit={loginHandler}>
        <Form.Group controlId="formEmail" className="mb-3">
          <Form.Label>이메일</Form.Label>
          <Form.Control
            type="email"
            placeholder="이메일을 입력하세요."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formPassword" className="mb-3">
          <Form.Label>비밀번호</Form.Label>
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

        <Link to="/new/password" className="btn btn-outline-primary w-50">
          비밀번호 재설정
        </Link>
        <Link to="/signup" className="btn btn-outline-primary w-50">
          회원가입
        </Link>
      </Form>
    </Container>
  );
};

export default Login;

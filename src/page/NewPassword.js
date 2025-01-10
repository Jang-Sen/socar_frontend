import React, { useState } from "react";
import axios from "axios";
import { Alert, Button, Container, Form } from "react-bootstrap";

const NewPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const sendEmailHandler = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    try {
      await axios.post("http://localhost/api/v1/auth/find/password", { email });
      setSuccess("이메일로 비밀번호 변경 토큰을 전송하였습니다.");

      setStep(2);
    } catch (err) {
      setError("존재하지 않는 계정입니다.");
      console.log(err.message);
    }
  };

  const passwordValidate = (password) => {
    const regex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
    return regex.test(password);
  };

  const newPasswordHandler = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!passwordValidate(newPassword)) {
      setError(
        "비밀번호는 최소 8자 이상, 문자, 숫자, 특수 문자를 포함해야 합니다.",
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      await axios.post("http://localhost/api/v1/auth/update/password", {
        token,
        password: newPassword,
      });
      setSuccess("비밀번호가 성공적으로 변경되었습니다.");

      setEmail("");
      setStep(1);
    } catch (err) {
      setError("비밀번호 변경 토큰이 일치하지 않습니다.");
      console.log(err.message);
    }
  };

  return (
    <Container style={{ maxWidth: "400px", marginTop: "50px" }}>
      <h2 className="text-center mb-4">비밀번호 재설정</h2>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      {step === 1 && (
        <Form onSubmit={sendEmailHandler}>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>이메일</Form.Label>
            <Form.Control
              type="email"
              placeholder="이메일을 입력하세요."
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            이메일 인증
          </Button>
        </Form>
      )}

      {step === 2 && (
        <Form onSubmit={newPasswordHandler}>
          <Form.Group className="mb-3" controlId="token">
            <Form.Label>토큰</Form.Label>
            <Form.Control
              type="text"
              placeholder="이메일로 받은 토큰을 입력하세요."
              value={token}
              onChange={(event) => setToken(event.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="newPassword">
            <Form.Label>새 비밀번호</Form.Label>
            <Form.Control
              type="password"
              placeholder="새 비밀번호를 입력하세요."
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="confirmPassword">
            <Form.Label>새 비밀번호 확인</Form.Label>
            <Form.Control
              type="password"
              placeholder="새 비밀번호를 다시 입력하세요."
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              required
            />
          </Form.Group>

          <Button variant="success" type="submit" className="w-100">
            비밀번호 변경
          </Button>
        </Form>
      )}
    </Container>
  );
};

export default NewPassword;

import React, { useEffect, useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const UpdatePassword = () => {
  const [searchParam] = useSearchParams();
  const token = searchParam.get("token");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

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

      <Form onSubmit={newPasswordHandler}>
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

        <Button variant="primary" type="submit" className="w-100">
          비밀번호 변경
        </Button>
      </Form>
    </Container>
  );
};
export default UpdatePassword;

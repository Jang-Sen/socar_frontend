import React, { useState } from "react";
import { Alert, Button, Container, Form, Spinner } from "react-bootstrap";
import { useNewPassword } from "../../hook/useResetPassword";

const NewPassword = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [email, setEmail] = useState("");

  const newPasswordMutation = useNewPassword();

  const sendEmailHandler = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    newPasswordMutation.mutate(
      { email },
      {
        onSuccess: () => {
          setSuccess("이메일로 비밀번호 변경 링크를 전송하였습니다.");
        },
        onError: () => {
          setError("존재하지 않는 계정입니다.");
        },
      },
    );
  };

  return (
    <Container style={{ maxWidth: "400px", marginTop: "50px" }}>
      <h2 className="text-center mb-4">비밀번호 재설정</h2>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      {newPasswordMutation.isPending && (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">전송중 ...</span>
        </Spinner>
      )}

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

        <Button
          variant="primary"
          type="submit"
          className="w-100"
          disabled={!email}
        >
          이메일 인증
        </Button>
      </Form>
    </Container>
  );
};

export default NewPassword;

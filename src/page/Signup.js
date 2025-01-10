import React, { useState } from "react";
import { Alert, Button, Container, Form, InputGroup } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [otp, setOtp] = useState("");

  const [terms, setTerms] = useState({
    agreeOfTerm: false,
    agreeFourteen: false,
    agreeOfService: false,
    agreeOfEvent: false,
  });

  const [emailSend, setEmailSend] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  // otp 전송
  const sendEmailOTP = async () => {
    try {
      await axios.post("http://localhost/api/v1/auth/email/send", { email });

      console.log(email);

      setEmailSend(true);
      setError("");
      setSuccess("인증번호가 발송되었습니다.");
    } catch (err) {
      setEmailSend(false);
      setError("인증번호 발송에 실패했습니다. 다시 시도해주세요.");
      setSuccess("");
    }
  };

  // otp 확인
  const verifyEmailOTP = async () => {
    try {
      const response = await axios.post(
        "http://localhost/api/v1/auth/email/check",
        {
          email,
          code: otp,
        },
      );

      if (response.data) {
        setEmailVerified(true);
        setError("");
        setSuccess("인증이 완료되었습니다.");
      } else {
        setEmailVerified(false);
        setError("인증번호가 일치하지 않습니다.");
        setSuccess("");
      }

      navigate("/login");
    } catch (err) {
      setEmailVerified(false);
      setError("이메일 인증에 실패했습니다. 다시 시도해주세요.");
      setSuccess("");
    }
  };

  // 비밀번호 확인
  const passwordValidate = (password) => {
    const regex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
    return regex.test(password);
  };

  // 회원가입
  const submitHandler = async (e) => {
    e.preventDefault();

    if (!emailVerified) {
      setError("이메일 인증을 완료해주세요.");
      setSuccess("");
      return;
    }

    if (!passwordValidate(password)) {
      setError(
        "비밀번호는 최소 8자 이상, 문자, 숫자, 특수 문자를 포함해야 합니다.",
      );
      setSuccess("");
      return;
    }

    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      setSuccess("");
      return;
    }

    if (!terms.agreeOfTerm || !terms.agreeFourteen || !terms.agreeOfService) {
      setError("필수 약관에 동의해주세요.");
      return;
    }

    const signupInput = {
      email,
      password,
      username: name,
      phone,
      address,
      term: terms,
    };

    console.log(signupInput);

    try {
      await axios.post("http://localhost/api/v1/auth/signup", signupInput);
      setError("");
      setSuccess("회원가입이 완료되었습니다.");
    } catch (err) {
      setError("회원가입에 실패했습니다. 다시 시도해주세요.");
      setSuccess("");
      console.log(err.message);
    }
  };

  return (
    <Container style={{ maxWidth: "500px", marginTop: "50px" }}>
      <h2 className="text-center mb-4">회원가입</h2>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Form onSubmit={submitHandler}>
        <Form.Group controlId="formName" className="mb-3">
          <Form.Label>이름</Form.Label>
          <Form.Control
            type="text"
            placeholder="이름을 입력하세요."
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formEmail" className="mb-3">
          <Form.Label>이메일</Form.Label>
          <InputGroup>
            <Form.Control
              type="email"
              placeholder="이메일을 입력하세요."
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              disabled={emailVerified}
            />
            {!emailSend && (
              <Button variant="outline-primary" onClick={sendEmailOTP}>
                인증번호 발송
              </Button>
            )}
          </InputGroup>
        </Form.Group>

        {emailSend && !emailVerified && (
          <Form.Group controlId="formEmailOTP" className="mb-3">
            <Form.Label>인증번호</Form.Label>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="인증번호를 입력하세요."
                value={otp}
                onChange={(event) => setOtp(event.target.value)}
              />
              <Button variant="outline-primary" onClick={verifyEmailOTP}>
                인증 확인
              </Button>
            </InputGroup>
          </Form.Group>
        )}

        <Form.Group controlId="formPassword" className="mb-3">
          <Form.Label>비밀번호</Form.Label>
          <Form.Control
            type="password"
            placeholder="비밀번호를 입력하세요."
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formConfirmPassword" className="mb-3">
          <Form.Label>비밀번호 확인</Form.Label>
          <Form.Control
            type="password"
            placeholder="비밀번호를 다시 입력하세요."
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPhone" className="mb-3">
          <Form.Label>핸드폰 번호</Form.Label>
          <Form.Control
            type="text"
            placeholder="핸드폰 번호를 입력하세요.( - 제외 )"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formAddress" className="mb-5">
          <Form.Label>주소</Form.Label>
          <Form.Control
            type="text"
            placeholder="주소를 입력하세요."
            value={address}
            onChange={(event) => setAddress(event.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formTerms" className="mb-3">
          <Form.Check
            type="checkbox"
            label="(필수) 이용약관에 동의합니다."
            checked={terms.agreeOfTerm}
            onChange={(event) =>
              setTerms((prevTerms) => ({
                ...prevTerms, // 기존 상태 복사
                agreeOfTerm: event.target.checked, // 특정 필드만 업데이트
              }))
            }
            required
          />

          <Form.Check
            type="checkbox"
            label="(필수) 만 14세 이상임을 확인합니다."
            checked={terms.agreeFourteen}
            onChange={(event) =>
              setTerms((prevTerms) => ({
                ...prevTerms, // 기존 상태 복사
                agreeFourteen: event.target.checked, // 특정 필드만 업데이트
              }))
            }
            required
          />

          <Form.Check
            type="checkbox"
            label="(필수) 서비스 이용 약관에 동의합니다."
            checked={terms.agreeOfService}
            onChange={(event) =>
              setTerms((prevTerms) => ({
                ...prevTerms, // 기존 상태 복사
                agreeOfService: event.target.checked, // 특정 필드만 업데이트
              }))
            }
            required
          />

          <Form.Check
            type="checkbox"
            label="(선택) 이벤트 정보 수신에 동의합니다."
            checked={terms.agreeOfEvent}
            onChange={(event) =>
              setTerms((prevTerms) => ({
                ...prevTerms, // 기존 상태 복사
                agreeOfEvent: event.target.checked, // 특정 필드만 업데이트
              }))
            }
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          회원 가입
        </Button>
      </Form>
    </Container>
  );
};

export default Signup;

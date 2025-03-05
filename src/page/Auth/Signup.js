import React, { useState } from "react";
import {
  Alert,
  Button,
  Container,
  Form,
  Image,
  InputGroup,
  Row,
  Spinner,
} from "react-bootstrap";
import { useSignup } from "../../hook/useAuthentication";
import { useSendEmail, useVerifyEmail } from "../../hook/useVerification";
import { agreementItems, socialMenu } from "../../common";
import {
  useGoogleLogin,
  useKakaoLogin,
  useNaverLogin,
} from "../../hook/useSocialLogin";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [otp, setOtp] = useState("");

  const [emailSend, setEmailSend] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Mutation
  const signupMutation = useSignup();
  const sendEmailMutation = useSendEmail();
  const verifyEmailMutation = useVerifyEmail();
  const { mutate: googleLogin } = useGoogleLogin();
  const { mutate: naverLogin } = useNaverLogin();
  const { mutate: kakaoLogin } = useKakaoLogin();

  // 이용 약관 초기 상태 설정 (전체 동의 포함)
  const initialAgreements = Object.fromEntries([
    ["all", false],
    ...agreementItems.map((item) => [item.key, false]),
  ]);

  const [agreement, setAgreement] = useState(initialAgreements);

  // 이용 약관 전체 동의 핸들러
  const allCheckHandler = () => {
    const newValue = !agreement.all;
    const updatedAgreements = { all: newValue };

    agreementItems.forEach((item) => {
      updatedAgreements[item.key] = newValue;
    });

    setAgreement(updatedAgreements);
  };

  // 이용 약관 개별 항목 체크/해제
  const singleCheckHandler = (key) => {
    const updatedAgreements = {
      ...agreement,
      [key]: !agreement[key],
    };

    // 모든 항목이 체크되었는지 확인
    const allChecked = agreementItems.every(
      (item) => updatedAgreements[item.key],
    );

    updatedAgreements.all = allChecked;

    setAgreement(updatedAgreements);
  };

  // 소셜 로그인 핸들러
  const socialLoginHandler = async (platform) => {
    if (platform === "google") {
      googleLogin();
    } else if (platform === "naver") {
      naverLogin();
    } else if (platform === "kakao") {
      kakaoLogin();
    }
  };

  // otp 전송
  const sendEmailOTP = async () => {
    sendEmailMutation.mutate(
      { email },
      {
        onSuccess: () => {
          setEmailSend(true);
          setError("");
          setSuccess("인증번호가 발송되었습니다.");
        },
        onError: () => {
          setEmailSend(false);
          setError("인증번호 발송에 실패했습니다. 다시 시도해주세요.");
          setSuccess("");
        },
      },
    );
  };

  // otp 확인
  const verifyEmailOTP = async () => {
    verifyEmailMutation.mutate(
      {
        email,
        code: otp,
      },
      {
        onSuccess: () => {
          setEmailVerified(true);
          setError("");
          setSuccess("인증이 완료되었습니다.");
        },
        onError: () => {
          setEmailVerified(false);
          setError("인증번호가 일치하지 않습니다.");
          setSuccess("");
        },
      },
    );
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

    const signupInput = {
      email,
      password,
      username: name,
      phone,
      address,
      term: agreement,
    };

    signupMutation.mutate(signupInput, {
      onSuccess: () => {
        setError("");
        setSuccess("회원가입이 완료되었습니다.");
      },
      onError: () => {
        setError("회원가입에 실패했습니다. 다시 시도해주세요.");
        setSuccess("");
      },
    });
  };

  return (
    <Container style={{ maxWidth: "500px", marginTop: "50px" }}>
      <h2 className="text-center mb-4">회원가입</h2>

      <Row className="m-4">
        <text
          style={{
            fontSize: "smaller",
            color: "GrayText",
            textAlign: "center",
          }}
        >
          SNS 계정으로 간편하게 로그인 / 회원가입
        </text>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            margin: "15px 0",
          }}
        >
          {socialMenu.map((menu, index) => (
            <Button
              key={menu.id}
              onClick={() => socialLoginHandler(menu.name)}
              style={{
                border: "none",
                background: "transparent",
                marginBottom: "10px",
                cursor: "pointer",
                borderRadius: "5px",
              }}
            >
              <Image
                src={menu.image}
                alt={menu.name}
                style={{ width: "150px", height: "50px" }}
              />
            </Button>
          ))}
        </div>
      </Row>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      {sendEmailMutation.isPending && (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">전송중 ...</span>
        </Spinner>
      )}

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
              <Button
                variant="outline-primary"
                onClick={sendEmailOTP}
                disabled={!email}
              >
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

        <Form.Group controlId="formTerms" className="m-2 mt-4">
          <Form.Label>
            <strong>약관 동의</strong>
          </Form.Label>

          <Form.Check
            type="checkbox"
            label={
              <>
                <strong>전체 동의</strong>
                <text style={{ color: "grey", fontSize: "small" }}>
                  (선택 항목에 대한 동의 포함)
                </text>
              </>
            }
            checked={agreement.all}
            onChange={allCheckHandler}
          />
        </Form.Group>

        {agreementItems.map((item) => (
          <Form.Group key={item.key} className="m-2">
            <Form.Check
              type="checkbox"
              label={item.label}
              checked={agreement[item.key]}
              onChange={() => singleCheckHandler(item.key)}
            />
          </Form.Group>
        ))}

        <Button variant="primary" type="submit" className="mt-3 w-100">
          {signupMutation.isPending ? "회원 가입 중..." : "회원 가입"}
        </Button>
      </Form>
    </Container>
  );
};

export default Signup;

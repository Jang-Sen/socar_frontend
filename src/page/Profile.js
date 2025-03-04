import React, { useState } from "react";
import { useUpdateProfile, useUserInfo } from "../hook/useUserInfo";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  ListGroup,
  Row,
} from "react-bootstrap";

const Profile = () => {
  const { data: user, refetch } = useUserInfo();
  const [editField, setEditField] = useState(null);
  const [newValues, setNewValues] = useState({ address: "", phone: "" });
  const [profileImg, setProfileImg] = useState(null);

  // 주소, 전화번호 업데이트
  const { mutate } = useUpdateProfile({
    onSuccess: () => {
      alert("프로필이 업데이트 되었습니다.");
      setEditField(null);
      refetch();
    },
  });

  // 주소, 전화번호 수정 핸들러
  const profileUpdateHandler = (field) => {
    if (field === "address" || field === "phone") {
      mutate({
        [field]: newValues[field],
      });
    }
  };

  return (
    <Container style={{ maxWidth: "400px", marginTop: "50px" }}>
      <h2 className="text-center mb-4">내 정보 확인</h2>

      <Card className="m-4 shadow-sm" style={{ maxWidth: "400px" }}>
        <Card.Img
          variant="top"
          src={user?.profileImg?.[0]}
          alt="Profile"
          className="rounded-circle mx-auto mt-3"
          style={{ width: "100px", height: "100px", objectFit: "cover" }}
        />
        <Form.Group controlId="formFile" className="mt-3">
          <Form.Control type="file" multiple />
        </Form.Group>

        <Card.Body className="text-center">
          <Card.Title>{user?.username}</Card.Title>

          <Card.Subtitle className="mb-2 text-muted">
            {user?.email}
          </Card.Subtitle>

          <Card.Body>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row className="align-items-center">
                  <Col>
                    <strong>📞 전화번호:</strong>{" "}
                    {editField === "phone" ? (
                      <Form.Control
                        type="text"
                        value={newValues.phone}
                        onChange={(event) =>
                          setNewValues({
                            ...setNewValues,
                            phone: event.target.value,
                          })
                        }
                      />
                    ) : (
                      user?.phone
                    )}
                  </Col>

                  <Col xs="auto">
                    {editField === "phone" ? (
                      <Button
                        variant="success"
                        onClick={() => profileUpdateHandler("phone")}
                      >
                        저장
                      </Button>
                    ) : (
                      <Button
                        variant="outline-primary"
                        onClick={() => setEditField("phone")}
                      >
                        수정
                      </Button>
                    )}
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row className="align-items-center">
                  <Col>
                    <strong>🏠 주소:</strong>{" "}
                    {editField === "address" ? (
                      <Form.Control
                        type="text"
                        value={newValues.address}
                        onChange={(event) =>
                          setNewValues({
                            ...newValues,
                            address: event.target.value,
                          })
                        }
                      />
                    ) : (
                      user?.address
                    )}
                  </Col>

                  <Col xs="auto">
                    {editField === "address" ? (
                      <Button variant="success" onClick>
                        저장
                      </Button>
                    ) : (
                      <Button variant="outline-primary" onClick>
                        수정
                      </Button>
                    )}
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <strong>🔑 로그인 제공자:</strong> {user?.provider}
              </ListGroup.Item>

              <ListGroup.Item>
                <strong>📜 약관 동의 여부:</strong>
                <ul className="mt-2">
                  <li>
                    이용 약관:{" "}
                    {user?.term?.agreeOfTerm ? "✅ 동의" : "❌ 미동의"}
                  </li>

                  <li>
                    만 14세 이상:{" "}
                    {user?.term?.agreeFourteen ? "✅ 동의" : "❌ 미동의"}
                  </li>

                  <li>
                    서비스 동의:{" "}
                    {user?.term?.agreeOfService ? "✅ 동의" : "❌ 미동의"}
                  </li>

                  <li>
                    이벤트 알림:{" "}
                    {user?.term?.agreeOfEvent ? "✅ 동의" : "❌ 미동의"}
                  </li>
                </ul>
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Profile;

import React from "react";
import { Button, Card, Carousel, Col, Container, Row } from "react-bootstrap";

const Main = () => {
  return (
    <div>
      {/* 캐러셀 */}
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://www.socar.kr/images/usp_a.jpg"
            alt="First slide"
          />
          <Carousel.Caption style={{ color: "black" }}>
            <h3>편리한 차량 공유 서비스</h3>
            <p>어디서든 차량을 쉽게 이용하세요.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://www.socar.kr/images/usp_d.jpg"
            alt="Second slide"
          />
          <Carousel.Caption style={{ color: "black" }}>
            <h3>다양한 차량 선택</h3>
            <p>필요에 맞는 차량을 선택하세요.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://www.socar.kr/images/usp_b.jpg"
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>합리적인 가격</h3>
            <p>저렴한 가격으로 차량을 이용하세요.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {/* 카드 섹션 */}
      <Container className="mt-5">
        <h2 className="text-center mb-4">우리의 서비스</h2>
        <Row>
          <Col md={4}>
            <Card>
              <Card.Img
                variant="top"
                src="https://www.socar.kr/images/guide-head.jpg"
              />
              <Card.Body>
                <Card.Title>차량 대여</Card.Title>
                <Card.Text>원하는 차량을 대여하세요.</Card.Text>
                <Button variant="primary" href="/car">
                  자세히 보기
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Img
                variant="top"
                src="https://www.socar.kr/images/benefit-head.jpg"
              />
              <Card.Body>
                <Card.Title>숙소 예약</Card.Title>
                <Card.Text>내가 찾던 숙소를 예약하세요.</Card.Text>
                <Button variant="primary" href="/accommodation">
                  자세히 보기
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Img
                variant="top"
                src="https://www.socar.kr/images/service-head.jpg"
              />
              <Card.Body>
                <Card.Title>안전한 주행</Card.Title>
                <Card.Text>보험과 함께 안전하게 주행하세요.</Card.Text>
                <Button variant="primary" href="/service">
                  자세히 보기
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* 푸터 */}
      <footer className="bg-dark text-white text-center py-4 mt-5">
        <Container>
          <p>© 2025 Socar Clone. All Rights Reserved.</p>
        </Container>
      </footer>
    </div>
  );
};

export default Main;

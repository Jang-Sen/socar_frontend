import React from "react";
import { Card, Container } from "react-bootstrap";

const Service = () => {
  return (
    <Container className="mt-3">
      <Card className="text-white">
        <Card.Img
          src="https://www.socar.kr/images/service-head.jpg"
          alt="이용 안내"
        />
        <Card.ImgOverlay className="d-flex flex-column align-items-center justify-content-center text-center">
          <h2 className="image-overlay text-black">이용 안내</h2>
          <h5 className="image-overlay">
            나에게 꼭 맞는 방법으로 다양한 서비스를 이용해보세요.
          </h5>
        </Card.ImgOverlay>
      </Card>
    </Container>
  );
};

export default Service;

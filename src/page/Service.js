import React from "react";
import { Card, Container } from "react-bootstrap";

const Service = () => {
  const cardImageStyle = {
    width: "100%",
    aspectRatio: "16/4",
    objectFit: "cover",
  };

  return (
    <Container className="mt-3">
      <Card className="text-white">
        <Card.Img
          src="/images/drive_car.jpg"
          alt="이용 안내"
          style={cardImageStyle}
        />
        <Card.ImgOverlay className="d-flex flex-column align-items-center justify-content-center text-center">
          <h2 className="image-overlay">이용 안내</h2>
          <h5 className="image-overlay">
            나에게 꼭 맞는 방법으로 다양한 서비스를 이용해보세요.
          </h5>
        </Card.ImgOverlay>
      </Card>
    </Container>
  );
};

export default Service;

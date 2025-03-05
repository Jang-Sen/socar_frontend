import React from "react";
import { Card, Container } from "react-bootstrap";

const Accommodation = () => {
  const cardImageStyle = {
    width: "100%",
    aspectRatio: "16/4",
    objectFit: "cover",
  };

  return (
    <Container className="mt-3">
      <Card className="text-white">
        <Card.Img
          src="/images/accommodation.jpg"
          alt="숙소 목록"
          style={cardImageStyle}
        />
        <Card.ImgOverlay className="d-flex flex-column align-items-center justify-content-center text-center">
          <h2 className="image-overlay">숙소 목록</h2>
          <h5 className="image-overlay">
            내가 찾던 숙소를 간편하게 예약하세요.
          </h5>
        </Card.ImgOverlay>
      </Card>
    </Container>
  );
};

export default Accommodation;

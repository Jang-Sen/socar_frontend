import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const Car = () => {
  const [cars, setCars] = useState([]);

  const getCar = async () => {
    try {
      const response = await axios.get(
        "http://localhost/api/v1/car/findAll?order=ASC&sort=createdAt&page=1&take=10",
      );

      setCars(response.data.body.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getCar();
  }, []);

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">차량 대여</h2>
      <Row>
        {cars?.map((car) => (
          <Col key={car.id} sm={12} md={6} lg={4} className="mb-4">
            <Card>
              <Card.Img
                variant="top"
                src={
                  car.carImgs && car.carImgs.length > 0
                    ? car.carImgs[0]
                    : "https://via.placeholder.com/150"
                }
                alt={car.carName}
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
              />
              <Card.Body>
                <Card.Title>{car.carName}</Card.Title>
                <Card.Text>
                  <strong>가격: </strong>
                  {car.price} 원
                  <br />
                  <strong>연료: </strong>
                  {car.fuel}
                  <br />
                  <strong>크기: </strong>
                  {car.scale}
                </Card.Text>

                <Link to={`/carDetail/${car.id}`} className="btn btn-primary">
                  자세히 보기
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Car;

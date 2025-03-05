import React, { useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCarList } from "../../hook/useCar";

const Car = () => {
  // const [cars, setCars] = useState([]);
  const [order, setOrder] = useState("DESC");
  const [sort, setSort] = useState("createdAt");
  const [page, setPage] = useState(1);
  const [take, setTake] = useState(10);

  const { data: cars } = useCarList({ order, sort, page, take });

  const pageCount = cars?.meta?.pageCount || 1;

  // 페이지네이션 그룹 (10개씩 표시)
  const [currentGroup, setCurrentGroup] = useState(1);
  const itemsPerPage = 10; // 한 번에 보여줄 페이지 버튼 개수

  const totalGroups = Math.ceil(pageCount / itemsPerPage);
  const startPage = (currentGroup - 1) * itemsPerPage + 1;
  const endPage = Math.min(startPage + itemsPerPage - 1, pageCount);

  // 데이터 보기 개수 변경 핸들러
  const takeChangeHandler = (event) => {
    const value = Number(event.target.value);
    setTake(value);
    setPage(1);
    // console.log('선택한 숫자:', value);
  };

  // 페이지 변경 핸들러
  const pageChangeHandler = (pageNumber) => {
    setPage(pageNumber);
  };

  // 페이지 그룹 변경 핸들러
  const prevGroupHandler = () => {
    if (currentGroup > 1) {
      setCurrentGroup(currentGroup - 1);
    }
  };

  const nextGroupHandler = () => {
    if (currentGroup < totalGroups) {
      setCurrentGroup(currentGroup + 1);
    }
  };

  // const getCar = async () => {
  //   try {
  //     const response = await axios.get(
  //       "http://localhost/api/v1/car/findAll?order=ASC&sort=createdAt&page=1&take=10",
  //     );
  //
  //     setCars(response.data.body.data);
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // };

  return (
    <Container className="mt-3">
      <Card className="text-black">
        <Card.Img
          src="https://www.socar.kr/images/guide-head.jpg"
          alt="차량 목록"
        />
        <Card.ImgOverlay className="d-flex flex-column align-items-center justify-content-center text-center">
          <h2 className="image-overlay">차량 목록</h2>
          <h5 className="image-overlay">
            예약부터 반납까지 간편하게 이용하세요.
          </h5>
        </Card.ImgOverlay>
      </Card>

      {/* Take 설정 */}
      <div className="d-flex justify-content-end mt-3 mb-2">
        <select
          id="numberSelect"
          value={take}
          onChange={takeChangeHandler}
          className="form-select w-auto"
        >
          {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
        <label htmlFor="numberSelect" className="me-2 fw-bold mt-1">
          &nbsp;개씩 보기
        </label>
      </div>

      <Row>
        {cars?.data?.map((car) => (
          <Col key={car.id} sm={12} md={6} lg={4} className="mb-4 mt-3">
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

      {/* 페이지네이션 */}
      <div className="d-flex justify-content-center mt-4">
        {/* 이전 페이지 그룹 버튼 */}
        <Button
          variant="outline-primary"
          className="me-2"
          onClick={prevGroupHandler}
          disabled={currentGroup === 1}
        >
          {"<"}
        </Button>

        {/* 페이지 버튼 (10개씩) */}
        {Array.from(
          { length: endPage - startPage + 1 },
          (_, i) => startPage + i,
        ).map((num) => (
          <Button
            key={num}
            variant={num === page ? "primary" : "outline-primary"}
            className="me-2"
            onClick={() => pageChangeHandler(num)}
          >
            {num}
          </Button>
        ))}

        {/* 다음 페이지 그룹 버튼 */}
        <Button
          variant="outline-primary"
          className="me-2"
          onClick={nextGroupHandler}
          disabled={currentGroup === totalGroups}
        >
          {">"}
        </Button>
      </div>
    </Container>
  );
};

export default Car;

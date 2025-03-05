import React from "react";
import { useParams } from "react-router-dom";
import { Container, Image } from "react-bootstrap";
import { useCarDetail } from "../../hook/useCar";

const CarDetail = () => {
  const { id } = useParams();
  const { data: car } = useCarDetail(id);
  // const [car, setCar] = useState({});

  // const getCarDetail = async () => {
  //   try {
  //     const response = await axios.get(
  //       `http://localhost/api/v1/car/find/${id}`,
  //     );
  //
  //     console.log(response.data.body);
  //     setCar(response.data.body);
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // };
  //
  // useEffect(() => {
  //   getCarDetail();
  // }, [id]);

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">{car?.carName}</h2>
      <Image
        src={
          car?.carImgs && car?.carImgs?.length > 0
            ? car?.carImgs[0]
            : "https://via.placeholder.com/150"
        }
        alt={car?.carName}
        fluid
        className="mb-4"
        style={{ maxHeight: "400px", objectFit: "cover", width: "100%" }}
      />
      <p>
        <strong>가격:</strong> {car?.price}원
      </p>
      <p>
        <strong>연료:</strong> {car?.fuel}
      </p>
      <p>
        <strong>크기:</strong> {car?.scale}
      </p>
    </Container>
  );
};

export default CarDetail;

import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useQueryClient } from "@tanstack/react-query";
import { useUserInfo } from "../hook/useUserInfo";

const NavBar = () => {
  const navigate = useNavigate();

  const { data: user } = useUserInfo();

  const { logout } = useAuth();
  const queryClient = useQueryClient();

  const logoutHandler = () => {
    logout();
    queryClient.removeQueries(["user"]);
    navigate("/");
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Socar Clone
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={() => navigate("/car")}>차량 목록</Nav.Link>
              <Nav.Link onClick={() => navigate("/accommodation")}>
                숙소 목록
              </Nav.Link>
            </Nav>
            <Nav className="ms-auto">
              <Nav.Link onClick={() => navigate("/service")}>
                이용 안내
              </Nav.Link>
              {user?.email ? (
                <>
                  <Nav.Link onClick={() => navigate("/profile")}>
                    {user.username}
                  </Nav.Link>
                  <Nav.Link onClick={logoutHandler}>로그아웃</Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link onClick={() => navigate("/login")}>로그인</Nav.Link>
                  <Nav.Link onClick={() => navigate("/signup")}>
                    회원가입
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;

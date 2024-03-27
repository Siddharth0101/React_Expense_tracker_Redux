import React from "react";
import { Container, Nav, Navbar, Col, Row, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
const Header = () => {
  const loginCheck = useSelector((state) => state.LogInStore.isLogged);
  return (
    <div>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand>
            <Row>
              <Col xs="auto"></Col>
              <Col xs="auto">
                <h1
                  className="mb-0"
                  style={{
                    color: "whitesmoke",
                    textShadow: "2px 2px 4px #000",
                  }}
                >
                  Expense Tracker
                </h1>
              </Col>
            </Row>
          </Navbar.Brand>
          <Nav className="ml-auto">
            <NavLink to="/home" className="nav-link">
              <h4 className="mb-0">Home</h4>
            </NavLink>
            <NavLink to="/tracker" className="nav-link">
              <h4 className="mb-0">Tracker</h4>
            </NavLink>
            <NavLink to="/profile" className="nav-link">
              <h4 className="mb-0">Profile</h4>
            </NavLink>
            <NavLink to="/auth" className="nav-link">
              {!loginCheck && (
                <Button variant="light" className="ml-2">
                  <h6 className="mb-0">Log In</h6>
                </Button>
              )}
              {loginCheck && (
                <Button variant="light" className="ml-2">
                  <h6 className="mb-0">Log Out</h6>
                </Button>
              )}
            </NavLink>
          </Nav>
        </Container>
      </Navbar>
      <Outlet />
    </div>
  );
};

export default Header;

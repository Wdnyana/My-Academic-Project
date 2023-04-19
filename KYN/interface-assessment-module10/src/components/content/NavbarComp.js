import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import { Nav, Navbar, Button, NavDropdown } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../../utils/context/AuthContext";

import "../../assets/css/Navbar.css";
import { imgProfile } from "../../assets/img";

const NavbarComp = (props) => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const isLoggedIn = authCtx.isLoggedIn;

  const profilePicture = authCtx.profile.imageUrl;

  const logoutHandler = () => {
    authCtx.logout();
    navigate("/login");
  };

  return (
    <Navbar className={props.className} bg="dark" variant="dark" sticky="top">
      <Container>
        <NavLink className="navbar-brand fw-bold" style={{ fontSize: "26px" }}>
          KYN Stores
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="my-2 my-lg-0 nav-item me-md-3 text-uppercase">
            <NavLink
              activeclassname="active"
              className="nav-link text-light me-3"
              to="/"
            >
              Home
            </NavLink>
            <NavLink
              activeclassname="active"
              className="nav-link text-light me-3"
              to="/stores"
            >
              Stores
            </NavLink>
            <NavLink
              activeclassname="active"
              className="nav-link text-light me-3"
              to="/about-us"
            >
              About
            </NavLink>
            <NavLink
              activeclassname="active"
              className="nav-link text-light"
              to="/contact-us"
            >
              Contact
            </NavLink>
          </Nav>
          {!isLoggedIn && (
            <Nav>
              <Link to="/login">
                <Button
                  variant="outline-light"
                  className="me-0 me-md-3 mb-md-0 mb-3 px-md-4 text-dark bg-light fw-normal text-uppercase"
                >
                  Login
                </Button>
              </Link>
              <Link to="/registration">
                <Button
                  variant="light"
                  className="me-0 me-md-3 mb-md-0 mb-3 px-md-4 text-dark bg-light fw-normal text-uppercase"
                >
                  Registration
                </Button>
              </Link>
            </Nav>
          )}

          {isLoggedIn && (
            <div className="d-flex text-uppercase">
              <img
                src={profilePicture ? profilePicture : imgProfile}
                alt="profile_picture"
                className="rounded-circle me-2"
                style={{ width: "26px" }}
              />
              <NavDropdown
                title={authCtx.profile.name}
                activeclassname="active"
                className="fw-bold text-light text-uppercase"
              >
                <NavDropdown.Item href="/profile"> My Profile</NavDropdown.Item>
                <NavDropdown.Item href="/stores/add">
                  Add Store
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  <Button
                    variant="danger"
                    className="nav-logout btn-sm"
                    onClick={logoutHandler}
                  >
                    Logout
                  </Button>
                </NavDropdown.Item>
              </NavDropdown>
            </div>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComp;

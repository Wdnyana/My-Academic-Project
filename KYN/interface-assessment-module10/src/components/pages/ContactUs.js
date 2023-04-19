import React from "react";
import { AboutBanner } from "../../assets/img";
import { Row, Col, Form, Button, FloatingLabel, Card } from "react-bootstrap";

import Layout from "../layouts/Layout";

const ContactUs = (props) => {
  // your code here
  return (
    <Layout className={props.className}>
      <div className="container">
        <Row className="my-5 d-flex justify-content-center align-items-center">
          <Col xs={12} md={5}>
            <img
              src={AboutBanner}
              alt="Know Your Neighborhood logo"
              className="img-fluid"
            />
          </Col>
          <Col xs={12} md={7} className="my-4 my-md-0 ">
            <h2>Contact Us</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              malesuada, mi eu congue bibendum, augue nisl facilisis est, non
              sollicitudin velit velit vel augue.
            </p>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={12}>
            <Form className="mt-5">
              <h2 className="mb-4">Contact Form</h2>
              <div className="row d-flex justify-content-center align-items-center">
                <Col xs={12} md={6}>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Enter your Name"
                    className="mb-3"
                    // value={name}
                    // onChange={(e) => onChange(e)}
                    type="text"
                    name="name"
                  >
                    <Form.Control
                      className="shadow-none"
                      type="text"
                      placeholder="Enter your Name"
                    />
                  </FloatingLabel>
                </Col>

                <Col xs={12} md={6}>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="name@example.com"
                    className="mb-3"
                    // value={email}
                    // onChange={(e) => onChange(e)}
                    type="email"
                    name="email"
                  >
                    <Form.Control
                      className="shadow-none"
                      type="email"
                      placeholder="name@example.com"
                    />
                  </FloatingLabel>
                </Col>
                <Col xs={12} md={12}>
                  <FloatingLabel controlId="floatingTextarea2" label="Message">
                    <Form.Control
                      as="textarea"
                      placeholder="Leave a Message here"
                      style={{ height: "100px" }}
                      className="shadow-none"
                    />
                  </FloatingLabel>
                </Col>
                <Button
                  className="mt-4 mb-5 w-50 py-3 text-uppercase fw-bold text-white"
                  variant="dark"
                >
                  Send
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
        <div className="my-5">
          <h2 className="mb-3">Contact Information</h2>
          <Row className="d-flex justify-content-evenly align-items-center border py-5 bg-dark">
            <Col xs={12} md={5} className="border py-3 text-center bg-light">
              <Card.Body>
                <Card.Text>Phone: 0000 - 1111 - 3333</Card.Text>
              </Card.Body>
            </Col>
            <Col xs={12} md={5} className="border py-3 text-center bg-light">
              <Card.Body>
                <Card.Text>Email: putupurwawiadnyanaputra@gmail.com</Card.Text>
              </Card.Body>
            </Col>
            <Col
              xs={12}
              md={10}
              className="border py-3 text-center bg-light mt-0 mt-md-4"
            >
              <Card.Body>
                <Card.Text>
                  Location:{" "}
                  <a href="https://goo.gl/maps/q5xPgndAbsPhqmDJ6">
                    https://goo.gl/maps/q5xPgndAbsPhqmDJ6
                  </a>
                </Card.Text>
              </Card.Body>
            </Col>
          </Row>
        </div>
      </div>
    </Layout>
  );
};

export default ContactUs;

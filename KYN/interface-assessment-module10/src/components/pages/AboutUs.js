import React from "react";
import { Container, Row, Col, Card, Image } from "react-bootstrap";

import Layout from "../layouts/Layout";
import { AboutBanner } from "../../assets/img";
import { AboutProfile } from "../../assets/img";

const AboutUs = (props) => {
  return (
    <Layout className={props.className}>
      <Container>
        <Row className="my-5 d-flex justify-content-center align-items-center">
          <Col xs={12} md={5}>
            <img
              src={AboutBanner}
              alt="Know Your Neighborhood logo"
              className="img-fluid"
            />
          </Col>
          <Col xs={12} md={7}>
            <h1 className="mb-4">About Us</h1>
            <p>
              "Know Your Neighborhood" is an online platform that connects
              residents with important and up-to-date information about their
              surrounding environment. Our goal is to make it easy for residents
              to stay connected with their community and know what's happening
              in their neighborhood.
            </p>
            <p>
              We provide access to information about safety, community events,
              and local businesses, so residents can feel safe and connected in
              their neighborhood. We also offer a marketplace for local products
              and services, making it easy for residents to support their local
              community.
            </p>
          </Col>
        </Row>
        <Row className="my-5">
          <h2 className="mb-4">Our Team</h2>
          <Col xs={12} md={6}>
            <Card className="mb-4 py-4">
              <Image
                src={AboutProfile}
                alt="team member 1"
                className="card-img-top mx-auto d-block rounded-circle border w-50 my-3"
              />
              <Card.Body className="text-center">
                <Card.Title>Putra</Card.Title>
                <Card.Text>Founder and CEO</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={6}>
            <Card className="mb-4 py-4">
              <Image
                src={AboutProfile}
                alt="team member 2"
                className="card-img-top mx-auto d-block rounded-circle border w-50 my-3"
              />
              <Card.Body className="text-center">
                <Card.Title>Wiadnyana</Card.Title>
                <Card.Text>COO and CFO</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="mb-5 d-flex justify-content-between align-items-center">
          <h2 className="mb-4">Our History</h2>
          <Col xs={12} md={5} className=" p-5 bg-dark text-white">
            <p>
              "Know Your Neighborhood" was founded in 2020 by Putra with the
              goal of connecting residents with important and up-to-date
              information about their surrounding environment. The platform
              quickly gained popularity and has since expanded to include a
              marketplace for local products and services.
            </p>
          </Col>
          <Col xs={12} md={5} className=" p-5 bg-dark text-white">
            <p>
              In 2021, Wiadnyana joined the team as COO and CFO and the platform
              continued to grow and improve. Today, "Know Your Neighborhood" is
              a well-established and trusted platform that helps residents stay
              connected with their community and know what's happening in their
              neighborhood.
            </p>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default AboutUs;

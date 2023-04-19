import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const FooterComp = (props) => {
  return (
    <div className={props.className}>
      <footer className="bg-dark py-4 mt-4">
        <Container>
          <Row className="justify-content-center">
            <Col xs={12} className="text-center text-white">
              <p className="text-footer mt-4" style={{ fontSize: "1.3rem" }}>
                Copyright &copy; 2050 &ensp;
                <a href="#" className="text-white">
                  KYN Stores.com
                </a>
              </p>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
};

export default FooterComp;

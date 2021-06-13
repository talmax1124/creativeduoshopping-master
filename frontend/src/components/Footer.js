import React from "react";
import { Container, Row, Col } from "react-bootstrap";


const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-3">
            Copyright &copy; Creative Duo Shop
          </Col>
          <Col className="text-center py-3">
            Copyright &copy;{" "}
            <a href="https://creativeduo.netlify.app">Creative Duo</a>
          </Col>
        </Row>
        <Row className="rowfoot">
          <Col className="text-center py-3">
            <p style={{ display: "inline" }}>External Links: </p>
            <a href="/privacypolicy">
              Privacy Policy{" "}
            </a>{" "}
            {" - "}{" "}
            <a href="/termsandconditions">
              Terms & Conditions{" "}
            </a>
            {" - "}
            <a href="https://creativeduo.statuspage.io">
              Status Page
            </a>
          </Col>
          <Col>
            <div id="google_translate_element"></div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
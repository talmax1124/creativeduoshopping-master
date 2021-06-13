import React from "react";
import { Card, Row, Col } from "react-bootstrap";

const CurrentOffers = () => {
  return (
    <>
      <h1>Current Offers</h1>
      <Row>
        <Col sm={12} md={6} lg={4} xl={3}>
          <Card className="my-3 p-1 rounded cardsss">
            <Card.Img
              variant="top"
              src="https://cdn1.oxatis.com/Files/70764/Img/10/5-percent-off.gif"
            />
            <br></br>
            <Card.Body>
              <Card.Title as="h3" >5% Discount</Card.Title>
              <Card.Title className="boldcode">Use Code: fathersday</Card.Title>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CurrentOffers;

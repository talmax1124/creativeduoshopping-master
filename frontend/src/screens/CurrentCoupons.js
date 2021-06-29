import React from "react";
import { useSelector } from "react-redux";
import { Card, Row, Col } from "react-bootstrap";

const CurrentOffers = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <>
      <h1>Current Offers</h1>
      <Row>
        <Col   className="colmain">
          {userInfo && userInfo.isAdmin && (
            <Card className="my-1 p-1 rounded cardsss c12">
              <Card.Img
                variant="top"
                src="https://image.freepik.com/free-vector/sale-special-offer-banner-10-off-shop-now_1588-699.jpg"
              />
              <br></br>
              <Card.Body>
                <Card.Title as="h3">10% Discount</Card.Title>
                <Card.Title className="boldcode">
                  Use Code: creativeduoadmin
                </Card.Title>
                <Card.Text>
                  You can see this offer because you are a admin.
                </Card.Text>
              </Card.Body>
            </Card>
          )}

          {userInfo && userInfo.isMilitary && (
            <Card className="my-1 p-1 rounded cardsss c12">
              <Card.Img
                variant="top"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7Q-MQHkmDEr4RkF3opHzcZZG2aSUY5vnMJyHzqYgyBH5lO2mDt7lvG-thCURjDOJE5JE&usqp=CAU"
              />
              <br></br>
              <Card.Body>
                <Card.Title as="h3">5% Discount</Card.Title>
                <Card.Title className="boldcode">
                  Use Code: militarydiscount5
                </Card.Title>
                <Card.Text>
                  Thanks for your service! Use this on any of your orders
                </Card.Text>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </>
  );
};

export default CurrentOffers;

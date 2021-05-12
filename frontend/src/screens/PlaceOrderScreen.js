import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";
import { createOrder } from "../actions/orderActions";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";
import { USER_DETAILS_RESET } from "../constants/userConstants";
import { addCoupon } from "../actions/cartActions";

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch();
  const [coupon, setCoupon] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const cart = useSelector((state) => state.cart);

  if (!cart.shippingAddress.address) {
    history.push("/shipping");
  } else if (!cart.paymentMethod) {
    history.push("/payment");
  }

  //   Calculate prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce(
      (acc, item) => acc + item.price + item.specialPrice * item.qty,
      0
    )
  );

  cart.feePrice = addDecimals(Number(0.03 * cart.itemsPrice + 0.3).toFixed(2));

  cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.feePrice)).toFixed(
    2
  );

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
      dispatch({ type: USER_DETAILS_RESET });
      dispatch({ type: ORDER_CREATE_RESET });
    }
    // eslint-disable-next-line
  }, [history, success]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        couponCode: cart.couponCode,
        itemsPrice: cart.itemsPrice,
        feePrice: cart.feePrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  if (cart.couponDiscount) {
    var tempDisc = Number(cart.couponDiscount) * cart.totalPrice;
    cart.totalPrice -= tempDisc;
    cart.totalPrice = cart.totalPrice.toFixed(2);
  }

  if (userInfo.ispromember) {
    cart.totalPrice -= 1;
  }

  const addCouponHandler = () => {
    dispatch(addCoupon(coupon));
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong>
                <br />
                {cart.shippingAddress.address}
                <br />
                {cart.shippingAddress.city} {cart.shippingAddress.state} {""}
                {""}
                {cart.shippingAddress.postalCode}
                <br /> Country: {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {cart.paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x {item.price > 0 && <>${item.price}</>}
                          {item.specialPrice > 0 && <>{item.specialPrice}</>} = $ {""}
                          {item.qty * (item.price + item.specialPrice)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Fee</Col>
                  <Col>${cart.feePrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  {/* User enters the code from the variable below. Live update on change */}
                  <label>Enter Your Coupon Code</label>
                  <br></br>
                  {userInfo && userInfo.ispromember && (
                    <p style={{ color: "red" }}>
                      You are getting this message because you are part of the
                      promember family. You get a dollar discount!
                    </p>
                  )}

                  <input
                    onChange={(e) => setCoupon(e.target.value)}
                    className="couponvalue"
                    placeholder="Enter Coupon Code Here"
                  />

                  <Button
                    type="button"
                    className="btn-block"
                    style={{ marginTop: "5px" }}
                    onClick={addCouponHandler}
                  >
                    Apply Coupon
                  </Button>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                {error && <Message variant="danger">{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;

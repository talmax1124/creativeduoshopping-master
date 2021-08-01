import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Form,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";
import { createOrder } from "../actions/orderActions";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";
import { USER_DETAILS_RESET } from "../constants/userConstants";
import { getCoupons } from "../actions/couponActions";

import OrderNotesJodit from "../components/OrderNotesJodit";

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const cart = useSelector((state) => state.cart);

  const { coupons } = useSelector((state) => ({ ...state.couponsList }));
  const [couponName, setCouponName] = useState("");
  const [Discount, setDiscount] = useState(0);
  const [CouponNotFound, setCouponNotFound] = useState("");
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);

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
      (acc, item) => acc + (item.price + item.specialPrice) * item.qty,
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
    loadAllCoupons();
    if (success) {
      history.push(`/order/${order._id}`);
      dispatch({ type: USER_DETAILS_RESET });
      dispatch({ type: ORDER_CREATE_RESET });
    }
    // eslint-disable-next-line
  }, [history, success]);

  const loadAllCoupons = async () => {
    return await dispatch(getCoupons());
  };

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        orderNotes: cart.orderNotes,
        fileUpload: cart.fileUpload,
        itemsPrice: cart.itemsPrice,
        feePrice: cart.feePrice,
        totalPrice: totalAfterDiscount ? totalAfterDiscount : cart.totalPrice,
      })
    );
    setTotalAfterDiscount(0);
  };
  const handleSubmitCoupon = (e) => {
    e.preventDefault();
    let foundCoupon = coupons.filter((coupon) => coupon.name === couponName);
    if (foundCoupon.length > 0) {
      setDiscount(foundCoupon);
      let finalPrice = (
        cart.totalPrice -
        (cart.totalPrice * foundCoupon[0].discount) / 100
      ).toFixed(2);
      setTotalAfterDiscount(finalPrice);
      setCouponNotFound("");
    } else {
      setCouponName("");
      return setCouponNotFound({
        Message: "Sorry but the coupon does not exist or has not been applied.",
      });
    }
  };

  if (userInfo.ispromember) {
    cart.totalPrice -= 1;
  }

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 step5 step6 />

      <Row>
        <Col md={8}>
          <Link to="/payment">
            <Button variant="info" style={{ marginRight: "5px" }}>
              Go Back
            </Button>
          </Link>
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
              <h2>Order Notes</h2>
              <strong>Notes/Request: </strong>
              {/* {cart.orderNotes} */}
              <OrderNotesJodit  cart={cart}/>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>File Upload</h2>
              <strong>URL: </strong>
              {cart.fileUpload}
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
                          {item.specialPrice > 0 && <>{item.specialPrice}</>} =
                          $ {""}
                          {item.qty * (item.price + item.specialPrice)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
          <Col>
            <Form className="text-end" onSubmit={handleSubmitCoupon}>
              <Form.Group controlId="copon">
                <Form.Label>Insert coupon code:</Form.Label>
                <Form.Control
                  type="text"
                  className="text-end"
                  placeholder="Coupon Code"
                  onChange={(e) => setCouponName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Row>
                <Col className="text-center text-danger" md={9}>
                  {CouponNotFound && CouponNotFound.Message}
                </Col>
                <Col className="text-center">
                  <Button
                    className="mt-4 text-center btn btn-block"
                    type="submit"
                    variant="primary"
                  >
                    Apply Coupon
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>

              {userInfo.ispromember && (
                <ListGroup.Item>
                  <p style={{ color: "red" }}>
                    You have been marked as a pro member. A dollar has been
                    deducted from the total. Thank you for your support!
                  </p>
                </ListGroup.Item>
              )}

              {userInfo.isMilitary && (
                <ListGroup.Item>
                  <p style={{ color: "blue" }}>
                    You have been marked as a military. For a discount, please
                    visit the offers page
                  </p>
                </ListGroup.Item>
              )}

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

              {Discount ? (
                <ListGroup.Item>
                  <Row>
                    <Col>Discount</Col>
                    <Col>{Discount[0].discount}%</Col>
                  </Row>
                </ListGroup.Item>
              ) : (
                ""
              )}

              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>
                    ${totalAfterDiscount ? totalAfterDiscount : cart.totalPrice}
                  </Col>
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

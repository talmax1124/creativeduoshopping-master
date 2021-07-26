import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { saveOrderNotesMethod } from "../actions/cartActions";

import { Link } from "react-router-dom";

const OrderNotes = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress.address) {
    history.push("/shipping");
  }

  const [orderNotes, setOrderNotes] = useState("");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveOrderNotesMethod(orderNotes));
    history.push("/fileupload");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Order Notes / Requests</h1>
      <h6 variant="danger" style={{ color: "red" }}>
        * If you see text in the box below, and you recognize it from a previous
        order made on this device, please delete the text and write your new
        request if needed.
      </h6>
      <br></br>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="orderNotes">
          <Form.Label>Requests? Notes For The Order?</Form.Label>
          <Form.Control
            type="text"
            as="textarea"
            placeholder="Enter your Request or Note."
            value={orderNotes}
            onChange={(e) => setOrderNotes(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Link to="/shipping">
          <Button variant="info" style={{ marginRight: "5px" }}>
            Go Back
          </Button>
        </Link>

        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default OrderNotes;

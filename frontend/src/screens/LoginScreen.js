import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { login, getGoogleUserInfo } from "../actions/userActions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
const eye = <FontAwesomeIcon icon={faEye} />;

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  useEffect(() => {
    if (!userInfo) {
      dispatch(getGoogleUserInfo());
    }
    // eslint-disable-next-line
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  const signInWithGoogleHandler = (e) => {
    e.preventDefault();
    const googleSignInEndPoint =
      process.env.NODE_ENV === "development"
        ? `http://localhost:5000/api/auth/google?redirect=${redirect}`
        : `/api/auth/google?redirect=${redirect}`;
    window.location.href = googleSignInEndPoint;
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type={passwordShown ? "text" : "password"}
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
          <Button className="btn-block btn-info" onClick={togglePasswordVisiblity}>
             <i>{eye}</i> {""} Show/Hide Password
           </Button>
        </Form.Group>

        <Button
          type="submit"
          variant="primary"
          className="button btn-block"
          style={{ marginRight: "5px" }}
        >
          Sign In
        </Button>

        <hr />

        <Button
          type="button"
          className="signningoogle"
          onClick={signInWithGoogleHandler}
        >
          <img
            src="https://img.icons8.com/fluent/48/000000/google-logo.png"
            height="auto"
            alt=""
            style={{ marginRight: "5px" }}
          />{" "}
          Sign In With Google
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          New Customer?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Register
          </Link>
        </Col>

        <Col>
          <a href="/forgotpassword">Forgot Password?</a>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;

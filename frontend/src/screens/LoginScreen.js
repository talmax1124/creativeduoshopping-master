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
    <>
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

    <div className="maincontainer">
        <div class="container-fluid">
            <div class="row no-gutter">
               
                <div class="col-md-6 d-none d-md-flex bg-image"></div>


                
                <div class="col-md-6 bg-light">
                    <div class="login d-flex align-items-center py-5">

                       
                        <div class="container">
                            <div class="row">
                                <div class="col-lg-10 col-xl-7 mx-auto">
                                    <h3 class="display-4">Split page!</h3>
                                    <p class="text-muted mb-4">Create a login split page using Bootstrap 4.</p>
                                    <form>
                                        <div class="form-group mb-3">
                                            <input id="inputEmail" type="email" placeholder="Email address" required="" autofocus="" class="form-control rounded-pill border-0 shadow-sm px-4" />
                                        </div>
                                        <div class="form-group mb-3">
                                            <input id="inputPassword" type="password" placeholder="Password" required="" class="form-control rounded-pill border-0 shadow-sm px-4 text-primary" />
                                        </div>
                                        <div class="custom-control custom-checkbox mb-3">
                                            <input id="customCheck1" type="checkbox" checked class="custom-control-input" />
                                            <label for="customCheck1" class="custom-control-label">Remember password</label>
                                        </div>
                                        <button type="submit" class="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm">Sign in</button>
                                       
                                    </form>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
      </div>

    </>
  );
  
};

export default LoginScreen;

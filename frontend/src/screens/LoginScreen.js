import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
// import FormContainer from "../components/FormContainer";
import { login, getGoogleUserInfo } from "../actions/userActions";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEye } from "@fortawesome/free-solid-svg-icons";
// const eye = <FontAwesomeIcon icon={faEye} />;

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const [passwordShown, setPasswordShown] = useState(false);
  // const togglePasswordVisiblity = () => {
  //   setPasswordShown(passwordShown ? false : true);
  // };

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
      {loading && <Loader />}
      <div className="maincontainer">
        <div className="container-fluid">
          <div className="row no-gutter">
            <div className="col-md-6 d-none d-md-flex bg-image"></div>

            <div className="col-md-6 bg-light">
              <div className="login d-flex align-items-center py-5">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-10 col-xl-7 mx-auto">
                      <h3 className="display-4">Login</h3>
                      <p className="text-muted mb-4">
                        Enter the world of customization
                      </p>
                      {error && <Message variant="danger">{error}</Message>}

                      <form onSubmit={submitHandler}>
                        <div className="form-group mb-3">
                          <input
                            id="email"
                            type="email"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control rounded-pill border-0 shadow-sm px-4"
                          />
                        </div>
                        <div className="form-group mb-3">
                          <input
                            id="password"
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required=""
                            className="form-control rounded-pill border-0 shadow-sm px-4 text-primary"
                          />
                        </div>
                        <div className="custom-control custom-checkbox mb-3">
                          <input
                            id="customCheck1"
                            type="checkbox"
                            className="custom-control-input"
                          />
                          <label
                            htmlFor="customCheck1"
                            className="custom-control-label"
                          >
                            View/Hide Password
                          </label>
                        </div>
                        <button
                          type="submit"
                          className="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm"
                        >
                          Sign in
                        </button>

                        <br />

                        <div className="clearfix">
                          <span>
                            <a href="/forgotpassword" className="float-left">Forgot your password?</a>
                          </span>
                          <span>
                            <a href="/register" className="float-right">Need An Account?</a>
                          </span>
                        </div>

                        <br />

                        <div className="division">
                          <div className="line l"></div>
                          <span>or</span>
                          <div className="line r"></div>
                        </div>

                        <button
                          onClick={signInWithGoogleHandler}
                          className="signningoogle"
                        >
                          <img
                            src="https://img.icons8.com/fluent/48/000000/google-logo.png"
                            height="auto"
                            alt=""
                            style={{ marginRight: "5px" }}
                          />{" "}
                          Sign In With Google
                        </button>
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

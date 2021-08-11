import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import { Spinner, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Message from "../components/Message";
import Loader from "../components/Loader";
// import FormContainer from "../components/FormContainer";
import { verify } from "../actions/userActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";


import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";

import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const RegisterScreen = ({ location, history }) => {
  function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        <Link color="inherit">Creative Duo</Link> {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }

  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

  const classes = useStyles();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [profileImage, setprofileImage] = useState("");
  const [uploadingProfilePicture, setUploadingProfilePicture] = useState(false);

  const uploadFileHandlerone = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploadingProfilePicture(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post(
        "/api/uploadprofilepicture",
        formData,
        config
      );
      setprofileImage(data);
      setUploadingProfilePicture(false);
    } catch (error) {
      console.log(error);
      setUploadingProfilePicture(false);
    }
  };

  const eye = <FontAwesomeIcon icon={faEye} />;
  const eye2 = <FontAwesomeIcon icon={faEye} />;

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  // For Confirm Password

  const [confirmpasswordShown, setconfirmPasswordShown] = useState(false);
  const togglePasswordVisiblity2 = () => {
    setconfirmPasswordShown(confirmpasswordShown ? false : true);
  };

  const dispatch = useDispatch();

  const userVerification = useSelector((state) => state.userVerification);

  const { verification, loading, error } = userVerification;

  const userRegister = useSelector((state) => state.userRegister);
  const {
    loading: loadingRegister,
    error: errorRegister,
    userInfo,
  } = userRegister;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(verify(name, email, password, phone, profileImage));
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>{/* <LockOutlinedIcon /> */}</Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        {loading && (
          <Spinner
            animation="border"
            role="status"
            variant="danger"
            style={{
              width: "100px",
              margin: "auto",
              height: "100px",
              display: "block",
            }}
          />
        )}
        {verification && (
          <Message variant="success">{verification.response}</Message>
        )}
        {error && <Message variant="danger">{error}</Message>}
        {message && <Message variant="danger">{message}</Message>}
        {errorRegister && <Message variant="danger">{errorRegister}</Message>}
        {loadingRegister && <Loader />}
        <form className={classes.form} noValidate onSubmit={submitHandler}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                type="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                type="tel"
                required
                fullWidth
                id="phone"
                label="Phone Number"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="profileImage"
                label="Profile Image URL"
                name="profileImage"
                value={profileImage}
                onChange={(e) => setprofileImage(e.target.value)}
              />
              <Form.File
                id="image-file"
                label="Choose File"
                custom
                onChange={uploadFileHandlerone}
                className="mb-1 mt-1"
              ></Form.File>
              {uploadingProfilePicture && <Loader />}
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={passwordShown ? "text" : "password"}
                id="password"
              />
              <br />

              <Button
                onClick={togglePasswordVisiblity}
                variant="contained"
                color="primary"
                className="mt-1 mb-1"
              >
                <i>{eye}</i>
                Show/Hide Password
              </Button>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="currentPassword"
                label="Confirm Password"
                type={confirmpasswordShown ? "text" : "password"}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <br />
              <Button
                onClick={togglePasswordVisiblity2}
                variant="contained"
                color="primary"
                className="mt-1 mb-1"
              >
                <i>{eye2}</i>
                Show/Hide Password
              </Button>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link
                href={redirect ? `/login?redirect=${redirect}` : "/login"}
                variant="body2"
              >
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>

    // <FormContainer>
    //   <h1>Sign Up</h1>
    //   <Form onSubmit={submitHandler}>
    //     <Form.Group controlId="name">
    //       <Form.Label>Name</Form.Label>
    //       <Form.Control
    //         type="name"
    //         placeholder="Enter name"
    //         value={name}
    //         onChange={(e) => setName(e.target.value)}
    //       ></Form.Control>
    //     </Form.Group>

    //     <Form.Group controlId="email">
    //       <Form.Label>Email Address</Form.Label>
    //       <Form.Control
    //         type="email"
    //         placeholder="Enter email"
    //         value={email}
    //         onChange={(e) => setEmail(e.target.value)}
    //       ></Form.Control>
    //     </Form.Group>

    //     <Form.Group controlId="phone">
    //       <Form.Label>Phone Number</Form.Label>
    //       <Form.Control
    //         type="tel"
    //         placeholder="Enter Phone Number"
    //         value={phone}
    //         onChange={(e) => setPhone(e.target.value)}
    //       ></Form.Control>
    //     </Form.Group>

    //     <Form.Group controlId="password">
    //       <Form.Label>Password</Form.Label>
    //       <Form.Control
    //         type={passwordShown ? "text" : "password"}
    //         placeholder="Enter password"
    //         value={password}
    //         onChange={(e) => setPassword(e.target.value)}
    //       ></Form.Control>
    //       <Button className="btn-block btn-info" onClick={togglePasswordVisiblity}>
    //         <i>{eye}</i>
    //         {""} Show/Hide Password
    //       </Button>
    //     </Form.Group>

    //     <Form.Group controlId="confirmPassword">
    //       <Form.Label>Confirm Password</Form.Label>
    //       <Form.Control
    //         type={confirmpasswordShown ? "text" : "password"}
    //         placeholder="Confirm password"
    //         value={confirmPassword}
    //         onChange={(e) => setConfirmPassword(e.target.value)}
    //       ></Form.Control>
    //       <Button className='btn-block btn-info' onClick={togglePasswordVisiblity2}>
    //         <i>{eye2}</i>{""} Show/Hide Password
    //       </Button>
    //     </Form.Group>

    //     <Button type="submit" className="btn-block" variant="primary">
    //       Register
    //     </Button>
    //   </Form>

    //   <Row className="py-3">
    //     <Col>
    //       Alread Have An Account?{" "}
    //       <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
    //         Login
    //       </Link>
    //     </Col>
    //   </Row>
    // {loading && (
    //   <Spinner
    //     animation="border"
    //     role="status"
    //     variant="danger"
    //     style={{
    //       width: "100px",
    //       margin: "auto",
    //       height: "100px",
    //       display: "block",
    //     }}
    //   />
    // )}
    // {verification && (
    //   <Message variant="success">{verification.response}</Message>
    // )}
    // {error && <Message variant="danger">{error}</Message>}
    // {message && <Message variant="danger">{message}</Message>}
    // {errorRegister && <Message variant="danger">{errorRegister}</Message>}
    // {loadingRegister && <Loader />}
    // </FormContainer>
  );
};

export default RegisterScreen;

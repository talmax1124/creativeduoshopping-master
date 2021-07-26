import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { listMyOrders } from "../actions/orderActions";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

import moment from "moment";

import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const ProfileScreen = ({ location, history }) => {
  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

  const StyledTableRow = withStyles((theme) => ({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

  const useStyles = makeStyles({
    table: {
      minWidth: 700,
    },
  });

  const classes = useStyles();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

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

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails("profile"));
        dispatch(listMyOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
        setPhone(user.phone);
      }
    }
  }, [dispatch, history, userInfo, user, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(
        updateUserProfile({ id: user._id, name, email, password, phone })
      );
    }
  };

  return (
    <>
      <Row>
        <>
          <Col>
            <h2>User Profile</h2>

            {userInfo && userInfo.isMilitary && (
              <p style={{ color: "blue" }}>
                Thank you for your service! Your profile has been marked as a
                Military Member. Check offers page for your discount code
              </p>
            )}

            {message && <Message variant="danger">{message}</Message>}
            {}
            {success && <Message variant="success">Profile Updated</Message>}
            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant="danger">{error}</Message>
            ) : (
              <Form onSubmit={submitHandler}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      type="name"
                      variant="outlined"
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
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
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
                      className="btn mt-1 mb-1 btn-block"
                    >
                      <i>{eye}</i>
                      Show/Hide Password
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
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
                      className="btn mt-1 mb-1 btn-block"
                    >
                      <i>{eye2}</i>
                      Show/Hide Password
                    </Button>
                  </Grid>
                </Grid>

                <Button
                  type="submit"
                  variant="primary"
                  className="btn btn-block mt-1"
                >
                  Update Profile Information
                </Button>
              </Form>
            )}
          </Col>
        </>
      </Row>

      <Col>
        <h2>My Orders</h2>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant="danger">{errorOrders}</Message>
        ) : (
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table" stickyHeader>
              <TableHead>
                <TableRow>
                  <StyledTableCell>ID</StyledTableCell>
                  <StyledTableCell align="right">Date</StyledTableCell>
                  <StyledTableCell align="right">Total</StyledTableCell>
                  <StyledTableCell align="right">Paid</StyledTableCell>
                  <StyledTableCell align="right">Delivered</StyledTableCell>
                  <StyledTableCell align="right">Packed</StyledTableCell>
                  <StyledTableCell align="right">Dispatched</StyledTableCell>
                  <StyledTableCell align="right">
                    Order Cancelled
                  </StyledTableCell>
                  <StyledTableCell align="right">Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <StyledTableRow key={order._id}>
                    <StyledTableCell component="th" scope="row">
                      {order._id}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                    {order.createdAt && (
                      moment(order.createdAt).format("LLL")
                    )}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {order.totalPrice}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {" "}
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <i
                          className="fas fa-times"
                          style={{ color: "red" }}
                        ></i>
                      )}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <i
                          className="fas fa-times"
                          style={{ color: "red" }}
                        ></i>
                      )}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {order.isPacked ? (
                        order.packedAt.substring(0, 10)
                      ) : (
                        <i
                          className="fas fa-times"
                          style={{ color: "red" }}
                        ></i>
                      )}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {order.isDispatched ? (
                        <i
                          className="fas fa-check"
                          style={{ color: "red" }}
                        ></i>
                      ) : (
                        <i
                          className="fas fa-times"
                          style={{ color: "red" }}
                        ></i>
                      )}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {order.isCancelled ? (
                        moment(order.cancelledAt).format("LLL")
                      ) : (
                        <i
                          className="fas fa-times"
                          style={{ color: "red" }}
                        ></i>
                      )}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <LinkContainer to={`/order/${order._id}`}>
                        <Button className="btn-sm" variant="dark">
                          Details
                        </Button>
                      </LinkContainer>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Col>
    </>
  );
};

export default ProfileScreen;

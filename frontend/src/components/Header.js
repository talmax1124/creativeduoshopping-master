import React from "react";
import { Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import SearchBox from "./SearchBox";
import { logout } from "../actions/userActions";
import { ReactComponent as ShoppingIcon } from "../data/shoppingbag.svg";

import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

const Header = () => {
  const useStyles = makeStyles((theme) => ({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const wishlistStore = useSelector((state) => state.productWishList);
  const { wishlist } = wishlistStore;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <div>
        <h6 className="headertitle">
          Shipping Available To The United States Of America & Puerto Rico (PR)
          {/* eslint-disable-next-line */}
          ~ <a onClick={handleOpen} style={{textDecoration: "underline", cursor: "pointer"}}>Learn More</a>
        </h6>
        <div>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <div className={classes.paper}>
                <h2 id="transition-modal-title">Shipping</h2>
                <p id="transition-modal-description">
                  Shipping for US addresses is available for the US and PR. Charges are based on the total weight of the items in the cart. Starting Shipping Rate is $8.50.
                </p>
              </div>
            </Fade>
          </Modal>
        </div>
      </div>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Creative Duo Shop</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Route
              render={({ history }) => (
                <SearchBox history={history} className="ml-auto mr-auto" />
              )}
            />

            <Nav className="ml-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  {/* 
                  Word Version
                  <i className="fas fa-shopping-cart"></i> Cart (
                  {cartItems.reduce((acc, item) => acc + item.qty, 0)}) */}

                  <div className="cart-icon">
                    <ShoppingIcon className="shopping-icon"></ShoppingIcon>
                    <span className="item-count">
                      {" "}
                      {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                    </span>
                  </div>
                </Nav.Link>
              </LinkContainer>

              <LinkContainer to="/" className="home">
                <Nav.Link>
                  <i className="fas fa-home"></i> Home
                </Nav.Link>
              </LinkContainer>

              {userInfo ? (
                <>
                  <LinkContainer to="/wishlist">
                    <Nav.Link>
                      <div className="header__cart_icon">
                        <i className=" fas fa-heart" />{" "}
                        <strong>
                          {wishlist.length > 0 && (
                            <span className="header__cart__count">
                              {wishlist.reduce(
                                (acc, item) => acc + item.qty,
                                0
                              )}
                            </span>
                          )}
                        </strong>
                      </div>
                    </Nav.Link>
                  </LinkContainer>
                  <NavDropdown title={userInfo.name} id="username">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/wishlist">
                      <NavDropdown.Item>WishList</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/currentoffers">
                      <NavDropdown.Item>Offers</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>

                    {userInfo && userInfo.isAdmin && (
                      <>
                        <NavDropdown.Divider
                          style={{ backgroundColor: "pink", padding: ".8px" }}
                        />
                        <p style={{ textAlign: "center" }}>Admin</p>
                        <LinkContainer to="/admin/userlist">
                          <NavDropdown.Item>Users</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/admin/productlist">
                          <NavDropdown.Item>Products</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/admin/orderlist">
                          <NavDropdown.Item>Orders</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/admin/coupon">
                          <NavDropdown.Item>Coupon</NavDropdown.Item>
                        </LinkContainer>
                      </>
                    )}
                  </NavDropdown>
                </>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"></i> Login
                  </Nav.Link>
                </LinkContainer>
              )}

              {/* {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu"></NavDropdown>
              )} */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;

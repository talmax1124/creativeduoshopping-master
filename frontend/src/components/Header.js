/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";

import { Link } from "react-router-dom";

// Search Bar
import SearchBox from "./SearchBox";
import { Route } from "react-router-dom";

// Material-UI Header Message
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import Avatar from "@material-ui/core/Avatar";

// Dropdown from Material UI
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const Header = ({ products }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClickr = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloser = () => {
    setAnchorEl(null);
  };

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
    <>
      <header>
        <div>
          <h6 className="headertitle">
            Shipping Available To The United States Of America & Puerto Rico
            (PR)
            {/* eslint-disable-next-line */}~{" "}
            <a
              onClick={handleOpen}
              style={{ textDecoration: "underline", cursor: "pointer" }}
            >
              Learn More
            </a>
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
                    Shipping for US addresses is available for the US and PR.
                    Charges are based on the total weight of the items in the
                    cart. Starting Shipping Rate is $8.50.
                  </p>
                </div>
              </Fade>
            </Modal>
          </div>
        </div>

        <nav className="flex items-center bg-gray-800 p-3 flex-wrap navv">
          <Link to="/" className="p-2 mr-4 inline-flex items-center">
            <span className="text-xl text-white font-bold uppercase tracking-wide">
              Creative Duo
            </span>
          </Link>
          <button
            className="text-white inline-flex p-3 hover:bg-gray-900 rounded lg:hidden ml-auto hover:text-white outline-none nav-toggler"
            data-target="#navigation"
          >
            <i className="material-icons">menu</i>
          </button>
          <div
            className="hidden top-navbar w-full lg:inline-flex lg:flex-grow lg:w-auto"
            id="navigation"
          >
            <div className="lg:inline-flex lg:flex-row lg:mr-auto lg:w-auto w-full lg:items-center items-start  flex flex-col lg:h-auto srchhh">
              <Route
                render={({ history }) => (
                  <SearchBox
                    history={history}
                    className="ml-auto mr-auto w-full"
                  />
                )}
              />
            </div>
            <div className="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start  flex flex-col lg:h-auto">
              <Link
                to="/cart"
                className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-900 hover:text-white"
              >
                <span>
                  Cart ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                </span>
              </Link>
              {userInfo ? (
                <>
                  <Link
                    to="/wishlist"
                    className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-900 hover:text-white"
                  >
                    <span>Wishlist ({wishlist.length})</span>
                  </Link>
                  <Link
                    to="/currentoffers"
                    className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-900 hover:text-white"
                  >
                    <span>Offers</span>
                  </Link>

                  <Link
                    to="false"
                    className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-900 hover:text-white us"
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={handleClickr}
                  >
                    {userInfo.profileImage && (
                      <Avatar
                        src={userInfo.profileImage}
                        style={{ marginRight: "10px" }}
                      />
                    )}
                    <span id="username">{userInfo.name} </span>{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-900 hover:text-white"
                  >
                    <span>Sign In</span>
                  </Link>
                  <Link
                    to="/register"
                    className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-900 hover:text-white"
                  >
                    <span>Register</span>
                  </Link>
                </>
              )}
            </div>
          </div>
          {/* <i className="far fa-search" /> */}
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted={false}
            className="menudrop"
            open={Boolean(anchorEl)}
            onClose={handleCloser}
            PaperProps={{
              style: {
                transform: "translateX(10px) translateY(35px)",
              },
            }}
          >
            <Link to="/profile">
              <MenuItem>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  style={{ marginRight: "10px" }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>{" "}
                Profile
              </MenuItem>
            </Link>
            <MenuItem onClick={logoutHandler}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                style={{ marginRight: "10px" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Logout
            </MenuItem>
            {userInfo && userInfo.isAdmin && (
              <>
                <hr />
                <Link to="/admin/userlist">
                  <MenuItem>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      style={{ marginRight: "10px" }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    Users
                  </MenuItem>
                </Link>
                <Link to="/admin/productlist">
                  <MenuItem>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      style={{ marginRight: "10px" }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>
                    Products
                  </MenuItem>
                </Link>
                <Link to="/admin/orderlist">
                  <MenuItem>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      style={{ marginRight: "10px" }}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                      />
                    </svg>
                    Orders
                  </MenuItem>
                </Link>
                <Link to="/admin/coupon">
                  <MenuItem>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      style={{ marginRight: "10px" }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z"
                      />
                    </svg>
                    Coupon
                  </MenuItem>
                </Link>
              </>
            )}
          </Menu>

          <div
            className="container items-center  bg-gray-800 navvunder mt-3 w-full w-max-full"
            style={{ color: "white", width: "100%" }}
          >
            <div
              className="p-3  overflow-y-auto border-t whitespace-nowrap scroll-hidden"
              style={{ color: "white" }}
            >
              <ul
                className="inline-flex items-center list-none"
                style={{ color: "white" }}
              >
                <li style={{ color: "white" }}>
                  <a
                    href="/products/category/Infused%20Design"
                    className="px-4 py-1 mr-1 text-base text-blueGray-500 transition duration-500 ease-in-out transform rounded-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:text-black "
                  >
                    Infused Design
                  </a>
                </li>

                <li>
                  <a
                    href="/products/category/Anna%20Sweet%20Treats%20Merch"
                    className="px-4 py-1 mr-1 text-base text-blueGray-500 transition duration-500 ease-in-out transform rounded-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:text-black "
                  >
                    Anna Sweet Treats Merch
                  </a>
                </li>

                <li>
                  <a
                    href="/products/category/Cups-Tumblers-Mugs"
                    className="px-4 py-1 mr-1 text-base text-blueGray-500 transition duration-500 ease-in-out transform rounded-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:text-black "
                  >
                    Cups/Tumblers/Mugs
                  </a>
                </li>

                <li>
                  <a
                    href="/products/category/Kitchen"
                    className="px-4 py-1 mr-1 text-base text-blueGray-500 transition duration-500 ease-in-out transform rounded-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:text-black "
                  >
                    Kitchen
                  </a>
                </li>

                <li>
                  <a
                    href="/products/category/Other"
                    className="px-4 py-1 mr-1 text-base text-blueGray-500 transition duration-500 ease-in-out transform rounded-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:text-black "
                  >
                    Other
                  </a>
                </li>

                <li>
                  <a
                    href="/products/category/Business"
                    className="px-4 py-1 mr-1 text-base text-blueGray-500 transition duration-500 ease-in-out transform rounded-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:text-black "
                  >
                    For Business
                  </a>
                </li>

                <li>
                  <a
                    href="/products/category/Handmade"
                    className="px-4 py-1 mr-1 text-base text-blueGray-500 transition duration-500 ease-in-out transform rounded-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:text-black "
                  >
                    Handmade
                  </a>
                </li>

                <li>
                  <a
                    href="/products/category/Adults"
                    className="px-4 py-1 mr-1 text-base text-blueGray-500 transition duration-500 ease-in-out transform rounded-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:text-black "
                  >
                    Adults
                  </a>
                </li>

                <li>
                  <a
                    href="/products/category/Covid-19"
                    className="px-4 py-1 mr-1 text-base text-blueGray-500 transition duration-500 ease-in-out transform rounded-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:text-black "
                  >
                    Covid-19
                  </a>
                </li>

                <li>
                  <a
                    href="/products/category/Stickers"
                    className="px-4 py-1 mr-1 text-base text-blueGray-500 transition duration-500 ease-in-out transform rounded-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:text-black "
                  >
                    Stickers
                  </a>
                </li>

                <li>
                  <a
                    href="/products/category/Design%20Assets"
                    className="px-4 py-1 mr-1 text-base text-blueGray-500 transition duration-500 ease-in-out transform rounded-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:text-black "
                  >
                    Design Assets
                  </a>
                </li>

                <li>
                  <a
                    href="/products/category/Holidays"
                    className="px-4 py-1 mr-1 text-base text-blueGray-500 transition duration-500 ease-in-out transform rounded-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:text-black "
                  >
                    Holidays
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;

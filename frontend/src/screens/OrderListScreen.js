import React, { useEffect } from "react";

import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import { LinkContainer } from "react-router-bootstrap";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { deleteOrder, listOrders } from "../actions/orderActions";
import moment from "moment";
import Print from "../components/Print";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const OrderListScreen = ({ history }) => {
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

  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // const orderDelete = useSelector((state) => state.orderDelete);
  // const { success: successDelete } = orderDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);
  const printAs = (e) => {
    const downloadAs = e.target.value;

    switch (downloadAs) {
      case "pdf":
        var docDefinition = {
          content: [
            //Header
            {
              table: {
                widths: ["auto", "*"],

                body: [
                  [
                    {
                      text: "Creative Duo Orders",
                      style: "mainheader",
                      bold: true,
                      marginTop: 10,
                    },

                    {
                      width: "*",
                      style: "usersOrders",
                      marginBottom: 30,
                      stack: [
                        {
                          style: "h2",
                          text: `Name: ${userInfo.name}`,
                        },
                        {
                          style: "h2",
                          text: `Email: ${userInfo.email}`,
                        },
                      ],
                    },
                  ],
                ],
              },
              layout: {
                hLineWidth: function (line) {
                  return line === 1;
                },
                vLineWidth: function () {
                  return 0;
                },
                paddingBottom: function () {
                  return 5;
                },
              },
            },

            //Vitals Details
            {
              style: "header",
              table: {
                widths: "*",
                body: [
                  [
                    {
                      border: ["#5bc0de", false, false, false],
                      text: "Orders List",
                    },
                  ],
                ],
              },
            },

            orders.length > 0
              ? {
                  layout: {
                    hLineWidth: function () {
                      return 0;
                    },
                    vLineWidth: function () {
                      return 0;
                    },
                    paddingBottom: function () {
                      return 5;
                    },
                  },
                  table: {
                    headerRows: 1,
                    body: [
                      [
                        {
                          text: "S.No",
                          bold: true,
                          fillColor: "#2B2B52",
                          color: "white",
                        },
                        {
                          text: "ID",
                          bold: true,
                          fillColor: "#2B2B52",
                          color: "white",
                        },
                        {
                          text: "USER",
                          bold: true,
                          fillColor: "#2B2B52",
                          color: "white",
                        },
                        {
                          text: "DATE",
                          bold: true,
                          fillColor: "#2B2B52",
                          color: "white",
                        },
                        {
                          text: "TOTAL PRICE",
                          bold: true,
                          fillColor: "#2B2B52",
                          color: "white",
                        },
                        {
                          text: "PAID",
                          bold: true,
                          fillColor: "#2B2B52",
                          color: "white",
                        },
                        {
                          text: "DELIVERED",
                          bold: true,
                          fillColor: "#2B2B52",
                          color: "white",
                        },
                        {
                          text: "Packed",
                          bold: true,
                          fillColor: "#2B2B52",
                          color: "white",
                        },
                        {
                          text: "Dispatched",
                          bold: true,
                          fillColor: "#2B2B52",
                          color: "white",
                        },
                        {
                          text: "Cancled?",
                          bold: true,
                          fillColor: "#2B2B52",
                          color: "white",
                        },
                      ],

                      ...orders.map((o, i) => [
                        i + 1,
                        o._id,
                        o.user && o.user.name,
                        moment(o.createdAt).format("LLL"),
                        o.totalPrice,
                        o.isPaid ? moment(o.paidAt).format("LLL") : "Not Paid",
                        o.isDelivered
                          ? moment(o.deliveredAt).format("LLL")
                          : "Not Delivered",
                        o.isPacked
                          ? moment(o.packedAt).format("LLL")
                          : "Not Packed",
                        o.isDispatched ? "Dispatched" : "Not Dispatched",
                        o.isCancled
                          ? moment(o.canceledAt).format("LLL")
                          : "Not Canceled",
                      ]),
                    ],
                  },

                  fontSize: 9,
                  alignment: "center",
                }
              : null,
          ],
          styles: {
            header: {
              fontSize: 12,
              marginBottom: 20,
              marginTop: 20,
              bold: true,
            },
            mainheader: {
              fontSize: 15,
            },

            usersOrders: {
              marginLeft: 315,
            },

            h2: {
              marginTop: 5,
              fontSize: 7,
            },
          },
        };
        pdfMake.createPdf(docDefinition).download("Orders.pdf");

        break;
      case "excel":
        break;

      default:
        break;
    }
  };

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      dispatch(deleteOrder(id));
      deleteWindow();
    }
  };

  function deleteWindow() {
    window.location.reload();
    alert(
      "Order Has Been Deleted"
    );
  }

  return (
    <>
      <div className="clearfix">
        <span className="float-left">
          <h1>Orders </h1>
        </span>

        <span className="float-right">
          <Print printAs={printAs} />
        </span>
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <TableContainer component={Paper}>
          <Table
            className={classes.table}
            aria-label="customized table"
            stickyHeader
          >
            <TableHead>
              <TableRow>
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell align="right">Date</StyledTableCell>
                <StyledTableCell align="right">Total</StyledTableCell>
                <StyledTableCell align="right">Paid</StyledTableCell>
                <StyledTableCell align="right">Delivered</StyledTableCell>
                <StyledTableCell align="right">Packed</StyledTableCell>
                <StyledTableCell align="right">Dispatched</StyledTableCell>
                <StyledTableCell align="right">Order Cancelled</StyledTableCell>
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
                    {order.createdAt && moment(order.createdAt).format("LLL")} 
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {order.totalPrice}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {" "}
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {order.isPacked ? (
                      order.packedAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {order.isDispatched ? (
                      <i className="fas fa-check" style={{ color: "red" }}></i>
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {order.isCancelled ? (
                      moment(order.cancelledAt).format("LLL")
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className="btn-sm" variant="dark">
                        Details
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(order._id)}
                    >
                      <i className="fas fa-trash"></i>Delete
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default OrderListScreen;

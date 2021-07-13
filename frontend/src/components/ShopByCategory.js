import React from "react";
// import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

// import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const ShopByCategory = ({ products }) => {
  //GET CATEGORIES
  var categ = products
    .map((product) => {
      return { count: 1, product: product.category };
    })
    .reduce((a, b) => {
      a[b.product] = (a[b.product] || 0) + b.count;
      return a;
    }, {});
  var keys = Object.keys(categ); /* .map((k) => console.log(k)) */

  return (
    <div>
      <h1>Categories</h1>
      {/* <Row>
        {keys.map((cat, k) => (
          <Col className="shop-by-category" key={k} sm={12} md={2}>
            <p>
              <Link
                className="btn btn-primary btn-lg"
                to={`/products/category/${cat}`}
                style={{
                  textTransform: "none",
                  color: "black",
                  backgroundColor: "rgb(240, 240, 240)",
                }}
              >
                {cat}
              </Link>
            </p>
          </Col>
        ))}
      </Row> */}

      <AppBar color="inherit" position="static">
        <Tabs
          variant="scrollable"
          scrollButtons="on"
          aria-label="scrollable force tabs example"
        > 
          {keys.map((cat, k) => (
            <Link to={`/products/category/${cat}`}>
              <Tab key={k} style={{ color: "black" }} label={cat} textColor="primary">
                {cat}
              </Tab>
            </Link>
          ))}
        </Tabs>
      </AppBar>
    </div>
  );
};

export default ShopByCategory;

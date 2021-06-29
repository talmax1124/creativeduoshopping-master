import React from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const ShopByBrand = ({ products }) => {
  //GET BRAND
  var bran = products
    .map((product) => {
      return { count: 1, product: product.brand };
    })
    .reduce((a, b) => {
      a[b.product] = (a[b.product] || 0) + b.count;
      return a;
    }, {});
  var brands = Object.keys(bran); /* .map((k) => console.log(k)) */

  return (
    <div>
      <h1>Brands</h1>
      <Row>
        {brands.map((bran, k) => (
          <Col className="shop-by-category" key={k} sm={12} md={2}>
            <p>
              <Link
                className="btn btn-primary btn-lg"
                to={`/products/brands/${bran}`}
                style={{
                  textTransform: "none",
                  color: "black",
                  backgroundColor: "rgb(240, 240, 240)",
                }}
              >
                {bran}
              </Link>
            </p>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ShopByBrand;

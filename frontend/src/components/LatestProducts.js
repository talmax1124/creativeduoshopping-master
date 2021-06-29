import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Loader from "./Loader";
import Message from "./Message";
import Product from "./Product";
import { listLatestProducts } from "../actions/productActions";
const LatestProducts = () => {
  const dispatch = useDispatch();

  const productLatest = useSelector((state) => state.productLatest);
  const { loading, error, products } = productLatest;

  useEffect(() => {
    dispatch(listLatestProducts());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default LatestProducts;

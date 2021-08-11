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
 <div className="w-full mt-2 mb-1" style={{marginLeft: "-1em"}}>
        <section class="text-gray-600 body-font">
          <div class="container  ">
            <div class="flex flex-wrap w-full">
              <div class="lg:w-1/2 w-full  lg:mb-0">
                <h1 class="sm:text-3xl text-2xl font-medium title-font mb-1 text-gray-900">
                  Newest Product Releases
                </h1>
                <div class="h-1 w-20 bg-blue-500 rounded"></div>
              </div>
            </div>
          </div>
        </section>
      </div>
      
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

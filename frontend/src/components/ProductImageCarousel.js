import React from "react";
import { Carousel, Image } from "react-bootstrap";
import { useSelector } from "react-redux";
import Loader from "./Loader";
import Message from "./Message";

const ProductImageCarousel = ({ match }) => {
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <Carousel variant="dark" className="carouselProd">
        <Carousel.Item className="product-carousel-image">
          <Image
            className="d-block w-100"
            src={product.image}
            alt="Main"
            fluid
            style={{width: "100%", objectFit: "contain" }}
          />
        </Carousel.Item>

        {product.additionalimageone && (
          <Carousel.Item className="product-carousel-image">
            <Image
              src={product.additionalimageone}
              alt="First slide"
              style={{  width: "100%", objectFit: "contain" }}
              fluid
            />
          </Carousel.Item>
        )}
        {product.additionalimagetwo && (
          <Carousel.Item className="product-carousel-image">
            <Image
              src={product.additionalimagetwo}
              alt="First slide"
              style={{  width: "100%", objectFit: "contain" }}
              fluid
            />
          </Carousel.Item>
        )}
        {product.additionalimagethree && (
          <Carousel.Item className="product-carousel-image">
            <Image
              src={product.additionalimagethree}
              style={{  width: "100%", objectFit: "contain" }}
              alt="third slide"
              fluid
            />
          </Carousel.Item>
        )}
      </Carousel>
    </>
  );
};

export default ProductImageCarousel;

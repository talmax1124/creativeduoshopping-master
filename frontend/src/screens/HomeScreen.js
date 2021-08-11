import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Container } from "react-bootstrap";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";
import LatestProducts from "../components/LatestProducts";
// import ShopByCategory from "../components/ShopByCategory";
import ShopByBrand from "../components/ShopByBrand";
import Sort from "../components/Sort";
import Hero from "../components/Hero";
import { listProducts } from "../actions/productActions";
import { addToWishList } from "../actions/wishListActions";
const HomeScreen = ({ match, history, location }) => {
  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  const keyword = match.params.keyword;

  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const wishlistStore = useSelector((state) => state.productWishList);
  const { wishlist } = wishlistStore;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  const addToWishListHandler = (id) => {
    history.push(`/wishlist/${id}`);
    dispatch(addToWishList(productId, qty));
  };

  const checkWishList = (productId) => {
    if (productId) {
      return wishlist.find((item) => {
        return item.product === productId;
      });
    }
  };

  return (
    <>
      <Meta />
      {pageNumber === 1 && <Hero />}

      <Container>
        {/* <ShopByCategory products={products} /> */}
        <br />
        {!keyword && pageNumber === 1 ? (
          <>
            <h3>
              Our Best Selling Products
              <span role="img" aria-label="">
                👇🏻
              </span>
            </h3>
            <ProductCarousel />
          </>
        ) : (
          <Link to="/" className="btn btn-dark">
            <i className="fas fa-arrow-left"></i> Go Back
          </Link>
        )}

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <>
            {!keyword && pageNumber === 1 && <LatestProducts />}

            {/* <div className="w-full mt-2 mb-3" style={{ marginLeft: "-1em" }}>
              <section class="text-gray-600 body-font">
                <div class="container  ">
                  <div class="flex flex-wrap w-full">
                    <div class="lg:w-1/2 w-full  lg:mb-0">
                      <h1 class="sm:text-3xl text-2xl font-medium title-font mb-1 text-gray-900">
                        All Products
                      </h1>
                      <div class="h-1 w-20 bg-blue-500 rounded"></div>
                    </div>
                  </div>
                </div>
              </section>
            </div> */}

            <Row>
              <Col md={3}>
                <h6>Sort By:</h6>
                <Sort products={products} pages={pages} page={page} />
              </Col>
            </Row>
            <Row>
              {products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product
                    product={product}
                    addToWishList={addToWishListHandler}
                    checkWishlist={checkWishList(product._id)}
                  />
                </Col>
              ))}
            </Row>
            <Paginate
              pages={pages}
              page={page}
              keyword={keyword ? keyword : ""}
            />

            <ShopByBrand products={products} />
          </>
        )}
      </Container>
    </>
  );
};

export default HomeScreen;

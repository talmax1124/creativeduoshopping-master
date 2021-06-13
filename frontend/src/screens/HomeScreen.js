import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";
import { listProducts } from "../actions/productActions";
import { addToWishList } from '../actions/wishListActions'
const HomeScreen = ({ match, history , location }) => {
  const productId = match.params.id
  const qty = location.search ? Number(location.search.split('=')[1]) : 1
  const keyword = match.params.keyword;

  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const wishlistStore = useSelector((state) => state.productWishList)
  const { wishlist } = wishlistStore

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  const addToWishListHandler = (id) => {
    history.push(`/wishlist/${id}`)
    dispatch(addToWishList(productId, qty))
  }

  const checkWishList = (productId) => {
    if (productId) {
      return wishlist.find((item) => {
        return item.product === productId
      })
    }
  }

  return (
    <>
      <Meta />
      <h3>
        Our Best Selling Products
        <span role="img" aria-label="">
          👇🏻
        </span>
      </h3>
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-dark">
          Go Back
        </Link>
      )}
      <h1 className="titprd">Products</h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product}
                addToWishList={addToWishListHandler}
                checkWishlist={checkWishList(product._id)} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}

    </>
  );
};

export default HomeScreen;

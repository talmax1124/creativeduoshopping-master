import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { sortProducts } from "../actions/productActions";

const Sort = ({ products, pages, page }) => {
  const [sort, setSort] = useState("");

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error } = productList;

  const sortingSelect = (e) => {
    dispatch(sortProducts(products, e.target.value, pages, page));
    setSort(e.target.value);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <select
          className="form-control"
          style={{ textAlign: "center" }}
          value={sort}
          onChange={(e) => {
            sortingSelect(e);
          }}
        >
          <option value="">Select</option>
          <option value="lowestprice">Price - Low to high</option>
          <option value="highestprice">Price - High to low</option>
          <option value="toprated">Top Rated</option>
          <option value="popularity">Popularity</option>
        </select>
      )}
    </>
  );
};

export default Sort;

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import {
  getCoupons,
  removeCoupon,
  createCoupon,
} from "../actions/couponActions";
import "react-datepicker/dist/react-datepicker.css";

import { Table } from "react-bootstrap";

const CreateCouponPage = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => ({ ...state.userLogin.userInfo }));
  const { coupons } = useSelector((state) => ({ ...state.couponsList }));
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [discount, setDiscount] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAllCoupons();
  }, [dispatch]);

  const loadAllCoupons = async () => {
    return await dispatch(getCoupons());
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await dispatch(createCoupon({ name, expiry, discount }, userInfo.token));
      setLoading(false);
      setName("");
      setDiscount("");
      setExpiry("");
      loadAllCoupons();
    } catch (error) {
      console.log("create coupon err", error);
      setLoading(false);
    }
  };

  const handleRemove = async (couponId) => {
    if (window.confirm("Delete?")) {
      setLoading(true);
      try {
        await dispatch(removeCoupon(couponId, userInfo.token));
        setLoading(false);
        loadAllCoupons();
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  };

  return (
    <div className="container-fluid">
      <div className="row text-end">
        <div className="col-md-10 mx-auto shadow p-3 main rounded mt-3">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>Coupon</h4>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="text-muted">Expiry Date</label>
              <br />
              <DatePicker
                className="form-control overflow"
                selected={expiry}
                minDate={new Date()}
                value={expiry}
                placeholderText="Select a date"
                onChange={(date) => setExpiry(date)}
                required
              />
            </div>
            <div className="form-group">
              <label className="text-muted">Coupon Name </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
                value={name}
                autoFocus
                required
              />
            </div>
            <div className="form-group">
              <label className="text-muted">Percentage discount</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setDiscount(e.target.value)}
                value={discount}
                required
              />
            </div>

            <button className="btn btn-outline-primary">Save</button>
          </form>

          <br />

          <h4>Coupons ({coupons.length})</h4>

          <Table striped bordered hover responsive className="text-center">
            <thead className="thead-light">
              <tr>
                <th scope="col">CODE</th>
                
                <th scope="col">Percentage discount </th>
                <th scope="col">Expiry Date</th>
                <th scope="col">Action</th>
              </tr>
            </thead>

            <tbody>
              {coupons.map((c) => (
                <tr key={c._id}>
                  <td>{c.name}</td>
                  <td>{c.discount}%</td>
                  <td>{new Date(c.expiry).toLocaleDateString()}</td>
                  <td>
                    <i
                      onClick={() => handleRemove(c._id)}
                      className="fas fa-trash"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <div className="col-md-2 text-end"></div>
      </div>
    </div>
  );
};

export default CreateCouponPage;

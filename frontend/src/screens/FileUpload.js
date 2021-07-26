import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { saveFileUploadMethod } from "../actions/cartActions";
import { Link } from 'react-router-dom'

import { Widget } from "@uploadcare/react-widget";



const fileUpload = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress.address) {
    history.push("/shipping");
  }

  const [fileUpload, setFileUpload] = useState("");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveFileUploadMethod(fileUpload));
    history.push("/payment");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 step4 />
      <h1>File Upload</h1>
      <p variant="danger" style={{ color: "red" }}>
        * If you don't have any files, please proceed. If the file upload widget does not work, use the button that says "Upload Google Drive Files" to upload to Google Drive
      </p>
      <br></br>

      <Widget
        publicKey="ea2d5f102203c327acc8"
        onChange={(info) => {
          console.log(info.cdnUrl);
          alert(
            "Your File URL is: " +
              info.cdnUrl +
              "Screenshot it"
          );
          setFileUpload(info.cdnUrl)
        //   setFileUpload(info.cdnUrl)
        }}
        previewStep="true"
        // role="uploadcare-uploader"
        data-multiple="true"
        data-multiple-min="1"
        id="file"
        disabled="true"
      />

      <br></br>
      <Form onSubmit={submitHandler}>
        <br></br>
        <Form.Group controlId="fileUpload">
          <Form.Label>File Upload</Form.Label>
          <Form.Control
            type="text"
            readOnly
            placeholder="File Upload. You do not have access to this input"
            value={fileUpload}
            onChange={(e) => setFileUpload(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Link to="/ordernotes">
          <Button variant="info" style={{ marginRight: "5px" }}>
            Go Back
          </Button>
        </Link>

        <Button type="submit" variant="primary">
          Continue / Proceed
        </Button>
      </Form>

      <br></br>

      <a href="https://drive.google.com/drive/folders/14whII9_d7N_VpJIqyeiyY9UoizauatDX?usp=sharing">
      <Button className="btn btn-block" variant="success"><i class="fab fa-google-drive"></i>  Upload Google Drive Files</Button>
      </a>
    </FormContainer>
  );
};

export default fileUpload;

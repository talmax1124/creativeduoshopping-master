import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const TermsandConditions = () => {
  return (
    <>
      <div>
        <Link to="/login">
          <Button>Go Back</Button>
        </Link>

        <h1>Terms & Conditions</h1>
      </div>
    </>
  );
};

export default TermsandConditions;

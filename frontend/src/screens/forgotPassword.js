import React from "react";
import { Button } from "react-bootstrap";

const forgotPassword = () => {
  return (
    <>
      <div>
        <a href="/login">
          <Button>Go Back</Button>
        </a>
        <h1>Forgot Your Password?</h1>

        <form
          action="https://formsubmit.co/creativeduo2020@gmail.com"
          method="POST"
          className="formm"
        >
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter Your Name"
            required
          />
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="Enter Your Email"
            required
          />
          <button type="submit">Send</button>
        </form>

        <br>
        </br>

        <p>Once we recieve your email, we will give you a default password</p>
      </div>
    </>
  );
};

export default forgotPassword;

import React from "react";
// import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <div className="footer-dark">
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-sm-6 col-md-3 item">
              <h3 style={{ color: "whitesmoke" }}>Links</h3>
              <ul>
                <li>
                  <a href="/privacypolicy" target="blank">Privacy Policy</a>
                </li>
                <li>
                  <a href="/termsandconditions" target="blank">Terms & Conditions </a>
                </li>
                <li>
                  <a href="https://creativeduo.statuspage.io" target="blank">Status Page</a>
                </li>
              </ul>
            </div>
            <div className="col-sm-6 col-md-3 item">
              <h3 style={{ color: "whitesmoke" }}>More</h3>
              <ul>
                <li>
                  <a href="https://creativeduo.netlify.app" target="blank">Home Website</a>
                </li>
                <li>
                  <a href="https://linktr.ee/creativeduo2020" target="blank">More Links</a>
                </li>
                <li>
                  <a href="/customwork" target="blank">Custom Digital Wesbites</a>
                </li>
                <li>
                  <a href="/contactus" target="blank">Contact Us</a>
                </li>
              </ul>
            </div>
            <div className="col-md-6 item text">
              <h3 style={{ color: "whitesmoke" }}>Creative Duo</h3>
              <p>
                Creative Duo is a small business that specialises in making
                custom made products. We make websites, shirts, stickers, logos,
                and more.
              </p>
            </div>
          </div>
          <p className="copyright">Creative Duo © {new Date().getFullYear()}</p>
          <br />
          <center>
            <div id="google_translate_element"></div>
          </center>
        </div>
      </footer>
    </div>
  );
};

export default Footer;

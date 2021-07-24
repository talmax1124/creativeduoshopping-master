import React from "react";
// import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <div class="footer-dark">
      <footer>
        <div class="container">
          <div class="row">
            <div class="col-sm-6 col-md-3 item">
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
            <div class="col-sm-6 col-md-3 item">
              <h3 style={{ color: "whitesmoke" }}>More</h3>
              <ul>
                <li>
                  <a href="https://creativeduo.netlify.app" target="blank">Home Website</a>
                </li>
                <li>
                  <a href="https://linktr.ee/creativeduo2020" target="blank">More Links</a>
                </li>
              </ul>
            </div>
            <div class="col-md-6 item text">
              <h3 style={{ color: "whitesmoke" }}>Creative Duo</h3>
              <p>
                Creative Duo is a small business that specialises in making
                custom made products. We make websites, shirts, stickers, logos,
                and more.
              </p>
            </div>
          </div>
          <p class="copyright">Creative Duo © {new Date().getFullYear()}</p>
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

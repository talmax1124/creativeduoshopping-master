import React from "react";
import { Button } from "react-bootstrap";

const CustomWork = () => {
  return (
    <>
      <h1>Custom Work Pricing</h1>

      <h5>For Websites (Starting Price):</h5>

      <div className="maincontainer">
        <section>
          <div className="container py-5">
            <div className="row text-center align-items-end">
              <div className="col-lg-4 mb-5 mb-lg-0">
                <div className="bg-white p-5 rounded-lg shadow">
                  <h1 className="h6 text-uppercase font-weight-bold mb-4">
                    Basic E-Commerce
                  </h1>
                  <h2 className="h1 font-weight-bold">$600 or more</h2>

                  <div className="custom-separator my-4 mx-auto bg-primary"></div>

                  <ul className="list-unstyled my-5 text-small text-left">
                    <li className="mb-3">
                      <i className="fa fa-check mr-2 text-primary"></i>Fully
                      Customized Website
                    </li>
                    <li className="mb-3">
                      <i className="fa fa-check mr-2 text-primary"></i>1 Custom
                      Feature (If Possible)
                    </li>
                    <li className="mb-3">
                      <i className="fa fa-check mr-2 text-primary"></i>Regular
                      .herokuapp.com domain
                    </li>
                    <li className="mb-3">
                      <i className="fa fa-check mr-2 text-primary"></i>Customer
                      Chat Widget Integration
                    </li>
                    <li className="mb-3">
                      <i className="fa fa-check mr-2 text-primary"></i> Use of
                      Website Tutorial
                    </li>
                    <li className="mb-3">
                      <i className="fa fa-check mr-2 text-primary"></i> Special
                      Revision (Minor Changes)
                    </li>
                    <li className="mb-3">
                      <i className="fa fa-check mr-2 text-primary"></i> Basic
                      Sign-In
                    </li>
                  </ul>
                  <a href="mailto: admin@creativeduo.net">
                    {" "}
                    <Button className="btn btn-primary btn-block p-2 shadow rounded-pill">
                      Contact Us
                    </Button>
                  </a>
                </div>
              </div>

              <div className="col-lg-4 mb-5 mb-lg-0">
                <div className="bg-white p-5 rounded-lg shadow">
                  <h1 className="h6 text-uppercase font-weight-bold mb-4">
                    Pro E-Commerce
                  </h1>
                  <h2 className="h1 font-weight-bold">$800 or more</h2>

                  <div className="custom-separator my-4 mx-auto bg-primary"></div>

                  <ul className="list-unstyled my-5 text-small text-left font-weight-normal">
                    <li className="mb-3">
                      <i className="fa fa-check mr-2 text-primary"></i>{" "}
                      Everything in Basic
                    </li>
                    <li className="mb-3">
                      <i className="fa fa-check mr-2 text-primary"></i> .com,
                      .net, .org domain for a year
                    </li>
                    <li className="mb-3">
                      <i className="fa fa-check mr-2 text-primary"></i> 2 Custom
                      Features (If Possible)
                    </li>
                    <li className="mb-3">
                      <i className="fa fa-check mr-2 text-primary"></i> Special
                      Revision (Medium Changes)
                    </li>
                    <li className="mb-3">
                      <i className="fa fa-check mr-2 text-primary"></i> Special
                      Change Oppurtunity After A Year
                    </li>
                    <li className="mb-3">
                      <i className="fa fa-check mr-2 text-primary"></i> More
                      than 3 other information pages
                    </li>
                    <li className="mb-3">
                      <i className="fa fa-check mr-2 text-primary"></i> Google
                      Social Media Sign In
                    </li>
                  </ul>
                  <a href="mailto: admin@creativeduo.net">
                    {" "}
                    <Button className="btn btn-primary btn-block p-2 shadow rounded-pill">
                      Contact Us
                    </Button>
                  </a>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="bg-white p-5 rounded-lg shadow">
                  <h1 className="h6 text-uppercase font-weight-bold mb-4">
                    Enterprise E-Commerce
                  </h1>
                  <h2 className="h1 font-weight-bold">$1500 or more</h2>

                  <div className="custom-separator my-4 mx-auto bg-primary"></div>

                  <ul className="list-unstyled my-5 text-small text-left font-weight-normal">
                    <li className="mb-3">
                      <i className="fa fa-check mr-2 text-primary"></i>{" "}
                      Everything In Pro
                    </li>
                    <li className="mb-3">
                      <i className="fa fa-check mr-2 text-primary"></i>{" "}
                      Unlimited Info Pages
                    </li>
                    <li className="mb-3">
                      <i className="fa fa-check mr-2 text-primary"></i>{" "}
                      Unlimited Features (If Possible)
                    </li>
                    <li className="mb-3">
                      <i className="fa fa-check mr-2 text-primary"></i> Domain
                      .com, .net, .org, or other available domain for 2 years
                    </li>
                    <li className="mb-3">
                      <i className="fa fa-check mr-2 text-primary"></i>{" "}
                      Revisions or Changes for 2 years
                    </li>
                    <li className="mb-3">
                      <i className="fa fa-check mr-2 text-primary"></i>{" "}
                      Unlimited Revisions
                    </li>
                    <li className="mb-3">
                      <i className="fa fa-check mr-2 text-primary"></i> Any
                      Social Media Sign In
                    </li>
                  </ul>
                  <a href="mailto: admin@creativeduo.net">
                    {" "}
                    <Button className="btn btn-primary btn-block p-2 shadow rounded-pill">
                      Contact Us
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Static Sites Table */}
      <h5>Static Sites:</h5>
      <div className="maincontainer">
        <section>
          <div className="container py-5">
            <div className="row text-center align-items-end">
              <div className="col-lg-4 mb-5 mb-lg-0">
                <div className="bg-white p-5 rounded-lg shadow">
                  <h1 className="h6 text-uppercase font-weight-bold mb-4">
                    Basic Static
                  </h1>
                  <h2 className="h1 font-weight-bold">$300 or more</h2>

                  <div className="custom-separator my-4 mx-auto bg-primary"></div>

                  <ul className="list-unstyled my-5 text-small text-left">
                    <li className="mb-3">
                      <i className="fa fa-check mr-2 text-primary"></i>Fully
                      Customized Website
                    </li>

                    <li className="mb-3">
                      <i className="fa fa-check mr-2 text-primary"></i>3 pages
                    </li>

                    <li className="mb-3">
                      <i className="fa fa-check mr-2 text-primary"></i>{" "}
                      .netlify.app domain
                    </li>
                  </ul>
                  <a href="mailto: admin@creativeduo.net">
                    {" "}
                    <Button className="btn btn-primary btn-block p-2 shadow rounded-pill">
                      Contact Us
                    </Button>
                  </a>
                </div>
              </div>

              <div className="col-lg-4 mb-5 mb-lg-0">
                <div className="bg-white p-5 rounded-lg shadow">
                  <h1 className="h6 text-uppercase font-weight-bold mb-4">
                    Pro Static
                  </h1>
                  <h2 className="h1 font-weight-bold">$450 or more</h2>

                  <div className="custom-separator my-4 mx-auto bg-primary"></div>

                  <ul className="list-unstyled my-5 text-small text-left font-weight-normal">
                    <li className="mb-3">
                      <i className="fa fa-check mr-2 text-primary"></i>{" "}
                      Everything in Basic
                    </li>
                    <li className="mb-3">
                      <i className="fa fa-check mr-2 text-primary"></i>6 pages
                    </li>
                    <li className="mb-3">
                      <i className="fa fa-check mr-2 text-primary"></i> custom
                      domain for a year
                    </li>
                  </ul>
                  <a href="mailto: admin@creativeduo.net">
                    {" "}
                    <Button className="btn btn-primary btn-block p-2 shadow rounded-pill">
                      Contact Us
                    </Button>
                  </a>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="bg-white p-5 rounded-lg shadow">
                  <h1 className="h6 text-uppercase font-weight-bold mb-4">
                    Enterprise Static
                  </h1>
                  <h2 className="h1 font-weight-bold">$700 or more</h2>

                  <div className="custom-separator my-4 mx-auto bg-primary"></div>

                  <ul className="list-unstyled my-5 text-small text-left font-weight-normal">
                    <li className="mb-3">
                      <i className="fa fa-check mr-2 text-primary"></i>{" "}
                      Everything In Pro
                    </li>
                    <li className="mb-3">
                      <i className="fa fa-check mr-2 text-primary"></i>8 or more
                      pages
                    </li>
                    <li className="mb-3">
                      <i className="fa fa-check mr-2 text-primary"></i> custom
                      domain for 2 years
                    </li>
                  </ul>
                  <a href="mailto: admin@creativeduo.net">
                    {" "}
                    <Button className="btn btn-primary btn-block p-2 shadow rounded-pill">
                      Contact Us
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default CustomWork;

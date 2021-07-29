import React from "react";

const contactus = () => {
  return (
    <>
      <section
        class="section-bg"
        style={{
          backgroundImage: `url("https://i.ibb.co/9p3Cnk9/slider-2.jpg")`,
        }}
        data-scroll-index="7"
      >
        <div class="overlay pt-100 pb-100 ">
          <div class="container">
            <div class="row">
              <div class="col-lg-6 d-flex align-items-center">
                <div class="contact-info">
                  <h2 class="contact-title">Have Any Questions?</h2>
                  <p>
                   If you have any questions, please feel free to contact us. We are always more than happy to help.
                  </p>
                  <ul class="contact-info">
                    <li>
                      <div class="info-left">
                        <i class="fas fa-mobile-alt"></i>
                      </div>
                      <div class="info-right">
                        <h4>+4075368743</h4>
                      </div>
                    </li>
                    <li>
                      <div class="info-left">
                        <i class="fas fa-at"></i>
                      </div>
                      <div class="info-right">
                        <h4>support@creativeduo.net</h4>
                      </div>
                    </li>
                   
                  </ul>
                </div>
              </div>
              <div class="col-lg-6 d-flex align-items-center">
                <div class="contact-form">
                  <form id="contact-form" action="https://formsubmit.co/carlitosdiazplaza@gmail.com" method="POST">
                    <input type="hidden" name="form-name" value="contactForm" />
                    <div class="row">
                      <div class="col-md-12">
                        <div class="form-group">
                          <input
                            type="text"
                            name="name"
                            class="form-control"
                            id="first-name"
                            placeholder="Enter Your Name *"
                          />
                        </div>
                      </div>
                      <div class="col-md-12">
                        <div class="form-group">
                          <input
                            type="email"
                            name="email"
                            class="form-control"
                            id="email"
                            placeholder="Enter Your Email *"
                          />
                        </div>
                      </div>

                      <div class="col-md-12">
                        <div class="form-group">
                          <textarea
                            rows="4"
                            name="message"
                            class="form-control"
                            id="description"
                            placeholder="Enter Your Message *"
                          ></textarea>
                        </div>
                      </div>
                      <div class="col-md-12">
                        <button class="btn-big btn btn-bg">
                          Send Us <i class="fas fa-arrow-right"></i>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default contactus;

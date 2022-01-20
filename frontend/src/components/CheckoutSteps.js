import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const CheckoutSteps = ({ step1, step2, step3, step4, step5, step6 }) => {
  return (
    <Nav className="justify-content-center mb-4">
      <Nav.Item>
        {step1 ? (
          <LinkContainer to="/login">
            <Nav.Link>
              <i className="fas fa-check-circle"></i> Sign In
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>
            <i className="far fa-times-circle"></i> Sign In
          </Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step2 ? (
          <LinkContainer to="/shipping">
            <Nav.Link>
              <i className="fas fa-check-circle"></i> Shipping
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>
            <i className="far fa-times-circle"></i> Shipping
          </Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step3 ? (
          <LinkContainer to="/ordernotes">
            <Nav.Link>
              <i className="fas fa-check-circle"></i> Order Notes
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>
            <i className="far fa-times-circle"></i> Order Notes
          </Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step4 ? (
          <LinkContainer to="/fileupload">
            <Nav.Link>
              <i className="fas fa-check-circle"></i> File Uploads
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>
            <i className="far fa-times-circle"></i> File Uploads
          </Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step5 ? (
          <LinkContainer to="/paymentmethod">
            <Nav.Link>
              <i className="fas fa-check-circle"></i> Payment Method
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>
            <i className="far fa-times-circle"></i> Payment Method
          </Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step6 ? (
          <LinkContainer to="/placeorder">
            <Nav.Link>
              <i className="fas fa-check-circle"></i> Place Order
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>
            <i className="far fa-times-circle"></i> Place Order
          </Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
}

export default CheckoutSteps

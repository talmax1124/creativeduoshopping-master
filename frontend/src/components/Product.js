import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Card, Badge } from "react-bootstrap";
import Rating from "./Rating";
import Favorites from "./Favorites";

import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

const Product = ({ product }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [open, setOpen] = React.useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };


  return (
    <Card className="my-3 p-1 rounded cardsss">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant="top" className="imggg" />
      </Link>

      {userInfo && <Favorites product={product} />}

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="p">
          {product.countInStock > 0 ? (
            <Badge bg="success" variant="success">
              In Stock
            </Badge>
          ) : (
            <Badge bg="danger" variant="danger">
              Out Of Stock
            </Badge>
          )}
        </Card.Text>

        <Card.Text as="div">
          <Rating
            value={product.rating}
            text={
              product.numReviews > 1
                ? `${product.numReviews} review(s)`
                : `${product.numReviews} review`
            }
            // {`${product.numReviews} reviews`}
          />
        </Card.Text>

        {product.lastPrice > 0 && (
          <>
            <br />
            <Card.Text as="h5">Original Price: ${product.lastPrice}</Card.Text>
          </>
        )}

        {product.price > 0 && (
          <>
            <Card.Text as="h3">${product.price}</Card.Text>
          </>
        )}
        {product.specialPrice > 0 && (
          <>
            <Card.Text as="h3">
              {" "}
              Discounted Price: ${product.specialPrice}
            </Card.Text>
          </>
        )}

        <ClickAwayListener onClickAway={handleTooltipClose}>
            <div>
              <Tooltip
                PopperProps={{
                  disablePortal: true,
                }}
                onClose={handleTooltipClose}
                open={open}
                disableFocusListener
                disableHoverListener
                disableTouchListener
                title={product.brand}
              >
                <Button onClick={handleTooltipOpen}>Product Brand</Button>
              </Tooltip>
            </div>
          </ClickAwayListener>
       
      </Card.Body>
    </Card>
  );
};

export default Product;

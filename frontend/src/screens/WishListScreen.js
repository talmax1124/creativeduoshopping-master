import React, { useEffect, forwardRef } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Col, Image, ListGroup, Row } from 'react-bootstrap'
import Message from '../components/Message'
import Product from '../components/Product'
import { addToWishList, removeFromWishList } from '../actions/wishListActions'


const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id

  const qty = location.search ? Number(location.search.split('=')[1]) : 1
  const dispatch = useDispatch()


  const wishlistStore = useSelector((state) => state.productWishList)
  const { wishlist } = wishlistStore

  useEffect(() => {
    if (productId) {
      dispatch(addToWishList(productId, qty))
    }
  }, [dispatch, productId, qty])

  const removeFromWishListHandler = (id) => {
    dispatch(removeFromWishList(id))

  }

  const addToCartHandler = (productId) => {
    history.push(`/cart/${productId}?qty=${qty}`)
  }

  forwardRef((item, ref) => (
    <div ref={ref}>
      <Product
        key={item.cartId}
        id={item.id}
        title={item.name}
        image={item.image}
        price={item.price}
        {...item}
      />
    </div>
  ))

  return (
    <Row>
      <Col md={12}>
        <h1>Wishlist</h1>
        {wishlist.length === 0 ? (
          <Message>
            Your wishlist is empty! <Link to='/'>Go back</Link>
          </Message>
        ) : (
          <Row variant='flush'>

              {wishlist.map((item) => (
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={3} className='m-auto'>
                      {' '}
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={2} className='m-auto'>
                      $ {item.price}
                    </Col>
                    
                    <Col md={2} className='m-auto'>
                      <Button
                        onClick={(e) => addToCartHandler(item.product)}
                        className='btn-block'
                        type='button'
                        disabled={item.countInStock === 0}
                      >
                        Buy now
                      </Button>
                    </Col>
                    <Col md={1} className='m-auto'>
                      <Button
                        type='button'
                        variant='light'
                        onClick={() => removeFromWishListHandler(item.product)}
                      >
                        <i className='fas fa-trash' />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}

          </Row>
        )}
      </Col>
    </Row>
  )
}

export default CartScreen

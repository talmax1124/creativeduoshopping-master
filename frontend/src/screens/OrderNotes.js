import React, { useState } from 'react'
import { Form, Button} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveOrderNotesMethod } from '../actions/cartActions'

const OrderNotes = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  if (!shippingAddress.address) {
    history.push('/shipping')
  }

  const [orderNotes, setOrderNotes] = useState('')

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveOrderNotesMethod(orderNotes))
    history.push('/payment')
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Order Notes</h1>
      <h6 variant="danger">If this note is from your last order, just erase the message and write your new request/note</h6>
      <Form onSubmit={submitHandler}>
      <Form.Group controlId="orderNotes">
          <Form.Label>Order Notes? Requests?</Form.Label>
          <Form.Control
            type="text"
            as="textarea"
            placeholder="Enter your note"
            value={orderNotes}
            onChange={(e) => setOrderNotes(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default OrderNotes

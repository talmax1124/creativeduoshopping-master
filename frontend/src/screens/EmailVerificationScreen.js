import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import { register } from '../actions/userActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
const EmailVerificationScreen = ({ location, match, history }) => {
  const token = match.params.token
  const dispatch = useDispatch()
  const userRegister = useSelector((state) => state.userRegister)
  const { userInfo, loading, error } = userRegister
  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
    dispatch(register(token))
  }, [history, userInfo, redirect, token, dispatch])

  return (
    <Row>
      <Col md={2}></Col>
      <Col md={6}>
        <Message variant='primary'>Waiting for the confirmation....</Message>
        {loading && <Loader />}
        {error && <Message variant='danger'>{error}</Message>}
      </Col>
      <Col md={2}></Col>
    </Row>
  )
}

export default EmailVerificationScreen

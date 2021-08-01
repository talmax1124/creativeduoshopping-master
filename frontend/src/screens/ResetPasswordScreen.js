import React, { useState, useEffect } from 'react'
 import { Link } from 'react-router-dom'
 import { Form, Button } from 'react-bootstrap'
 import { useDispatch, useSelector } from 'react-redux'
 import FormContainer from '../components/FormContainer'
 import Message from '../components/Message'
 import Loader from '../components/Loader'
 import { resetPassword } from '../actions/userActions'

 const ResetPasswordScreen = ({ match, history }) => {
   const [password, setPassword] = useState('')
   const token = match.params.id

   const dispatch = useDispatch()

   const userPasswordReset = useSelector((state) => state.userPasswordReset)
   const { loading, success, message, error } = userPasswordReset

   useEffect(() => {
     if (success) {
       setTimeout(() => history.push('/login'), 10000)
     }
   }, [success, history])

   const submitHandler = (e) => {
     e.preventDefault()
     dispatch(resetPassword(password, token))
   }

   return (
     <FormContainer>
       <h1>Reset Password</h1>
       {error && <Message variant='danger'>{error}</Message>}
       {success && (
         <Message variant='success' dismissible={false}>
           {message}
         </Message>
       )}
       {loading && <Loader />}
       {!success ? (
         <Form onSubmit={submitHandler}>
           <Form.Group controlId='password'>
             <Form.Label>New Password</Form.Label>
             <Form.Control
               type='password'
               placeholder='Enter new password'
               value={password}
               onChange={(e) => setPassword(e.target.value)}
             ></Form.Control>
           </Form.Group>

           <Button type='submit' variant='primary'>
             Submit
           </Button>
         </Form>
       ) : (
         <p>
           You will be automatically redirected to the
           <Link to='/login'> Login</Link> page in 10 seconds
         </p>
       )}
     </FormContainer>
   )
 }

 export default ResetPasswordScreen
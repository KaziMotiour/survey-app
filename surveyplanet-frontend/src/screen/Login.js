import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

import {Form, Button, Row, Col, Alert, Spinner, Container} from 'react-bootstrap'


import {useHistory} from 'react-router-dom'
import Header from '../component/Header'


const Login = () => {
    const history = useHistory()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()
    const [error2, setError2] = useState(false)
    const userInfo = localStorage.getItem('userInfo')
    let cmMessage = null;
    if (history.location.state) {
        cmMessage = history.location.state.detail;
      }

// Redirect authorized user to home page 
    useEffect(()=>{
        if(userInfo){
            history.push('/')
        }
    },[history, userInfo])
    
    // Handle submit login form
    const submitHandler = async (e) =>{
        e.preventDefault()
        if(history.location.state){
        history.location.state.detail = null
    }
        try{
            setLoading(true)
              await axios.post('http://127.0.0.1:8000/api/token/', {email, password}).then(res =>{
                localStorage.setItem('userInfo', JSON.stringify(res.data))
               
                setLoading(false)
                goToHome()
                
                // dispatch(loggedInUserInfo(config))
      
              }).catch(function (error) {
                  // handle error
                  if (error.response) {
                      // The request was made and the server responded with a status code
                      // that falls out of the range of 2xx
                      // console.log(error.response.data.detail, 'res_data');
                      const errors = error.response.data.detail
                      setError(errors)
                    
                      setLoading(false)
                      // console.log(error);
                      // console.log(error.response.status, 'res_status');
                      // console.log(error.response.headers, 'res_haders');
                    } else if (error.request) {
                      // The request was made but no response was received
                      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                      // http.ClientRequest in node.js
                      setLoading(false)
                      setError2(true)
                      // console.log(error.request,'req');
                    } else {
                      // Something happened in setting up the request that triggered an Error
                      // console.log('Error', error.message,'msg');
                    }
                    // console.log(error.config);
                  })
          }catch(err){
              // console.log(err,'err');
          }
      

    }

    async function goToHome() {
        await new Promise((resolve) =>
          setTimeout(() => {
            if(userInfo){
              history.push({
                pathname: "/",
              });
            }
          }, 1000)
        );
      } 


      

  return (
        <div>
          <Header />
          <Container>
        <h1>Sing in</h1>
        {error && <Alert variant="danger">{error}</Alert>}
        {cmMessage && <Alert variant="primary">{cmMessage }</Alert>}

        
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control type='email' required placeholder='Enter your email' onChange={(e) => setEmail(e.target.value)}>

                </Form.Control>
            </Form.Group>

            <Form.Group controlId='password' style={{marginBottom:'10px'}}>
            <Form.Label>Password</Form.Label>
                <Form.Control type='password' required placeholder='Enter your password' onChange={(e) => setPassword(e.target.value)}>

                </Form.Control>
            </Form.Group>
            {error2 && <p style={{color:'red'}}>Surver is Not running</p>}
            {loading ? <Spinner animation="grow" /> : 
            <Button type="submit" varient="primary">
                Sing In
            </Button>
            }

        </Form>
        <Row className='py-3'>
            <Col>
                New Customer? <Link to='/registration'  >Register</Link>
            </Col>
        </Row>
        </Container>
        </div>  
  )
}

export default Login
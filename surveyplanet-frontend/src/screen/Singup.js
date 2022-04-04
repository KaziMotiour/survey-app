import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Form,
  Button,
  Row,
  Col,
  Spinner,
  Container,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Header from "../component/Header";
const RegisterScreen = () => {
  const history = useHistory();
 
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [error2, setError2] = useState(false);
  const userInfo = localStorage.getItem("userInfo");

  // Redirect authorized user to home page
  useEffect(() => {
    if (userInfo) {
      history.push("/");
    }
  }, [history, userInfo]);

  // Handle submit registration form
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(email, username, password, password2);
    try {
      setLoading(true);
      await axios
        .post(" http://127.0.0.1:8000/singup/", {
          email,
          username,
          password,
          password2,
        })
        .then((res) => {
          setLoading(false);
          goToLogin();
        })
        .catch(function (error) {
          // handle error
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data, "res");
            const errors = error.response.data;
            setError(errors);
            setLoading(false);
            console.log(error.response.status, "res");
            console.log(error.response.headers, "res");
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request, "req");
            setLoading(false);
            setError2(true);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message, "msg");
          }
          console.log(error.config);
        });
    } catch (err) {
      console.log(err);
    }
  };

  async function goToLogin() {
    await new Promise((resolve) =>
      setTimeout(() => {
        history.push({
          pathname: "/login",
          state: {
            detail:
              "You have successfully complete you'r registration.Try to login you'r account",
          },
        });
      }, 1000)
    );
  }

  return (
    <div>
      <Header />
      <Container>
        <h1>Sing in</h1>

        <Form onSubmit={submitHandler}>
          <Form.Group controlId='email' style={{ marginBottom: "10px" }}>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter your email'
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
            <span style={{ color: "red" }}>
              {error && error.email && error.email[0]}
            </span>
          </Form.Group>

          <Form.Group controlId='email' style={{ marginBottom: "10px" }}>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter your username'
              onChange={(e) => setUsername(e.target.value)}
            ></Form.Control>
            <span style={{ color: "red" }}>
              {error && error.username && error.username[0]}
            </span>
          </Form.Group>

          <Form.Group controlId='password' style={{ marginBottom: "10px" }}>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter your password'
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
            <span style={{ color: "red" }}>
              {error && error.password1 && error.password1[0]}
            </span>
          </Form.Group>
          <Form.Group controlId='password2' style={{ marginBottom: "10px" }}>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='confirm password'
              onChange={(e) => setPassword2(e.target.value)}
            ></Form.Control>
            <span style={{ color: "red" }}>
              {error && error.password2 && error.password2[0]}
            </span>
          </Form.Group>
          {error2 && <p style={{ color: "red" }}>Surver is Not running</p>}
          {loading ? (
            <Spinner animation='grow' />
          ) : (
            <Button type='submit' varient='primary'>
              Sing In
            </Button>
          )}
        </Form>
        <Row className='py-3'>
          <Col>
            Already have an account? <Link to='/login'>Login</Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RegisterScreen;

import logo from './logo.svg';
import './App.css';
import {Container, Row, Col, Form, InputGroup, FormControl} from 'react-bootstrap'
import CreateSurvey from './component/CreateSurvey'
import AttendSurvey from './component/AttendSurvey'
import Login from './component/Login'
import RegisterScreen from './component/Singup'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


function App() {
  return (
    <Router>
   
    <main className='py-3'>
      <Container>
      <Switch>

            <Route path='/registration' component={RegisterScreen} exect />
            <Route path='/login' component={Login} exect />
            <Route path='/create-survey' component={CreateSurvey} exect />
            <Route path='/attending-survey/:id' component={AttendSurvey} exect />

         
        </ Switch>
      </Container>
    </main>
 
  </Router>
  );
}

export default App;

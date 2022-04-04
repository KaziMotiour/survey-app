import logo from './logo.svg';
import './App.css';
import {Container, Row, Col, Form, InputGroup, FormControl} from 'react-bootstrap'
import CreateSurvey from './screen/CreateSurvey'
import AttendSurvey from './screen/AttendSurvey'
import Login from './screen/Login'
import RegisterScreen from './screen/Singup'
import SurveyListForAdmin from './component/SurveyListForAdmin'
import Header from './component/Header'
import RecordSuccessInfo from './screen/RecordSuccessInfo'
import RecordFailInfo from './screen/RecordFailInfo'
import SurveyList from './screen/SurveyList'
import SurveyReview from './screen/SurveyReview'
import UserReview from './screen/UserReview'
import {IsAdminRoute} from './PrivateRoute'

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


function App() {
  return (
    <Router>
   
    <main className='py-3'>
   
      <Switch>

              <IsAdminRoute path='/user-survey-review/:id' component={UserReview} exect />
            <IsAdminRoute path='/survey-review/:id' component={SurveyReview} exect />
            <Route path='/record-fail' component={RecordFailInfo} exect />
            <Route path='/record-success' component={RecordSuccessInfo} exect />
              
            <Route path='/registration' component={RegisterScreen} exect />
            <Route path='/login' component={Login} exect />
            <IsAdminRoute path='/create-survey' component={CreateSurvey} exect />
            <Route path='/attending-survey/:id' component={AttendSurvey} exect />
            <Route path='/' component={SurveyList} exect />

         
        </ Switch>
      
    </main>
 
  </Router>
  );
}

export default App;

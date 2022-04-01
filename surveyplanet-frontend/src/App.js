import logo from './logo.svg';
import './App.css';
import {Container, Row, Col, Form, InputGroup, FormControl} from 'react-bootstrap'
import CreateSurvey from './component/CreateSurvey'
import AttendSurvey from './component/AttendSurvey'

function App() {
  return (
    <div className="App">
     <AttendSurvey />
    </div>
  );
}

export default App;

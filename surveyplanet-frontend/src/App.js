import logo from './logo.svg';
import './App.css';
import {Container, Row, Col, Form, InputGroup, FormControl} from 'react-bootstrap'
import CreateSurvey from './component/CreateSurvey'

function App() {
  return (
    <div className="App">
     <CreateSurvey />
    </div>
  );
}

export default App;

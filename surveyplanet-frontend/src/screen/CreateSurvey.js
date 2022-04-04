import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  InputGroup,
  FormControl,
  Button,
} from "react-bootstrap";
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';
import Header from '../component/Header'


const CreateSurvey = () => {
  // question
  // setQuestion
  const history = useHistory()
  const userInfo = localStorage.getItem('userInfo')
 
  const [emptyField, setEpmtyField]=useState(false)
  const [surveyInfo, setSurveyInfo] = useState({
      title:"",
      timer:5,
      })
  const [question, setQuestion] = useState([
    { id:uuidv4(),  question_title: "", question_type: "text", options: [{ qts: "" }] },
  ]);
  
console.log(userInfo);
  useEffect(()=>{

    if(!userInfo){
      history.push('/login')
    }

  },[userInfo])


  const handleFormChange = (index, event) => {
    let data = [...question];
    data[index][event.target.name] = event.target.value;
    setQuestion(data);
  };

  const addFields = () => {
    let newfield = {id: uuidv4(), question_title: "", question_type: "text", options: [{ qts: "" }] };

    setQuestion([...question, newfield]);
  };

 
  const handleAddOption = (index) => {
    const lengthofOptions = question[0].options.length;
    let data = [...question];
    const qts = "qts";
    data[index].options = [...data[index].options, { qts: "" }];
    setQuestion(data);
  };

  const handleAddOptionInput = (index1, index2, event) => {
    let data = [...question];
    data[index1].options[index2][event.target.name] = event.target.value;
    setQuestion(data);
  };

  const handleRemoveQuestion = (index) => {
    let data = [...question];
    const remvoedItem = data[index];
    const newList = data.filter(
      (item) => item.id !== remvoedItem.id
    );
    setQuestion(newList);
  };

  const submit = async (e) => {
    e.preventDefault();
    const config = {
        headers: {
            "content-type": "application/json",
        },
      };
    if(surveyInfo.title &&  question[0].question_title && (question[0].question_type==='text' || (question[0].question_type==='radio' || question[0].question_type==='multiple') && question[0].options[0].qts)){
        setEpmtyField(false)
    try{
        const data  =  await axios.post('http://127.0.0.1:8000/survey/create/',{surveyInfo , question}, config)
        console.log(data.data);
        history.push('/')
    }catch (error){
        console.log(error);
    
    }

}else{
    console.log('undefiled');
    setEpmtyField(true)
}
  };
  console.log(surveyInfo);

  return (
    <div>    
      <Header />
      <Container>
      <h1 style={{marginBottom:'30px'}}>Create a new survey</h1>

      <Form>
          {emptyField && <h5 style={{color:'red', marginBottom:20}}>Please fill up the empty fields</h5>}
        <Form.Group as={Row} className='mb-2' controlId='formPlaintextEmail'>
          <Form.Label column sm='1'>
            Survey Title
          </Form.Label>
          <Col sm='10'>
            <Form.Control question_type='text' name="title" placeholder='Survey title' onChange={(e) => setSurveyInfo({...surveyInfo,[e.target.name]:e.target.value})} />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className='mb-5' controlId='formPlaintextPassword'>
          <Form.Label column sm='1'>
            Timer
          </Form.Label>
          <Col sm='10'>
            <Form.Control question_type='number' name="timer" value={surveyInfo.timer} placeholder='Survey timer' onChange={(e) => setSurveyInfo({...surveyInfo,[e.target.name]:e.target.value    })}/>
          </Col>
        </Form.Group>
      </Form>

      <h2 style={{borderBottom:'3px solid black', width:'140px', marginBottom:'30px'}}>Questions</h2>

      <Form onSubmit={submit}>
        {question &&
          question.map((input, index1) => {
            return (
              <div key={index1} style={{marginBottom:'150px'}} >
                  <div style={{}}>
                   <h4>Questions {index1+1}</h4>
                   {index1!=0 &&  
                   <Button  variant="danger" style={{float:'right', marginTop:'-50px'}} className="addMoreOption" onClick={(e) => handleRemoveQuestion(index1)}>
                      remove questions {index1+1}
                    </Button> }
                    </div> <br/>

                <Form.Group
                  as={Row}
                  className='mb-2'
                  controlId='formPlaintextEmail'
                >
                  <Form.Label column sm='2'>
                  Question Title
                  </Form.Label>
                  <Col sm='10'>
                    <Form.Control
                      name='question_title'
                      value={input.question_title}
                      question_type='text'
                      laceholder='Question Title'
                      onChange={(event) => handleFormChange(index1, event)}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  as={Row}
                  className='mb-2'
                  controlId='formPlaintextEmail'
                >
                  <Form.Label column sm='2'>
                   question_type
                  </Form.Label>
                  <Col sm='10'>
                    <Form.Select
                      size='sm'
                      name='question_type'
                      onChange={(event) => handleFormChange(index1, event)}
                    >
                      <option>text</option>
                      <option>radio</option>
                      <option value="multiple">multipe choice</option>
                    </Form.Select>
                  </Col>
                </Form.Group>

                {input.question_type === "text" ? (
                   <Form.Group as={Row} className='mb-2' controlId='formPlaintextEmail'>
                   <Form.Label column sm='2'>
                    Answer 
                   </Form.Label>
                   <Col sm='10'>
                     <Form.Control question_type='text' placeholder='This field is avaiable for user only' disabled  />
                   </Col>
                 </Form.Group>
                ) : (
                  <div className="mt-4">
                    {input.options &&
                      input.options.map((option, index2) => (
                        <>
                        <Form.Group as={Row} className='ml-5 mb-1 mt-1 ' controlId='formPlaintextEmail'>
          <Form.Label column sm='2'>
           Option {index2+1}
          </Form.Label>
          <Col sm='10'>
            <Form.Control name='qts' value={option.qts} question_type='text' placeholder='Add new question answer  '   onChange={(event) =>
                            handleAddOptionInput(index1, index2, event)
                          }/>
          </Col>
        </Form.Group>
        </> 
                      ))}
                    <Button style={{float:'right'}} className="addMoreOption" varient="primary" onClick={(e) => handleAddOption(index1)}>
                      Add More option
                    </Button>   
                  </div>
                )}

              </div>
            );
          })}

          
        <div  style={{marginTop:'100px'}}>
        <Button variant="outline-primary" style={{marginRight:'10px'}} onClick={addFields}>Add More question</Button>
        <Button variant="outline-success" onClick={submit}>Submit</Button>
        </div>
      </Form>
    </Container>
    </div>

  );
};

export default CreateSurvey;

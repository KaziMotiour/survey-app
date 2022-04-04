import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  InputGroup,
  FormControl,
  Button,
  Accordion,
} from "react-bootstrap";
import axios from 'axios'
import {useHistory, useParams} from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';
import Header from '../component/Header'
import  '../component/css/sureveyReview.css'


const SurveyReview = () => {
  // question
  // setQuestion
  const history = useHistory()
  const {id} = useParams()
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  const [question, setQuestion] = useState([
    { id:uuidv4(),  question_title: "", question_type: "radio", options: [{ qts: "" }] },
  ]);
  const [surveyDetails, setSurveyDetails] = useState()
console.log(userInfo);
  useEffect(()=>{

    if(!userInfo){
      history.push('/login')
    }

  },[userInfo])

 useEffect(()=>{
    getSurveyDetails(id)
 },[id])
 console.log(userInfo);
 const getSurveyDetails = async (id) =>{
    const config = {
        headers: {
            "content-type": "application/json",
            Authorization: "Bearer "+userInfo.access,
        },
      };    
     try{
         const sureveyDetail = await axios.get(`http://127.0.0.1:8000/survey/detail/${id}`, config)
         console.log(sureveyDetail.data);
         setSurveyDetails(sureveyDetail.data)
     }catch (error){
         console.log(error);
     }
 }
  
  return (
    <div>    
      <Header />
      <Container>
      <h1 style={{marginBottom:'30px'}}>Survey Review</h1>

      <Form>
        <Form.Group as={Row} className='mb-2' controlId='formPlaintextEmail'>
          <Form.Label column sm='1'>
            Survey Title
          </Form.Label>
          <Col sm='10'>
          <Form.Control style={{border:0}} question_type='text' muted   name="title" placeholder='Survey title' value={surveyDetails && surveyDetails.title} disabled />
         
          </Col>

        </Form.Group>

        <Form.Group as={Row} className='mb-5' controlId='formPlaintextPassword'>
          <Form.Label column sm='1'>
            Timer
          </Form.Label>
          <Col sm='10'>
          <Form.Control style={{border:0}} question_type='text' muted   name="title" placeholder='Survey title' value={surveyDetails && surveyDetails.timer} disabled />
          </Col>
        </Form.Group>
      </Form>

      <h2 style={{borderBottom:'3px solid black', width:'140px', marginBottom:'30px'}}>Questions</h2>

      <Form>
        {surveyDetails &&
          surveyDetails.survay_of_question.map((question, index1) => {
            return (
              <div key={index1} style={{marginBottom:'80px'}} >
                  <div style={{}}>
                   <h4>Questions {index1+1}</h4>
                    </div> <br/>

                <Form.Group
                  as={Row}
                  className='mb-2'
                  controlId='formPlaintextEmail'
                >
                  <Form.Label column sm='2'>
                  Question Title
                  </Form.Label>
                  <Col sm='8'>
                  <Form.Control style={{border:0}} question_type='text' muted   name="title" placeholder='Survey title' value={question.question_title} disabled />
                  </Col>
                </Form.Group>

              

                 {question.question_type === "text" ? (
                   <Form.Group as={Row} className='mb-2' controlId='formPlaintextEmail'>
                   <Form.Label column sm='2'>
                    Answer 
                   </Form.Label>
                   <Col sm='8'>
                   <Accordion  defaultActiveKey="1">
                        <Accordion.Item eventKey="0">
                          <Accordion.Header>You Got {question.text_answer} Answer</Accordion.Header>
                          {question.question_from && question.question_from.map((answer, index)=>(
                              <> 
                              <Accordion.Body>
                              <p >Answer {index+1} : <span style={{color:'#0c92ee'}}>{answer.text_answer}</span></p>
                          </Accordion.Body>
                      </>

                          ))}
                        </Accordion.Item>
                        </Accordion>
                   </Col>
                 </Form.Group>
                ) : (
                  <div className="mt-3">
            <>
                    {question.question.map((option, index) =>(
                        <Form.Group as={Row} className='ml-5 mb-1 mt-1 ' controlId='formPlaintextEmail'>
                          <Form.Label column sm='2'>
                             Option {index+1}
                          </Form.Label>
                          <Col sm='7'>
                            <Form.Control name='qts' question_type='text' placeholder='Add new question answer' value={option.option} disabled/>
                          </Col>
                          <Col sm='1'>
                            <Form.Control style={{backgroundColor:'#2995bc', color:'white'}} name='qts' question_type='text' placeholder='Add new question answer' value={option.vot_count+" vot"} disabled/>
                          </Col>
                        </Form.Group>
                        ))}
                        </> 
                    
                
                  </div>
                )} 

              </div>
            );
          })}

      </Form>
    </Container>
    </div>

  );
};

export default SurveyReview;

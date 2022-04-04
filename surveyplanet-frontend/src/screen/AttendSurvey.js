import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
Row,
Col,
Form,
InputGroup,
FormControl,
Button,
Modal,
} from "react-bootstrap";
import {useParams, useHistory} from 'react-router-dom'
import Header from '../component/Header'

const AttendSurvey = () => {
  // localStorage.removeItem('userInfo')
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  
  const history = useHistory()  
  const [surveyQuestion, setSurveyQuestion] = useState();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [seconds, setseconds] = useState(59);
  const [minutes, setMinutes] = useState(0);
  const [questionAnser, setQuestionAnser] = useState([]);
  const [recordSubmited, setRecordSubmited] = useState(false)
  const lenghtOfQuestion =
    surveyQuestion &&
    surveyQuestion.survay_of_question &&
    surveyQuestion.survay_of_question.length;
  const {id} = useParams()
  var timer;

  useEffect(()=>{

    if(!userInfo){
      history.push('/login')
    }

  },[userInfo])

  useEffect(() => {
    timer = setInterval(() => {
      setseconds(seconds - 1);
      if (seconds === 0) {
        setMinutes(minutes - 1);
        setseconds(59);
      }
    }, 1000);

    if (minutes === 0 && seconds == 0) {
      submitSurvey();
    }

    return () => clearInterval(timer);
  });

  const submitSurvey = async () => {
    clearInterval(timer);
    const config = {
        headers: {
            "content-type": "application/json",
            Authorization: "Bearer "+userInfo.access,
        },
      };

    try{
    const datas = await axios.post(" http://127.0.0.1:8000/user/survey/record/",{surveyQuestion}, config);
    const {data} = datas
    

  if(data=='success'){
    
      history.push({
        pathname: "/record-success",
        state: {
          detail: surveyQuestion && surveyQuestion.title && surveyQuestion.title,
        },
      });
    }
    
  }catch(error){
    console.log(error);
    history.push({
      pathname: "/record-fail",
      state: {
        detail: surveyQuestion && surveyQuestion.title && surveyQuestion.title,
      },
    });

  }
}
  const nextQuestion = () => {
    setQuestionIndex(questionIndex + 1);
  };
  const previousQuestion = () => {
    setQuestionIndex(questionIndex - 1);
  };

  useEffect( () => {
    getSurveyQuestis()
  }, []);

  const getSurveyQuestis = async () =>{
    try {
      const config = {
        headers: {
            "content-type": "application/json",
            Authorization: "Bearer "+userInfo.access,
        },
      };
      const data = await axios.get(`http://127.0.0.1:8000/survey/detail/${id}`, config);
      const survayQ = data.data;
      console.log(survayQ);
      if(survayQ.is_complete===true){
        history.push('/')
      }
      const finalSurveyQ = {
        ...survayQ,
        survay_of_question: survayQ.survay_of_question.map((data) => ({
          ...data,
          answer: "",
          question:
            data.question.length < 1
              ? data.question
              : data.question.map((quesions) => ({
                  ...quesions,
                  is_checked: false,
                })),
        })),
      };
      setMinutes(finalSurveyQ.timer - 1);
      setSurveyQuestion(finalSurveyQ);
    } catch (error) {
      console.log(error);
    }
  }

  // question:data.question.length<1 ?data.question : data.question.map(quesions=>({
  //     ...quesions,
  //     is_checked:false
  // }))

  const checkItem = (questionIndexs, index, type) => {
    console.log(questionIndexs, index, type);
    const data = surveyQuestion;

    if (type === "radio") {
      const newData = {
        ...data,
        survay_of_question: data.survay_of_question.map((data, index) => {
          if ((data.question_type === "radio") & (index === questionIndexs)) {
            console.log("commed");
            return {
              ...data,
              question: data.question.map((option, index) => ({
                ...option,
                is_checked: false,
              })),
            };
          } else {
            return {
              ...data,
            };
          }
        }),
      };

      newData.survay_of_question[questionIndexs].question[index] = {
        ...newData.survay_of_question[questionIndexs].question[index],
        is_checked: true,
      };
      setSurveyQuestion(newData);
    } else {
      if (data.survay_of_question[questionIndexs].question[index].is_checked) {
        data.survay_of_question[questionIndexs].question[index] = {
          ...data.survay_of_question[questionIndexs].question[index],
          is_checked: false,
        };
      } else {
        data.survay_of_question[questionIndexs].question[index] = {
          ...data.survay_of_question[questionIndexs].question[index],
          is_checked: true,
        };
      }
    }
  };

  const handleTextInput = (questionIndex, e) => {
    const exist = questionAnser.filter((item) => item.id === questionIndex);
    console.log(exist, "log");
    let newArray = [...questionAnser];
    if (exist.length !== 0) {
      console.log("exist");
      const newItems = newArray.map((item) => {
        if (questionIndex === item.id) {
          return { ...item, answer: e.target.value };
        }
        return item;
      });
      setQuestionAnser(newItems);
    } else {
      console.log("not exist");
      setQuestionAnser([
        ...questionAnser,
        { id: questionIndex, answer: e.target.value },
      ]);
    }

    const updateData = surveyQuestion;
    updateData.survay_of_question[questionIndex] = {
      ...surveyQuestion.survay_of_question[questionIndex],
      answer: e.target.value,
    };

    setSurveyQuestion(updateData);
    console.log(questionAnser);
  };

  const returnText = (questionIndex) => {
    const exist = questionAnser.filter((item) => item.id === questionIndex);
    if (exist.length !== 0) {
      return exist[0].answer;
    } else {
      return "";
    }
  };

  console.log(surveyQuestion);
  return (
    <div>
      <Header />
    <Container>
      <div >
       <h3>Survey Title: {surveyQuestion && surveyQuestion.title && surveyQuestion.title}<span></span></h3> 
       <h3>Time Duration: {surveyQuestion && surveyQuestion.timer &&  surveyQuestion.timer}<span></span></h3> 
       
        <p style={{fontSize:'20px'}}>
          Time Left: {minutes}:{seconds}
        </p>
        <p style={{fontSize:'20px'}}>
          Question {questionIndex+1} Out of {lenghtOfQuestion}
        </p>
        {recordSubmited && <p style={{color:'red'}}> You have not answerd any quesion, Please answer the question first then submit the survey.  </p>}
      </div>

      <Modal.Dialog>
          
        <Modal.Header>
          <Modal.Title>
            {surveyQuestion &&
              surveyQuestion.survay_of_question.length>0 &&
              surveyQuestion.survay_of_question[questionIndex].question_title ? surveyQuestion.survay_of_question[questionIndex].question_title:""    }
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {surveyQuestion &&
          surveyQuestion.survay_of_question.length>0   &&
          surveyQuestion.survay_of_question[questionIndex].question_type ===
            "text" ? (
            <Form>
              <Form.Group
                as={Row}
                className='mb-5'
                controlId='formPlaintextPassword'
              >
                <Form.Label column sm='2'>
                  answer
                </Form.Label>
                <Col sm='10' className='ml-2'>
                  <input
                    type='text'
                    name='answer'
                    placeholder='Answer'
                    value={returnText(questionIndex)}
                    onChange={(e) => {
                      handleTextInput(questionIndex, e);
                    }}
                  />
                </Col>
              </Form.Group>
            </Form>
          ) : surveyQuestion &&
            surveyQuestion.survay_of_question.length>0 &&
            surveyQuestion.survay_of_question[questionIndex].question_type ===
              "radio" ? (
            <Form>
              <Form.Group className='mb-3' controlId='formBasicCheckbox'>
                {surveyQuestion &&
                  surveyQuestion.survay_of_question.length>0 &&
                  surveyQuestion.survay_of_question[questionIndex].question.map(
                    (question, index) => (
                      <Form.Check
                        key={index}
                        label={question.option}
                        name='group1'
                        type='radio'
                        onClick={(e) =>
                          checkItem(questionIndex, index, "radio")
                        }
                        checked={question.is_checked ? true : false}
                      />
                    )
                  )}
              </Form.Group>
            </Form>
          ) : (
            <Form>
              <Form.Group className='mb-3' controlId='formBasicCheckbox'>
                {surveyQuestion &&
                  surveyQuestion.survay_of_question.length>0   &&
                  surveyQuestion.survay_of_question[questionIndex].question &&
                  surveyQuestion.survay_of_question[questionIndex].question.map(
                    (question, index) => (
                      <div key={index}>
                       
                          <Form.Check
                            label={question.option}
                            name='group1'
                            type='checkbox'
                            checked={question.is_checked ?true : false}
                            onClick={(e) =>
                              checkItem(questionIndex, index, "checkbox")
                            }
                          />
                      
                         
                      </div>
                    )
                  )}
              </Form.Group>
            </Form>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={() => history.push('/')} style={{ marginRight: "auto" }} variant='secondary'>
            quit survey
          </Button>
          {questionIndex == lenghtOfQuestion - 1 && (
            <Button
            onClick={submitSurvey}
              style={{ marginRight: "auto", marginLeft: "-120px" }}
              variant='danger'
            >
              Submit
            </Button>
          )}

          {questionIndex === 0  ? lenghtOfQuestion >1     && (
            <Button onClick={nextQuestion} variant='success'>
              Next Question
            </Button>
          ) : questionIndex === lenghtOfQuestion - 1 ? (
            <>
              <Button onClick={previousQuestion} variant='primary'>
                Prvious Question
              </Button>
            </>
          ) : (
            <>
              <Button onClick={previousQuestion} variant='primary'>
                Prvious Question
              </Button>
              <Button onClick={nextQuestion} variant='success'>
                Next Question
              </Button>
            </>
          )}
        </Modal.Footer>
      </Modal.Dialog>
    </Container>
    </div>
  );
};

export default AttendSurvey;

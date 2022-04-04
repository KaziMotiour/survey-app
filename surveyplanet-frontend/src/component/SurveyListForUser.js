import React, { useState, useEffect } from "react";
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
import "./css/surveyUser.css";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa";

const SurveyListForUser = () => {
  //    localStorage.removeItem('userInfo')
  const history = useHistory();
  const [surveyList, setSurveyList] = useState();
  const userinfo = JSON.parse(localStorage.getItem("userInfo"));
  const user = userinfo ? userinfo : null;
  console.log(user);
  useEffect(() => {
    if (!userinfo) {
      history.push("/login");
    }
  }, []);

  useEffect(() => {
    const config = {
      headers: {
        "content-type": "application/json",

        Authorization: user ? "Bearer " + user.access : "Bearer ",
      },
    };

    getSurveyList(config);
  }, []);

  const getSurveyList = async (config) => {
    const data = await axios.get(" http://127.0.0.1:8000/survey/list", config);
    setSurveyList(data.data);
  };

  const attendingSurvey = (id) => {
    history.push("/attending-survey/" + id);
  };

  return (
    <Container>
      <Row className='title_row'>
        <Col className='title' md={8}>
          <h2>Survey List</h2>{" "}
        </Col>
      </Row>
      {surveyList &&
        surveyList.map((survey, index) => {
          return survey.is_complete ? (
            <Row key={index} className='survey-Row'>
              <Col className='col1' md={8}>
                {survey.title}
              </Col>
              <Col md={3} className='col2' style={{ color: "red" }}>
                {" "}
                <Button style={{ float:'right' }}    variant='outline-primary'>
                  Attended <FaCheck />{" "}
                </Button>
              </Col>
            </Row>
          ) : (
            <Row key={index} className='survey-Row'>
              <Col
                onClick={(e) => attendingSurvey(survey.id)}
                className='col1'
                md={8}
              >
                {survey.title}
              </Col>
              <Col
                onClick={(e) => attendingSurvey(survey.id)}
                className='col2'
                md={3}
                style={{ color: "blue" }}
                
              >
                <Button   style={{ float:'right' }} variant='outline-primary'>Attend To Survey</Button>
              </Col>
            </Row>
          );
        })}
    </Container>
  );
};

export default SurveyListForUser;

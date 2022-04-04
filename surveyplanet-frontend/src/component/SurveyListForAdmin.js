import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import "./css/surveyAdmin.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

const SurveyListForAdmin = () => {
  // localStorage.removeItem('userInfo')
  const history = useHistory();
  const [surveyList, setSurveyList] = useState();
  const userinfo = JSON.parse(localStorage.getItem("userInfo"));

  // Redirect unauthorized user to login form
  useEffect(() => {
    if (!userinfo) {
      history.push("/login");
    }
  }, []);

  useEffect(() => {
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + userinfo.access,
      },
    };

    getSurveyList(config);
  }, []);

  // Get survey list for admin
  const getSurveyList = async (config) => {
    try {
      const data = await axios.get(
        " http://127.0.0.1:8000/survey/list",
        config
      );
      setSurveyList(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Redirect survey Review page
  const getSurveyReview = (id) => {
    history.push("/survey-review/" + id);
  };

  // Redirect user survey record page
  const getUserReview = (id) => {
    history.push("/user-survey-review/" + id);
  };

  return (
    <Container>
      <Row className='title_row' style={{ marginTop: 20 }}>
        <Col className='title' md={8}>
          <h2>Survey List</h2>{" "}
        </Col>
        <Col className='button'>
          <Link to='/create-survey'>
            <Button variant='primary'>Create New Survey</Button>
          </Link>{" "}
        </Col>
      </Row>

      {surveyList &&
        surveyList.map((survey, index) => (
          <Row key={index} className='survey-admin-Row'>
            <Col
              className='col1-admin'
              onClick={(e) => getSurveyReview(survey.id)}
              md={8}

            >
              <h6>{survey.title}</h6>{" "}
              <p style={{ color: "gray", fontSize: "13px" }}>
                (click here to see the survey review)
              </p>
            </Col>
            {survey.participants > 0 ? (
              <Col
                className='col22-admin'
                style={{ color: "blue" }}
                onClick={(e) => getUserReview(survey.id)}
              >
                {" "}
                {survey.participants} user completed this survey{" "}
                <p style={{ color: "gray", fontSize: "13px" }}>
                  (click here to see the users review)
                </p>{" "}
              </Col>
            ) : (
              <Col className='col2-admin' style={{ color: "gray" }}>
                {" "}
                {survey.participants} user completed this survey{" "}
              </Col>
            )}
          </Row>
        ))}
    </Container>
  );
};

export default SurveyListForAdmin;

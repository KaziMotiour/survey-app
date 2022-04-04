import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,

  Accordion,
} from "react-bootstrap";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import Header from "../component/Header";
import "../component/css/sureveyReview.css";

const UserReview = () => {
  const history = useHistory();
  const { id } = useParams();
  const [surveyTitle, setSurveyTitle] = useState("");
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const [userSurveyReview, setUserSurveyReview] = useState();

  // Redirect unauthorized user to login form
  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [userInfo]);

  // Get User Survey record
  useEffect(() => {
    getUserSurveyReview(id);
  }, [id]);

  const getUserSurveyReview = async (id) => {
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + userInfo.access,
      },
    };
    try {
      const sureveyReview = await axios.get(
        ` http://127.0.0.1:8000/user/survey/participated-user/${id}`,
        config
      );

      setSurveyTitle(sureveyReview.data[0].survey_info.title);
      setUserSurveyReview(sureveyReview.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Header />
      <Container>
        <h1 style={{ marginBottom: "30px" }}>User Survey Review</h1>

        <Form>
          <Form.Group as={Row} className='mb-2' controlId='formPlaintextEmail'>
            <Form.Label column sm='1'>
              Survey Title
            </Form.Label>
            <Col sm='10'>
              <Form.Control
                style={{ border: 0 }}
                question_type='text'
                muted
                name='title'
                placeholder='Survey title'
                value={surveyTitle && surveyTitle}
                disabled
              />
            </Col>
          </Form.Group>
        </Form>

        <h2
          style={{
            borderBottom: "3px solid black",
            width: "140px",
            marginBottom: "30px",
          }}
        >
          Reviwes
        </h2>

        <Form>
          {userSurveyReview &&
            userSurveyReview.map((review, index) => (
              <>
                <Accordion defaultActiveKey='1' className='mb-3'>
                  <Accordion.Item eventKey='0'>
                    <Accordion.Header>
                      <p>User : {review.user.username}</p>
                    </Accordion.Header>
                    <Accordion.Body>
                      {review.survey_from.map((question, index) => {
                        return (
                          <div className='mb-5'>
                            <div>
                              <h6>Questions {index + 1}</h6>
                            </div>
                            <Form.Group
                              as={Row}
                              className='mb-2'
                              controlId='formPlaintextEmail'
                            >
                              <Form.Label column sm='2'>
                                Question Title
                              </Form.Label>
                              <Col sm='8'>
                                <Form.Control
                                  style={{ border: 0 }}
                                  question_type='text'
                                  muted
                                  name='title'
                                  placeholder='Survey title'
                                  value={question.question_from.question_title}
                                  disabled
                                />
                              </Col>
                            </Form.Group>

                            {question.question_type === "text" ? (
                              <Form.Group
                                as={Row}
                                className='mb-2'
                                controlId='formPlaintextEmail'
                              >
                                <Form.Label column sm='2'>
                                  Given Answer
                                </Form.Label>
                                <Col sm='8'>
                                  <Form.Control
                                    style={{ border: 0 }}
                                    question_type='text'
                                    muted
                                    name='title'
                                    placeholder='Survey title'
                                    value={question.text_answer}
                                    disabled
                                  />
                                </Col>
                              </Form.Group>
                            ) : (
                              <div className='mt-0'>
                                <>
                                  {question.option_answer.map(
                                    (option, index) => (
                                      <Form.Group
                                        as={Row}
                                        className='ml-5 mb-1 mt-1 '
                                        controlId='formPlaintextEmail'
                                      >
                                        <Form.Label column sm='2'>
                                          selected Option {index + 1}
                                        </Form.Label>
                                        <Col sm='7'>
                                          <Form.Control
                                            name='qts'
                                            question_type='text'
                                            placeholder='Add new question answer'
                                            value={option.option}
                                            disabled
                                          />
                                        </Col>
                                      </Form.Group>
                                    )
                                  )}
                                </>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </>
            ))}
        </Form>
      </Container>
    </div>
  );
};

export default UserReview;

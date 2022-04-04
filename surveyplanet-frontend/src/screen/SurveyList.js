import React, { useEffect } from "react";
import SurveyListForAdmin from "../component/SurveyListForAdmin";
import SurveyListForUser from "../component/SurveyListForUser";
import Header from "../component/Header";
import { Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const SurveyList = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const history = useHistory();

  // Redirect unauthorized user to login form
  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, []);

  return (
    <div style={{ backgroundColor: "#f3f7f7", minHeight: "1000px" }}>
      <Header />
      <Container>
        {userInfo && userInfo.is_superuser ? (
          <SurveyListForAdmin />
        ) : (
          <SurveyListForUser />
        )}
      </Container>
    </div>
  );
};

export default SurveyList;

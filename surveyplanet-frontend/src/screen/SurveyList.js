import React from 'react'
import SurveyListForAdmin from '../component/SurveyListForAdmin'
import SurveyListForUser from '../component/SurveyListForUser'
import Header from '../component/Header'
import { Container } from 'react-bootstrap'

const SurveyList = () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  return (

    
    <div style={{backgroundColor:"#f3f7f7", minHeight:'1000px' }}>
        <Header />
        <Container>       
        {userInfo.is_superuser ? <SurveyListForAdmin /> : <SurveyListForUser />} 
        </Container>
        
    </div>
  )
}

export default SurveyList
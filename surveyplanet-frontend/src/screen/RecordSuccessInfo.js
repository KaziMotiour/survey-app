import React from 'react'
import { Container } from 'react-bootstrap'
import {useHistory, useLocation, Link} from 'react-router-dom'
import Header from '../component/Header'


const RecordSuccessInfo = () => {
    const history = useHistory()
    let cmMessage = ""
    if (history.location.state) {
        cmMessage = history.location.state.detail;
      }

  return (
      <div>
          <Header />
          <Container>
    <div style={{textAlign:'center', marginTop:"100px"}}>
        
        <h1>congratulations</h1>
        <h3>You Have successfully complete the survey of {cmMessage}</h3>
        <h6>You can attend more survey from <span style={{color:'blue'}}><Link to='/'>survey list</Link></span></h6>
        
        </div>
        </Container>
    </div>
  )
}

export default RecordSuccessInfo
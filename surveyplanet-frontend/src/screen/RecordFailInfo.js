import React from 'react'
import { Container } from 'react-bootstrap'
import {useHistory, useLocation, Link} from 'react-router-dom'
import Header from '../component/Header'

const RecordFailInfo = () => {
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
        
        <h1>VERY BAD</h1>
        <h3>You have not submit any answer from the survey of {cmMessage}</h3>
        <h6 >You can attend the surevy again from <span style={{color:'blue'}}><Link to='/'>survey list</Link></span></h6>
        
        </div>
        </Container>
        </div>
  )
}

export default RecordFailInfo
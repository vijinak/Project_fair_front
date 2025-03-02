import React, { useEffect, useState } from 'react'
// import Myproject from '../components/MyProject'
import MyProject from '../components/MyProject'
import Profile from '../components/Profile'
import Header from '../components/Header'
import { Col, Row } from 'react-bootstrap'

function Dashboard() {
 const [user ,setUser] =useState("")

  useEffect(()=>{
    if(sessionStorage.getItem("existingUser")){
      setUser(JSON.parse(sessionStorage.getItem("existingUser")).username);
    }
  },[])

  return (
    <>
    <Header dash={true}/>
   
      <h3 className='mt-5 ms-3'>Welcome <span className='text-warning'>{user}</span></h3>

    <Row className='mt-5 container-fluid '>
      <Col sm={12} md={8} className='ps-5 pe-5 pt-3'>
      <MyProject/>
      </Col>

      <Col sm={12} md={4} className='ps-5 '>
      <Profile/>
     </Col>

    </Row>

     
      

   
    </>
  )
}

export default Dashboard
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'


function PageNotFound() {
  return (
    <>
    
    <div style={{height:'70vh',width:'100%'}} className='d-flex justify-content-center align-items-center flex-column'>
        {/* <h1 className='text-success' style={{fontSize:"50px" , fontWeight:'800'}}>404</h1> */}
        <img src="https://www.scopycode.com/includes/images/blog/error_404.gif" alt="no image" width={'25%'}  />
        <h1 className='mt-3'>look's like an Error </h1>
        <button className='btn btn-success mt-3'><FontAwesomeIcon icon={faArrowLeft} />Back to Home</button>

    </div>
    
    
    </>
  )
}

export default PageNotFound
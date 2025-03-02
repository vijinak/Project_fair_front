import { faStackOverflow } from '@fortawesome/free-brands-svg-icons';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';



function Header({dash}) {
  const navigate = useNavigate()
  const handleLogOut=()=>{
    sessionStorage.removeItem('existingUser')
    sessionStorage.removeItem('token')
    navigate('/')
  }
  return (
    <>
    <Navbar className="bg-success">
        <Container>
          <Link to={'/'} style={{textDecoration:'none'}}>
          <Navbar.Brand className='text-light fs-4'>
          <FontAwesomeIcon icon={faStackOverflow} className='me-3 fa-2x' />
            Project Fair
          </Navbar.Brand>
          </Link>
          {dash &&<button className='btn btn-warning ' onClick={handleLogOut}><FontAwesomeIcon icon={faPowerOff} className='me-2'/>Logout</button>}
        </Container>
      </Navbar>
    
    </>
  )
}

export default Header
import React from 'react'
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { serverUrl } from '../service/serverUrl';



function ProjectCard({projects}) {
  console.log(projects);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
   
      
      <Card style={{ width: '100%' }} className='shadow mt-4 border-0 rounded-0'onClick={handleShow}>
      <Card.Img variant="top" src={`${serverUrl}/uploads/${projects.projImage}`} width={'100%'} height={'250px'}/>
      <Card.Body>
        <Card.Title className='text-center'>{projects?.title}</Card.Title>
      </Card.Body>
    </Card>

    

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{projects?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col sm={12} md={6}>
            <img src="https://img.freepik.com/free-vector/project-management-business-multitasking-concept-flat-line-art-icons_126523-2192.jpg"  alt="" width={'100%'} />
            </Col>
            <Col sm={12} md={6}>
            <h4>Discription:</h4>
            <p>{projects?.overview}</p>
            <h4 className='mt-3'>Technologies:</h4>
            <p>{projects?.language}</p>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer className='d-flex justify-content-start'>
          <Link to={projects?.github} target='-blank'><FontAwesomeIcon icon={faGithub} className='fa-2x' /></Link>
          <Link to={projects?.website}  target='-blank'><FontAwesomeIcon icon={faLink} className='fa-2x' /></Link>
        </Modal.Footer>
      </Modal>
    
    </>
  )
}

export default ProjectCard
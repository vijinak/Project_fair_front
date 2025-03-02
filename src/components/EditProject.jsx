import React, { useContext,useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { serverUrl } from '../service/serverUrl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { editProjectApi } from '../service/allApi';
import {editResponseContext  } from '../context/DataShare';



function EditProject({project}) {
  const [show, setShow] = useState(false);
  const [projectDetails , setProjectDetails] =useState({
    id:project._id,
    title:project.title,
    language:project.language,
    github:project.github,
    website:project.website,
    overview:project.overview,
    projImage:""
  })
  const [preview ,setpreview] = useState("")  //store url
  const[key , setKey]= useState(0)
  const {setEditResponse} =useContext(editResponseContext) //add automatically

  

  const handleClose = () => {setShow(false);
  handleClose1()
  }
  const handleShow = () => setShow(true);

  console.log(projectDetails);

  //for fetch image from file to the edit component
  const handleFileUpload=(e)=>{
    e.preventDefault()
    setProjectDetails({...projectDetails,projImage:e.target.files[0]  })
  }

  useEffect(()=>{
    if(projectDetails.projImage){
      //createobjectURL- Method is used to convert files into urls 
      setpreview(URL.createObjectURL(projectDetails.projImage));
    }
  },[projectDetails.projImage]) 

   const handleClose1=()=>{
    setProjectDetails({
      title:project?.title,
    language:project?.language,
    github:project?.github,
    website:project?.website,
    overview:project?.overview,
    projImage:""
    })
    setpreview("")
    if(key==0){
      setKey(1)
    }
    else{
      setKey(0)
    }
   }


   const handleUpdate= async(e)=>{
    e.preventDefault()

    const {id,title,language,github,website,overview}=projectDetails
    if(!title || !language || !github || !website || !overview ){
      toast.info('please fill the form completely')
    }
    else{
      //  api
      // inorder to send uploaded content - use FormData
      const reqBody = new FormData()

      reqBody.append("title",title)
      reqBody.append("language",language)
      reqBody.append("github",github)
      reqBody.append("website",website)
      reqBody.append("overview",overview)
      preview?reqBody.append("projImage",projImage):reqBody.append("projImage",project.projImage)

      const token = sessionStorage.getItem("token")

      if(preview){  //if there is new image upload
        const reqHeader ={
          "Content-Type":"multipart/form-data",
          "Authorization" :`Bearer ${token}`
         }

        const result = await editProjectApi(id,reqBody,reqHeader)
        console.log(result);
        if(result.status==200){
          toast.success('project updated successfully')
          handleClose()
          setEditResponse(result.data)
        }
        else{
          toast.error('something went wrong')
        }

      }

      else{  //no new image uploaded
        const reqHeader = {
          "Content-Type":"application/json",
          "Authorization" :`Bearer ${token}`
        }
        const result = await editProjectApi(id,reqBody,reqHeader)
        console.log(result);
        if(result.status==200){
          toast.success('project updated successfully')
          handleClose()
         setEditResponse(result.data)
        }
        else{
          toast.error('something went wrong')
        }
      }

      
    }
   }



  return (
    <>
    
   
   <FontAwesomeIcon icon={faPenToSquare} onClick={handleShow} className='text-info' />
   

   <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title className='text-success'>Edit Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <Row>
          <Col sm={12} md={6}>
          <label htmlFor="projImg">
            <input id="projImg" type="file" style={{display:'none'}} key={key}  onChange={(e)=>handleFileUpload(e)} />
            <img src={preview?preview:`${serverUrl}/uploads/${project?.projImage}`} alt="no image" width={'100%'} />
          </label>
          </Col>
          <Col sm={12} md={6}>
          <form  className='p-3 '>
            <div className='mb-3'>
              <input type="text" placeholder='Title' className='form-control rounded-0' value={projectDetails?.title} onChange={(e)=>setProjectDetails({...projectDetails,title:e.target.value})} />
            </div>
            <div className='mb-3'>
              <input type="text" placeholder='Language' className='form-control rounded-0' value={projectDetails?.language}  onChange={(e)=>setProjectDetails({...projectDetails,language:e.target.value})} />
            </div>
            <div className='mb-3'>
              <input type="text" placeholder='Github' className='form-control rounded-0' value={projectDetails?.github}  onChange={(e)=>setProjectDetails({...projectDetails,github:e.target.value})}/>
            </div>
            <div className='mb-3'>
              <input type="text" placeholder='Website' className='form-control rounded-0' value={projectDetails?.website}  onChange={(e)=>setProjectDetails({...projectDetails,website:e.target.value})} />
            </div>
            <div className='mb-3'>
              <textarea placeholder='Overview' className='form-control rounded-0' rows={'4'} value={projectDetails?.overview}  onChange={(e)=>setProjectDetails({...projectDetails,overview:e.target.value})}></textarea> 
            </div>

          </form>
          
          </Col>
         </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleClose1}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleUpdate}>
            Update
          </Button>
        </Modal.Footer>
        
      </Modal>
      <ToastContainer theme='colored' position='top-center' autoClose = '2000' />
      
    </>
  )
}

export default EditProject
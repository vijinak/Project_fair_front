import React, { useContext, useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import AddProject from './AddProject';
import EditProject from './EditProject';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { deleteProjectApi, userProjectApi } from '../service/allApi';
import { addResponseContext, editResponseContext } from '../context/DataShare';
import { Link } from 'react-router-dom';



function MyProject() {
  const [userProject, setUserProject]=useState([])
  const {addResponse} = useContext(addResponseContext)
  const [deleteStatus , setDeleteStatus] = useState(false)
  const {editResponse} = useContext(editResponseContext) //add automatically (data from datashare component)


  const getUserProject = async()=>{
    if(sessionStorage.getItem("token")){
      const token = sessionStorage.getItem("token")
      const reqHeader = {
        "Content-Type":"application/json",
        "Authorization" :`Bearer ${token}`
     }
     const result = await userProjectApi(reqHeader)
     setUserProject(result.data);
     
    }

  }
  console.log(userProject);

  //deletefunction
  const  handleDelete = async(id)=>{
    const result = await deleteProjectApi(id)
    console.log(result);
    if(result.status==200){
      setDeleteStatus(true)
    }
  }

  useEffect(()=>{
    getUserProject()
    setDeleteStatus(false)
  },[addResponse,deleteStatus,editResponse])


  return (
    <>
    <div className='shadow  p-3 rounded '>
     <div className='d-flex justify-content-between'> 
      <h4 className='text-success '>My Project</h4>
      <AddProject/>
     </div>

    
    {userProject?.length>0?
    userProject?.map((item)=>(
      <div className='mt-4 bg-light p-3 rounded  d-flex justify-content-between'>
      <h5>{item.title} </h5>

      <div className='d-flex align-items-center'>
        <EditProject project={item} />
        <Link to={item?.website} target='_blank'><FontAwesomeIcon icon={faGlobe} className='text-warning ms-3'/></Link>
        <Link to={item?.github} target='_blank'><FontAwesomeIcon icon={faGithub}  className='text-success ms-3'/></Link> 
        <FontAwesomeIcon icon={faTrashCan} className='text-danger ms-3' onClick={()=>handleDelete(item?._id)}/>

      </div>
     </div>
     ))
     :
     <p> No Project To Display</p>
     }
    </div>
      
    
    </>
  )
}

export default MyProject
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import ProjectCard from '../components/ProjectCard'
import { Link } from 'react-router-dom'
import { allProjectApi } from '../service/allApi'


function Project() {

  const [token , setToken] = useState("")
  const [allProject , setAllProject]= useState([])
  const [searchKey , setSearchKey] =useState("")


  const getAllProject = async()=>{
    if(sessionStorage.getItem("token")){
      const token =sessionStorage.getItem("token")
    const reqHeader = {
       "Content-Type":"application/json",
         "Authorization" :`Bearer ${token}`
    }
    const result = await allProjectApi ( searchKey,reqHeader)
    if(result.status==200){
      setAllProject(result.data);
    }
  }
  }
  console.log(allProject);

   
  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setToken(sessionStorage.getItem("token"))
    }
   
  },[])

  useEffect(()=>{
    getAllProject()
  },[searchKey])

  console.log(searchKey);

  return (
    <>
    <Header/>

    <h1 className='text-center mt-5'>Projects</h1>

   { token?<div> 

    <div className="row w-100 mt-5">
      <div className="col-md-4"></div>
      <div className="col-md-4 d-flex">
        <input type="text" placeholder='Technologies' onChange={(e)=>setSearchKey(e.target.value)} className='form-control' />
        <FontAwesomeIcon icon={faMagnifyingGlass}  style={{marginTop:'12px' ,marginLeft:'-30px'}} flip='horizontal' className='text-secondary' />

      </div>
      <div className="col-md-4"></div>
    </div>



    {allProject?.length>0?<div className='container-fluid mt-5'>
      <div className="row">

        {allProject?.map((item)=>(<div className="col-md-4">
          <ProjectCard projects={item}/>
        </div>))}

        <div className="col-md-4"></div>
        <div className="col-md-4"></div>
      </div>
    </div>
:
    <p className='text-center text-danger mt-5 fs-3'>No Project To Display</p>}

    </div>
:
   <div className="row w-100">
    <div className="col-md-2"></div>
    <div className="col-md-8 d-flex justify-content-center align-items-center flex-column">
      <img src="https://arkca.com/assets/img/login.gif" alt="no image" width={'100%'} height={'400%'}/>
      <h4>Please <Link to={'/login'} style={{color:'red'}}>Login</Link> To Expolre More Projects</h4>
    </div>
    <div className="col-md-2"></div>
   </div>}

    </>
  )
}

export default Project
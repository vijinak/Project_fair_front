import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard'
import { homeProjectApi } from '../service/allApi'


function Home() {

const [isLogin , setIsLogin] = useState(false)
const [homeProject,sethomeProject] = useState([])

const getHomeProject = async()=>{
  const result = await homeProjectApi()
  sethomeProject(result.data);
}

useEffect(()=>{
  if(sessionStorage.getItem("token")){
    setIsLogin(true)
  }
  else{
    setIsLogin(false)
  }
  getHomeProject()
},[])


  return (
    <>
    <div className='container-fluid bg-success' style={{height:'100vh'}}>
    <div className="row align-items-center p-3 p-md-5">
        <div className="col-md-6 ps-5 ">
            <h1 className='text-light mt-4' style={{fontSize:'70px'}}>Project Fair</h1>
            <p className='mt-4'>One Stop Destination For All Software Projects </p>
            { !isLogin ?<Link to={'/login'}>
            <button className='btn btn-warning me-3 mt-4'>Get Started<FontAwesomeIcon icon={faArrowRight} className='ms-2' /></button></Link>:
            
            <Link to={'/dashboard'}><button className='btn btn-warning mt-4 '>Manage Project<FontAwesomeIcon icon={faArrowRight} className='ms-2' /></button></Link>}
        </div>
        <div className="col-md-6">
          <img src="https://miro.medium.com/v2/resize:fit:1400/1*u4EBes6Muu2fy7iM8igMug.jpeg" alt="no image" className='w-75 '  style={{marginTop:'70px'}}/>
        </div>
    </div>
    </div>


    <div className='container-fluid'>
      <h1 className='mt-5 text-center'>Explore our projects</h1>
      <div className="row mt-5">
      {homeProject?.length>0?
        homeProject?.map((item)=>(<div className='col-md-4 p-4'>
          <ProjectCard projects={item}/>
          </div>))
          :null
        }
        {/* <div className="col-md-4 p-4">
          <ProjectCard/>
        </div> */}
        {/* <div className="col-md-4 p-4">
          <ProjectCard/>
        </div>
        <div className="col-md-4 p-4">
          <ProjectCard/> */}
        {/* </div> */}
      </div>
    <Link to={'/project'} className='text-center text-danger'><h5>See More Projects</h5></Link>
    </div>
    </>
  )
}

export default Home
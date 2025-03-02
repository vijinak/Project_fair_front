import { faStackOverflow } from '@fortawesome/free-brands-svg-icons'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { loginApi, registerApi } from '../service/allApi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function Auth({register}) {
  const [userDetails,setUserDetails] = useState({
    username:"",
    email:"",
    password:""
  })
  console.log(userDetails);
const Navigate=useNavigate()


//register
/* const handleRegister = async()=>{

  const {username,email,password} =userDetails
  if(!username || !email || !password){
    toast.info('please fill the  form completely')
  }
  else{
    const result= await registerApi(userDetails)
      console.log(result);
      if(result.status==200){
        toast.success('Resgistertion successfull')
        navigate('/login')
      }
      
      else{
        toast.error('something went wrong.please try again later')
      }
  }

} */

  const handleRegister = async () => {
    const { username, email, password } = userDetails;

    if (!username || !email || !password) {
        toast.info('Please fill the form completely');
        return;
    }

    try {
        const result = await registerApi(userDetails);
        console.log(result);

        if (result.status === 200) {
            toast.success('Registration successful');
            Navigate('/login');
        } else {
            toast.error('Something went wrong. Please try again later');
        }
    } catch (error) {
        console.log(error);
        
        if (error.response && error.response.status === 406) {
            toast.error('Account already exists. Please use a different email.');
        } else {
            toast.error('Something went wrong. Please try again later');
        }
    }
};

//login

const handleLogin = async() =>{
  const {email,password}= userDetails
  if(!email || !password){
    toast.info('please fill the fields completely')
  }
  else{
  const result= await (loginApi({email,password}))
  console.log(result);
  if(result.status==200){
    toast.success('login successfull')
    sessionStorage.setItem("existingUser",JSON.stringify(result.data.existingUser))
    sessionStorage.setItem("token",result.data.token)
    setUserDetails({
      username:"",
      email:"",
      password:""
    })
    setTimeout(()=>{
      navigate('/')
    },2000)
    

  }
  else{
  toast.error( result.response.data)
  }
  }
}

  


  return (
    <>
  

    <div className='container-fluid d-flex justify-content-center align-items-center flex-column' style={{height:'100vh'}}>
    <Link to={'/'} className='text-warning' style={{textDecoration:'none'}}>
    <FontAwesomeIcon icon={faArrowLeft} className='me-3' />Back To Home
    </Link>
      <div className="container w-75 bg-success p-3 mt-2 rounded">
        <Row>
          <Col sm={12} md={6} className='p-5 d-flex justify-content-center align-items-center'>
          <img src="https://img.freepik.com/premium-photo/technology-data-protection-with-lock-icon_410516-28458.jpg " alt="no image"  className='w-75'/>
          </Col>
          <Col sm={12} md={6} className='d-flex justify-content-center align-items-center text-light flex-column'>
          <h3><FontAwesomeIcon icon={faStackOverflow} className='me-3  mt-4' />Project Fair</h3>
          {register?<h5>Sign Up To Your Account</h5>:
          <h5>Sign In To Your Account</h5>}


          <form className='mt-4 w-75'>
            {register &&<div className='mb-3'>
              <input type="text" placeholder='User Name' className='form-control' onChange={(e)=>setUserDetails({...userDetails, username:e.target.value})} />
            </div>}
            <div className='mb-3'>
              <input type="text" placeholder='Email' className='form-control'onChange={(e)=>setUserDetails({...userDetails, email:e.target.value})}  />
            </div>
            <div className='mb-3'>
              <input type="text" placeholder='Password' className='form-control' onChange={(e)=>setUserDetails({...userDetails, password:e.target.value})}  />
            </div>
            <div className='mb-3'>
              {register?<div>
              <button className='btn btn-warning w-100' type='button' onClick={handleRegister}>Register</button>
              <p>Alredy a User? Click here to <Link to={'/login'} className='text-danger'>login</Link></p>
              </div>
              :
              <div>
              <button className='btn btn-warning w-100' type='button' onClick={handleLogin}>Login</button>
              <p>New User? Click here to <Link to={'/register'} className='text-danger'>Register</Link></p>
              </div>}

            </div>

          </form>
          </Col>

        </Row>
        
      </div>
      <ToastContainer theme='colored' position='top-center' autoClose = '2000' />
    </div>

    </>
  )
}

export default Auth
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React,{useEffect, useState} from 'react'
import { Collapse } from 'react-bootstrap'
import { serverUrl } from '../service/serverUrl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { editProfileApi } from '../service/allApi';



function Profile() {
  const [open, setOpen] = useState(false);
  const [userDetails,setUserDetails] = useState({
    username:"",
    email:"",
    password:"",
    github:"",
    linkdin:"",
    profile:""
  })
  const [existingImage ,setExistingImage] =useState("")
  const [preview ,setpreview] =useState("")
  const [editStatus, setEditStatus] = useState(false)

  const handleProfileFile = (e)=>{
    e.preventDefault()
    setUserDetails({...userDetails , profile:e.target.files[0]})
  }
  console.log(userDetails);

  useEffect(()=>{
   if(userDetails.profile){
    setpreview(URL.createObjectURL(userDetails.profile))
   }
   else{
    setpreview("")
   }
  },[userDetails.profile])

useEffect(()=>{
  if(sessionStorage.getItem("existingUser")){
    const user =JSON.parse(sessionStorage.getItem("existingUser"))
    setUserDetails({...existingImage,username:user.username,email:user.email,password:user.password,github:user.github,linkdin:user.linkdin})
    setExistingImage(user.profile)
  }
  setEditStatus(false)

},[editStatus]) 


const handleprofileUpdate = async()=>{
  const {username ,email ,password ,github ,linkdin ,profile} = userDetails
  if(!username || !email || !password || !github || !linkdin){
     toast.info('please fill the  input fields')
  }
  else{
    const reqBody = new FormData()
    reqBody.append("username",username)
    reqBody.append("email",email)
    reqBody.append("password",password)
    reqBody.append("github",github)
    reqBody.append("linkdin",linkdin)
    preview?reqBody.append("profile",profile):reqBody.append("profile",existingImage)

    const token = sessionStorage.getItem("token")

    if(preview){
      const reqHeader ={
        "Content-Type":"multipart/form-data",
        "Authorization" :`Bearer ${token}`
       }

       const result =await editProfileApi(reqBody,reqHeader)
       console.log(result);
       if(result.status==200){
        toast.success('profile updated successfully')
        sessionStorage.setItem("existingUser",JSON.stringify(result.data))
        setEditStatus(true)
       }
       else{
        toast.error('somthing went wrong')
       }
    }
    else{
      const reqHeader = {
        "Content-Type":"application/json",
        "Authorization" :`Bearer ${token}`
      }
      const result =await editProfileApi(reqBody,reqHeader)
       console.log(result);
       if(result.status==200){
        toast.success('profile updated successfully')
        sessionStorage.setItem("existingUser",JSON.stringify(result.data))
        setEditStatus(true)
       }
       else{
        toast.error('somthing went wrong')
       }
     }
  }
}
console.log(open);
  return (
    <>
    <div className='shadow p-4 mx-3 rounded' onMouseEnter={()=>setOpen(true)} >
     <div className='d-flex justify-content-between mt-3'>
     <h4 className='text-success'>Pofile</h4>
     <button type='button '  onClick={() => setOpen(!open)} className='btn btn-outline-success ' >
     {!open? <FontAwesomeIcon icon={faAngleDown} />:
      <FontAwesomeIcon icon={faAngleUp} />}
     </button>
     </div>

     <Collapse in={open}>
     <div>
     <div className='d-flex align-items-center justify-content-center flex-column'>
      <label htmlFor="profileImg">
        <input id='profileImg' type="file" style={{display:'none'}} onChange={(e)=>handleProfileFile(e)}/>
      {existingImage==""?
        <img  src={preview?preview:"https://cdn.pixabay.com/photo/2019/08/11/18/59/icon-4399701_960_720.png"}alt="no image" style={{width:'160px',height:'160px',borderRadius:'50%'}} />

      :
      
      <img  src={preview?preview:`${serverUrl}/uploads/${existingImage}`} alt="no image" style={{width:'160px',height:'160px',borderRadius:'50%'}} />

      }
      </label>
    
      <form className='mt-4 w-100'>
        <div className="mb-3">
        <input type="text" placeholder='Github' className='form-control ' value={userDetails.github} onChange={(e)=>setUserDetails({...userDetails,github:e.target.value})}/>
        </div>
        <div className="mb-3">
        <input type="text" placeholder='Linkedin' className='form-control '  value={userDetails.linkdin}  onChange={(e)=>setUserDetails({...userDetails,linkdin:e.target.value})}/>
        </div> 
        <div className="mb-3">
        <button type='button' className='btn btn-success w-100 rounded-0 ' onClick={handleprofileUpdate}>Update</button>
        </div>
      </form>
      </div>
      </div> 
      </Collapse>

    </div>
    <ToastContainer theme='colored' position='top-center' autoClose = '2000' />
    </>
  )
}

export default Profile
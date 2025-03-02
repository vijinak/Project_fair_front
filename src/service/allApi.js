import { commonApi } from "./commonApi"
import { serverUrl } from "./serverUrl"


//register
export const registerApi = async(reqBody)=>{
    return await commonApi('POST',`${serverUrl}/register`,reqBody,"")
}

//login
export const loginApi = async(reqBody)=>{
    return await commonApi('POST',`${serverUrl}/login`,reqBody,"")
}

//add project
export const addProjectApi = async(reqBody , reqHeader)=>{
    return await commonApi('POST',`${serverUrl}/addproject`,reqBody,reqHeader)
}

//home project
export const homeProjectApi = async()=>{
    return await commonApi('GET',`${serverUrl}/homeproject`,"","")
}

//all project 
//query parameter  = baseUrl?key=value
export const allProjectApi = async(searchKey,reqHeader)=>{
  return await commonApi('GET',`${serverUrl}/allprojects?search=${searchKey}`,"",reqHeader)  

}

//user project
export const userProjectApi = async(reqHeader)=>{
    return await commonApi('GET',`${serverUrl}/userProject`,"",reqHeader)
}

//delete project
export const deleteProjectApi = async(id)=>{
    return await commonApi('DELETE',`${serverUrl}/delete/${id}`,{},"")
}

//update project
export const editProjectApi = async(projectid,reqBody,reqHeader)=>{
return await commonApi('PUT',`${serverUrl}/edit-project/${projectid}`,reqBody,reqHeader)
}

//edit Profile
export const editProfileApi = async(reqBody,reqHeader)=>{
    return await commonApi('PUT',`${serverUrl}/edit-profile`,reqBody,reqHeader)
}
import axios from "axios"



export const commonApi = async (httpRequest, url,reqbody,reqHeader)=>{
    const reqConfig ={
        method:httpRequest,
        url,
        data:reqbody,
        headers:reqHeader?reqHeader:{"content-type":"application/json"}
    }

   return await axios(reqConfig).then((resulte)=>{
    return resulte
   }).catch((error)=>{
    return error
   })
}
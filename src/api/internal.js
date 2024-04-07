import axios from "axios"

const api= axios.create({
    baseURL: process.env.REACT_APP_INTERNAL_API_PATH,
    withCredentials:true,
    headers: {
        "Content-Type":"application/json",
    },
}) 

export const login= async(data)=>{ 
let response;

    try{
       response = await api.post("/login",data)
    }
    catch(error){
        return error;
    }

    return response;
}

export const signup = async(data)=>{
    try{
        const response= await api.post("/register",data); 
        return response;
    }
    catch(error){
        console.log(error)
        return error;
    }   

}

export const signout= async()=>{
    let response;
    try{
        response = await api.post("/logout")
    }
    catch(error){
        return error
    }

    return response
}

export const profileUpdate= async (dataToSend)=>{
    let response;
    try{
     response = await api.put("/profile",dataToSend)
    }
    catch(error){
        return error
    }
    return response;
}

export const blogAll= async(data)=>{
    let response;
    try{
        response= await api.get("/blog/all/"+data)
        

    }
    catch(error){
console.log(error)
    }
    return response
}


export const submitBlog= async (data)=>{
    let response;
    try{
        response= await api.post("/blog",data);
    }
    catch(error){
    console.log(error);
    return  error;
    }
    return response;
}


export const getBlogById= async(id)=>{
    let response;
    try{
        response=await api.get(`/blog/${id}`)
        // console.log(response)
    }
catch(error){
    return error
}
return response;
}

export const getCommentsById = async(id)=>{ 
    let response;
    try{
        response= await api.get("/comment/"+id,{validateStatus:false})
        
    }
    catch(error){
        return error
    }
    return response;
}


export const postComment= async(data)=>{
    let response;
    try{
     response =    await api.post("/comment",data)
    }
    catch(error){
        return error
    }
    return response
}

export const deleteBlog= async(id)=>{
    let response;
    try{
     response =   await api.delete("/blog/"+id)
    }
    catch(error){
        return error
    }
    return response;
}


export const updateBlog= async (data,id)=>{
    let response;
    try{
        response = await api.put("/blog/"+id,data) ;
    
    }
    catch(error){
        return error
    }
    
    return response;
}



api.interceptors.response.use(
 config=>config   ,
 async (error)=>{
    const originalReq= error.config
    if((error.response.status===401||error.response.status===500)&&originalReq&&!originalReq._isRetry){
        originalReq._isRetry=true;
        try {
           await axios.get(`${process.env.REACT_APP_INTERNAL_API_PATH}/refresh`,{withCredentials:true})
            return api.request(originalReq)
        } catch (error) {
            return error
        }
    }
    else if(error.response.status===409){
        return error;
    }
    
 }

)
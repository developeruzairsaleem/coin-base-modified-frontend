import axios from "axios"


// ------------------------------------------------
// setting up the backend URI to handle API request
// ------------------------------------------------

const api= axios.create({
    baseURL: process.env.REACT_APP_INTERNAL_API_PATH,
    withCredentials:true,
    headers: {
        "Content-Type":"application/json",
    },
}) 



//-------------------------
// login the user
//-------------------------

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




//-----------------------------------
// Sign up new user
//-----------------------------------
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

//--------------------------
// Sign out the current user
//--------------------------

export const signout = async () => {
    let response;
    try{
        response = await api.post("/logout");
    }
    catch(error){
        return error;
    }

    return response;
}


//--------------------------------------
// update the user profile with new data
//--------------------------------------
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

export const blogAll= async()=>{
    let response;
    try{
        response= await api.get("/blog/all")
    }
    catch(error){
        console.log(error)
    }
    return response
}


//----------------------------------
// submitting a blog to the backend
//----------------------------------

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



// ------------------------------------------------
// get the blog by id --- for the blog details page
// ------------------------------------------------

export const getBlogById= async (id) => {
    let response;
    try{
        response=await api.get(`/blog/${id}`);
    }
    catch(error){
        return error;
    }
    return response;
}

// ---------------------------
// get the comments by blog Id
// ---------------------------
export const getCommentsById = async (id) => { 
    let response;
    try{
        response= await api.get("/comment/"+id,{validateStatus:false});
    }
    catch(error){
        return error;
    }
    return response;
}

// adding new comments to the blog post
export const postComment= async(data)=>{
    let response;
    try{
        response = await api.post("/comment",data)
    }
    catch(error){
        return error
    }
    return response
}


// delete the blog post by the owner
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



// update the  blog post with new content and data
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


// handling failed requests or auto authenticating with interceptors
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
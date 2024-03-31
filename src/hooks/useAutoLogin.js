import { useState, useEffect} from "react"
import axios from "axios"
import {setUser} from "../store/userSlice"
import { useDispatch } from "react-redux"

function useAutoLogin(){
    const dispatch= useDispatch()
    const [loading, setLoading]= useState(true);

    useEffect(()=>{

        ( async _=>{

            try{

                
            const response= await axios.get(`${process.env.REACT_APP_INTERNAL_API_PATH}/refresh`,{withCredentials:true})
            if(response.status===200){
                // setUser
            const user={
                _id:response.data.user._id,
                email:response.data.user.email,
                username:response.data.user.username,
                name:response.data.user.name||"hello",
                profilePhoto:response.data.user.profilePhoto||"",
                auth:response.data.auth
                
            }
            
            dispatch(setUser(user))
            
        }
            
        }
        catch(error){
            // handling error
            console.log("error refreshing the token",error)
        }

        finally{
            setLoading(false)
        }
        




        })()



    })


return loading


}

export default useAutoLogin
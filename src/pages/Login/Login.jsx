import styles from "./Login.module.css";
import { useState } from "react";
import TextInput from "../../components/TextInput/TextInput";
import loginSchema from "../../schemas/loginSchema";
import { login } from "../../api/internal";
import {setUser} from "../../store/userSlice"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";

function Login() {
const navigate= useNavigate();
const dispatch= useDispatch();
const [error,setError]=useState("")
    const handleLogin=async()=>{
    
        const data={
            username:values.username,
            password:values.password
        }
        const response = await login (data)

if(response.status===200){
    // setUser
const user={
    _id:response.data.user._id,
    email:response.data.user.email,
    username:response.data.user.username,
    auth:response.data.auth,
    name:response.data.user.name||"",
    profilePhoto:response.data.user.profilePhoto||""
    
}

dispatch(setUser(user))
    // Redirect To home page
navigate("/");
}
else if(response.code==="ERR_BAD_REQUEST"){
    // display error
setError(response.data.message)
}

    }


    const{handleChange,handleBlur,touched,errors,values}= useFormik({
        initialValues:{
            username:"",
            password:""
        },
        validationSchema: loginSchema
    })
    return(

        <div className={styles.loginWrapper}>
    <div className={styles.loginHeader}>Login to your account</div>
    <TextInput 
    type="text"
    value={values.username}
    name="username"
    onBlur={handleBlur}
    onChange={handleChange}
    placeholder="username"
    error={errors.username&&touched.username?1:undefined}
    errorMessage={errors.username}
     />
    <TextInput
    type="password"
    name="password"
    value={values.password}
    onBlur={handleBlur}
    onChange={handleChange}
    placeholder="password"
    error={errors.password&&touched.password?1:undefined}
    errorMessage={errors.password}

    
     />
     <button className={styles.loginButton} disabled={!values.username||!values.password||errors.username||errors.password} onClick={handleLogin} > Login</button>
    <span>
      Don't have an account? <button className={styles.createAccount} onClick={()=>navigate("/signup")} > Register</button>
    </span>
    {error!==""?<p className={styles.errorMessage}>{error}</p>:""}
  </div>
        )
}
export default Login;

import { useState } from "react";
import styles from "./Signup.module.css";
import TextInput from "../../components/TextInput/TextInput"
import signupSchema from "../../schemas/signupSchema"
import { signup } from "../../api/internal"
import {setUser} from "../../store/userSlice"
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";







function Signup(){
 const navigate=useNavigate();
 const dispatch=useDispatch();
 const [error,setError]=useState("")
 const handleSignup=async()=>{ 
    const data={
        name:values.name,
        username:values.username,
        password:values.password,
        confirmPassword:values.confirmPassword,
        email:values.email
    }

    const response= await signup(data)
    if (response.status===201) {
         const user={

            _id:response.data.user._id,
            username:response.data.user.username,
            email:response.data.user.email,
            auth:response.data.auth


         }

         dispatch(setUser(user));
         navigate("/")
    }
    else if(response.code==="ERR_BAD_REQUEST"){
        setError(response.response.data.message)
    }
 }
 const {handleChange,handleBlur,touched,errors,values}=useFormik({
    initialValues:{
        username:"",
        password:"",
        confirmPassword:"",
        name:"",
        email:""
    },
    validationSchema:signupSchema
 })
    

return(
<div className={styles.signupWrapper}>
    <div className={styles.signupHeader}>
        Create an account
    </div>

    <TextInput
        type="text"
        name="name"
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="name"
        error={errors.name&&touched.name?1:undefined}
        errorMessage={errors.name}
    />
    <TextInput 
        type="text"
        name="username"
        value={values.username}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="username"
        error={errors.username&&touched.username?1:undefined}
        errorMessage={errors.username}
    />
    <TextInput
        type="text"
        name="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="email"
        error={errors.email&&touched.email?1:undefined}
        errorMessage={errors.email}
    />
    <TextInput
        type="password"
        name="password"
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="password"
        error={errors.password&&touched.password?1:undefined}
        errorMessage={errors.password}
    />
    <TextInput
        type="password"  
        name="confirmPassword"
        value={values.confirmPassword}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="confirmPassword"
        error={errors.confirmPassword&&touched.confirmPassword?1:undefined}
        errorMessage={errors.confirmPassword}

    />

    <button className={styles.signupButton} onClick={handleSignup}  disabled={
        !values.username||!values.name||!values.password||!values.confirmPassword||!values.email||
        errors.username||errors.name||errors.password||errors.confirmPassword||errors.email
        
        
        
        }  >Sign up</button>

    <span>Already have an account?
        <button className={styles.login} onClick={()=>navigate("/login")}>Login</button>    
    </span>
    {error!=""?<p className={styles.errorMessage}>{error}</p>:""}
</div>
)

}
export default Signup;
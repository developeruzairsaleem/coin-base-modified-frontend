import React, { useState } from "react"
import TextInput from "../../components/TextInput/TextInput";
import ProfilePhoto from "../../components/ProfilePhoto/ProfilePhoto";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";


// 1 get the profile photo if available
// 2 show the profile photo if available
// 3 else show the first letter of their name
//state for the  photo keeping
// sending the data to the backend for the user update (have to create a controller in backend for user update)
import { useSelector } from "react-redux";

const ProfileUpdate =()=>{
	const imageSize={
		width:"100px",
		height:"100px",
		fontSize:"30px"

	};
	const user = useSelector(state=>state.user);
	const [name,setName] = useState(user.name);
	const [username,setUsername] = useState(user.username);

	return (
		<div className =" border w-8/12 border-gray-300 rounded-lg p-5 mx-auto my-5 shadow-md">
			<h1 className=" text-center text-gray-500 font-semibold text-xl">{"Update your profile"}</h1>	
			<div className="my-10 flex justify-between items-center">
				<ProfilePhoto name={user.name} size={imageSize}/>
				<div className="flex gap-3">
					<button className="border rounded-lg border-blue-500 text-white bg-blue-500 p-2 " >Add Photo</button>
					<button className="border rounded-lg border-red-500 bg-red-500 text-white p-2">Remove Photo</button>
				</div>
			</div>

			<div className="">
				<label htmlFor="name">Name:</label>
				<TextInput 
		    		type="text"
    				name="name"
					id="name"
    				value={name}
    				onChange={(e)=>setName(e.target.value)}
      				placeholder="Name"
			    />
			</div>


			
			<div className="">
				<label htmlFor="username">Username:</label>
				<TextInput 
		    		type="text"
    				name="username"
					id="username"
    				value={username}
    				onChange={(e)=>setUsername(e.target.value)}
      				placeholder="Username"
				/>
			</div>

			<div className="flex justify-end gap-3">
				<button className="border rounded-lg border-red-500 text-red-500 p-2">Cancel</button>
				<button className="border rounded-lg border-blue-500 text-white bg-blue-500 p-2 ">Update</button>
			</div>
		</div>
		)
}




export default ProfileUpdate;
/*




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
        email:values.email,

    }
    const response= await signup(data);
    console.log(response)

    if (response?.status===201) {
         const user={

            _id:response.data.user._id,
            username:response.data.user.username,
            email:response.data.user.email,
            auth:response.data.auth,
            name:response.data.user.name||"",
            profilePhoto:response.data.user.profilePhoto||""


         }

         dispatch(setUser(user));
         navigate("/");
    }

    else if(response?.code==="ERR_BAD_REQUEST"){
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
*/
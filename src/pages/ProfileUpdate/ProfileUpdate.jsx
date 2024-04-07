import React, { useState } from "react"
import TextInput from "../../components/TextInput/TextInput";
import ProfilePhoto from "../../components/ProfilePhoto/ProfilePhoto";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";


// 1 get the profile photo if available
// 2 show the profile photo if available
// 3 else show the first letter of their name
//state for the  photo keeping
// sending the data to the backend for the user update (have to create a controller in backend for user update)

const ProfileUpdate =()=>{
	const imageSize={
		width:"100px",
		height:"100px",
		fontSize:"30px"

	};
	const user = useSelector(state=>state.user);
	const [name,setName] = useState(user.name);
	const [username,setUsername] = useState(user.username);
    const [profilePhoto, setProfilePhoto] = useState(user.profilePhoto);
    const [dataToSend, setDataToSend] = useState({name:user.name,username:user.username});
    const [photoError, setPhotoError] = useState("");
    const [nameError, setNameError] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [nameTouched, setNameTouched] = useState(false);
    const [usernameTouched, setUsernameTouched] = useState(false);

    const handlePhotoChange= (e) => {
        const file = e.target.files[0];
        if(file){
            if(file.type && !file.type.startsWith("image/")){
                setPhotoError("File is not a valid image.");
                return;
            }
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload=()=>{
                setProfilePhoto(reader.result);
                setDataToSend({...dataToSend,profilePhoto:reader.result});
                setPhotoError("");
            }
        }

    }




    const handlePhotoRemove=()=>{
        setDataToSend({...dataToSend,profilePhoto:""});
        setProfilePhoto("");
        setPhotoError(" ")
    }


    const handleReset=()=>{
        setName(user.name)
        setUsername(user.username)
        setDataToSend({name:user.name,username:user.username});
        setProfilePhoto(user.profilePhoto);
        setPhotoError("");
        setNameError("");
        setUsernameError("");
        setNameTouched(false);
        setUsernameTouched(false);

    };

    const handleUpdate=()=>{

        




    }

    //ONGOING TASK 
    /////////////////////////////////////////////////////////////    
    //--------------------------------------------------------------------------------------------
    // validation and showing error for photo, name and username and uploading the data to backend 
    //---------------------------------------------------------------------------------------------

    const validateName=(name)=>{
        if(typeof name !== "string" ){
            return "Enter a valid string";
        }
        else if( name.length === 0){
            return "name is required";
        }
        else if(name.length >  30){
            return "Name must not exceed 30 characters";
       }
       else if (name.length < 5){
         return "name must be atleast 5 characters";
       }
       else{
            return "";
       }
    }

    const validateUsername=(username)=>{
        if(typeof username !== "string"){
           return "Enter a valid string"
        }
        else if(username.length===0){
            return "username is required"
        }
        else if(username.length>30){
            return "username must not exceed 30 characters"
        }
        else if(username.length<5){
            return "username must be atleast 5 characters";
        }
        else{
            return "";
        }

    }
    
    //--------------------------------------------------------------------------------------------
    // validation and showing error for photo, name and username and uploading the data to backend 
    //--------------------------------------------------------------------------------------------
    /////////////////////////////////////////////////////////////    
    //ONGOING TASK 
    




	return (
		<div className =" border w-8/12 border-gray-300 rounded-lg p-5 mx-auto my-5 shadow-md">
			<h1 className=" text-center text-gray-500 font-semibold text-xl">{"Update your profile"}</h1>	
			<div className="my-10 flex justify-between items-center">
				<ProfilePhoto photo={profilePhoto} name={user.name} size={imageSize}/>
				<div className="flex gap-3">
					<button className="">
                    <label htmlFor="profilephoto" className="h-full w-full block bg-blue-500 p-2 border rounded-lg border-blue-500 text-white hover:bg-blue-600 hover:cursor-pointer"> 
                    <input  className="hidden" name="profilephoto" id="profilephoto" type="file" onChange={handlePhotoChange} />
                    Add Photo
                    </label>
                    </button>

					<button className="border rounded-lg border-red-500 bg-red-500 text-white p-2 hover:bg-red-600  " onClick={handlePhotoRemove} >Remove Photo</button>
				</div>
			</div>
                    {photoError&&(<div className="text-red-600">{photoError}</div>)}

			<div>
				<label htmlFor="name">Name:</label>
				<TextInput 
		    		type="text"
    				name="name"
					id="name"
    				value={name}
    				onChange={(e)=>{
                        setName(e.target.value)
                        setDataToSend({...dataToSend,name:e.target.value});
                        setNameError(validateName(e.target.value))
                    }}
      				placeholder="Name"
                    error={nameError&&nameTouched}
                    onBlur={_=>{
                        setNameTouched(true);
                    }}
                    errorMessage={nameError}
			    />

			</div>


			
			<div className="">
				<label htmlFor="username">Username:</label>
				<TextInput 
		    		type="text"
    				name="username"
					id="username"
    				value={username}
    				onChange={(e)=>{
                        setUsername(e.target.value)
                        setDataToSend({...dataToSend,username:e.target.value})
                        setUsernameError(validateUsername(e.target.value))
                        }}
      				placeholder="Username"
                    onBlur={_=>{
                        setUsernameTouched(true)
                    }}
                    error={usernameError&&usernameTouched}
                    errorMessage={usernameError}
				/>
			</div>

			<div className="flex justify-end gap-3">
				<button handle className="border rounded-lg border-red-500 text-red-500 p-2" onClick={handleReset} >Reset</button>
				<button className="border rounded-lg border-blue-500 text-white bg-blue-500 p-2" disabled={photoError||nameError||usernameError}  onClick={handleUpdate} >Update</button>
			</div>
		</div>
		);

}



export default ProfileUpdate;



{/*


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
*/}
import React, { useState } from "react"
import TextInput from "../../components/TextInput/TextInput";
import ProfilePhoto from "../../components/ProfilePhoto/ProfilePhoto";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {setUser} from "../../store/userSlice"
import {useNavigate} from "react-router-dom";
import {profileUpdate} from "../../api/internal";

const ProfileUpdate =()=>{

    //--------------------------------------
    // IMAGE SIZE INSIDE PROFILE UPDATE FORM
    //--------------------------------------
	const imageSize={
		width:"100px",
		height:"100px",
		fontSize:"30px"

	};

    // ----------------------------------------
    //------------APPLICATION STATE------------
    // ----------------------------------------
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
    const [uploading,setUploading] = useState(false);
    const [error, setError] = useState("");
    // ----------------------------------------

    const dispatch = useDispatch();
    const navigate = useNavigate();




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
        setPhotoError("")
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
        setError("")

    };

    const handleUpdate=async()=>{
        setUploading(true);
        const response = await profileUpdate(dataToSend);
        setUploading(false);
        console.log(response, "response here")
        if(response.status===200){
            setError("")
            const data = {
                name:response.data.data.name,
                username:response.data.data.username,
                _id:response.data.data._id,
                email:response.data.data.email,
                profilePhoto:response.data.data.profilePhoto,
                auth:true
            }
            dispatch(setUser(data));
            navigate("/");
        }
        if(response?.code===("ERR_BAD_REQUEST"||"ERR_BAD_RESPONSE")){
            setError("Unable to upload");
        }

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
          {
            uploading &&
           (<div className="fixed w-full h-full bg-blue-200 opacity-70 top-0 left-0" >
                               <div className="flex justify-center items-center h-screen flex-col gap-3">
                                   <div className="animate-spin rounded-full h-16 w-16 border-t-2  border-r-2 border-b-2 border-blue-500"></div>
                                   <p className="">Updating Profile</p>
                               </div>
                       </div>)
          } 
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
				<button className="border rounded-lg border-blue-500 text-white bg-blue-500 disabled:bg-blue-300 disabled:border-blue-300 hover:bg-blue-600 hover:border-blue-600 p-2" disabled={photoError||nameError||usernameError}  onClick={handleUpdate} >Update</button>
			</div>
            <p className="text-red-600">{error&&error}</p>
		</div>
		);

}



export default ProfileUpdate;


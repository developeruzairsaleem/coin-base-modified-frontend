import React from "react";
import styles from "./ProfilePhoto.module.css"

const ProfilePhoto=({photo,name,size,onClick})=>{


	if(photo){
		return (
			<div onClick={onClick} className={`${styles.profilePhoto} cursor-pointer `} style={{...size,backgroundImage:`url(${photo})`,backgroundPosition:"center",backgroundRepeat:'no-repeat',backgroundSize:"cover"}}>									
			</div>
			)
	}
	else{
		return (
			<div onClick={onClick} style={{...size,backgroundColor:"black"}} className={`${styles.profilePhoto} cursor-pointer `} >
				{name[0].toUpperCase()}
			</div>
			)
		}
}


export default ProfilePhoto;
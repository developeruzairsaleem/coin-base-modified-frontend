import React from "react";
import styles from "./ProfilePhoto.module.css"

const ProfilePhoto=({photo,name,size})=>{


	if(photo){
		return (
			<div className={styles.profilePhoto} style={{...size,background:`url(${photo})`,backgroundPosition:"center",backgroundRepeat:'no-repeat',backgroundSize:"cover"}}>
																
			</div>
			)
	}
	else{
		return (
			<div style={{...size,backgroundColor:"black"}} className={styles.profilePhoto}>
				{name[0]}
			</div>
			)
		}
}


export default ProfilePhoto;
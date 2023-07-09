
import {useState } from "react";
import { submitBlog } from "../../api/internal";
import { useSelector } from "react-redux"; 
import TextInput from "../../components/TextInput/TextInput";
import styles from "./Create.module.css"
import { useNavigate } from "react-router-dom";
// 

function Create(){

const navigate=useNavigate()

const handleSubmit=async ()=>{
  let data={
    title,content,photo,author
  }
  const response=  await submitBlog(data)
if(response.status===201){
  navigate("/")
}

}

const photoChange=(e)=>{
const file = e.target.files[0]
const reader= new FileReader();
 reader.readAsDataURL(file);
 reader.onloadend=()=>{
  setPhoto(reader.result)
 }

}


const [title,setTitle]=useState("");
const [content,setContent]=useState("");
const [photo,setPhoto]=useState("");
const author = useSelector((state)=>state.user._id)




return (
    <div className={styles.wrapper}>
    <div className={styles.header} >Create a blog</div>
    <TextInput
      type="text"
      name="title"
      value={title}
      onChange={(e)=>setTitle(e.target.value)}
      placeholder="title"
      style={{width:"60%"}}
    />
   <textarea 
    name="content"
    value={content}
    className={styles.content}
    maxLength={400}
    placeholder="Your content goes here ..."
    onChange={(e)=>setContent(e.target.value)}
   />
   <div className={styles.photoPrompt} >
    <p>Choose a photo</p>
    <input
     type="file"
     name="photo"
     id="photo"
     onChange={photoChange}
     accept="image/jpg, image/jpeg, image/png"
          />
          {photo!==""?<img width={100} src={photo}/>:""}
   </div>
   

  <button className={styles.submit} disabled={title===""||content===""||photo===""} onClick={handleSubmit} >Submit</button>


    </div>
)

}


export default Create;
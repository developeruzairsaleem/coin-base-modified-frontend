import { useState, useEffect} from "react"
import { getBlogById} from "../../api/internal"
import {useNavigate,useParams} from "react-router-dom"
import styles from "./UpdateBlog.module.css"
import { useSelector } from "react-redux"
import { updateBlog } from "../../api/internal"
import TextInput from "../../components/TextInput/TextInput"






function UpdateBlog(){
const navigate= useNavigate()
    const params= useParams()
    const blogId= params.id

const author= useSelector((state)=>state.user._id)
    const handleUpdate=async ()=>{
        let data;
        
        if(photo.includes("http")){

      data = {
              title,content,author,blogId,photo
            }
        }

        else{
            data = {
                title,content,author,blogId,photo
            }
        }

        const response=  await updateBlog(data,blogId)
      if(response.status===200){
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



    const [title,setTitle]= useState("")
    const [content,setContent]= useState("")
    const [photo,setPhoto]= useState("")

    useEffect(()=>{

            ( async _=>{
                const response= await getBlogById(blogId)

                if(response.status===200){
                    setTitle(response.data.blog.title)
                    setPhoto(response.data.blog.photo)
                    setContent(response.data.blog.content)
                }

            })()

    })



    return (
        
        <div className={styles.wrapper}>
        <div className={styles.header} >Update Blog</div>
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
              <img width={100} src={photo} alt="picturess"/>
       </div>
       
    
      <button className={styles.submit} onClick={handleUpdate} >Update</button>
    
    
        </div>

    )
}


export default UpdateBlog
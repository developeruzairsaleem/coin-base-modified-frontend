import React,{useState } from "react";
import { submitBlog } from "../../api/internal";
import { useSelector } from "react-redux"; 
import TextEditor from "../../components/TextEditor/TextEditor";
import TextInput from "../../components/TextInput/TextInput";
import styles from "./Create.module.css"
import { useNavigate } from "react-router-dom";
import BlogCategory from "../../components/BlogCategory/BlogCategory"






  const categories =[
    "technology",
    "life style",
    "travel",
    "food",
    "finance",
    "education",
    "business", 
    "arts and culture",
    "parenting", 
    "sports", 
    "environment", 
    "politics", 
    "health and wellness", 
    "entertainment", 
    "science"
    ];



// Create function to create a blog post for the first time

function Create(){

  const [title,setTitle]=useState("");
  const [content,setContent]=useState("");
  const [photo,setPhoto]=useState("");
  const [category, setCategory] = useState(categories[0]);


  // error handling states
  const[photoError, setPhotoError] = useState("");

  console.log("my content is", content)
  // const [category, setCategory] = useState("Choose");
  const author = useSelector((state)=>state.user._id);
  const navigate=useNavigate();
  //----------------------------------
  // submitting the data to the server
  //----------------------------------


  const handleSubmit = async () => {

    //---------------------------------------------------
    // storing the data in object to send to the backend
    //---------------------------------------------------

    let data = {
      title,content,photo,author,category
    };

    const response =  await submitBlog(data);

    if(response.status === 201){
      navigate("/");
    }

  }





// ---------------------------------------------------------
// handle photo change will be handle here
// ---------------------------------------------------------
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
                setPhoto(reader.result);
                console.log(reader.result)
                // setDataToSend({...dataToSend,profilePhoto:reader.result});
                setPhotoError("");
            }
        }

    }









  return (
      <div className={styles.wrapper}>
        <div  className={styles.header} >Create a blog</div>
        <TextInput
          type="text"
          name="title"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
          placeholder="title"
        />
        <BlogCategory selected={category} setSelected={setCategory} categories={categories} />


      <TextEditor value={content} setValue={setContent}/>
     
      <div className="w-100 h-10 bg-blue-200">
        <label className="h-full  w-full block p-2" htmlFor="blogphoto" >
            Choose Blog Photo
            <input className="hidden" id="blogphoto"  type="file" onChange={handlePhotoChange} />
        </label>
      </div>

      <button className={styles.submit} disabled={title===""||content===""||photo===""} onClick={handleSubmit} >Submit</button>


      
    </div>
  )

}


export default Create;




/////////////////////////////////////////////////////
























{/*
      <textarea 
      name="description"
      value={description}
      className={styles.description}
      placeholder="Your description goes here ..."
      onChange={(e)=>{
    
      setDescription(e.target.value)


        }}
     />


     <textarea 
      name="content"
      value={content}
      className={styles.content}
      // maxLength={400}
      placeholder="Your content goes here ..."
      onChange={(e)=>{
    
      setContent(e.target.value)
  


        }}
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
        {photo!==""?<img width={100} src={photo}/>:""}*/}
     {/*</div>*/}






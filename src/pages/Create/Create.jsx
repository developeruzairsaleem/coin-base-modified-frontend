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
  // state of the application
  const [title,setTitle]=useState("");
  const [content,setContent]=useState("");
  const [photo,setPhoto]=useState("");
  const [category, setCategory] = useState(categories[0]);
  const [fileName, setFileName] = useState("");

  // error handling states
  const[photoError, setPhotoError] = useState("");
  const[titleError, setTitleError] = useState("");
  const[contentError, setContentError] = useState("");

  // touched states for the inputs
  const [photoTouched, setPhotoTouched] =  useState(false);
  const [titleTouched, setTitleTouched] = useState(false);
  const [contentTouched, setContentTouched] = useState(false);

// already avaiable state from redux store
  const author = useSelector((state)=>state.user._id);
  console.log(content);
 

  // for navigation to other routes on some changes 
  const navigate=useNavigate();




// validating the text data

const validateContent=(content)=>{
  content = getTextFromHtml(content);
  if(typeof content !== "string"){
    setContentError("content is not a valid string")
  }

  else if(!content){
    setContentError("content is required");
  }
  else if(content.length<50){
    setContentError("content should be atleast 50 characters long");
  }
  else if(content.length>3000){
    setContentError("the content length should not exceed 3000 characters");
  }
  else{
    setContentError("")
  }

}


const validateTitle=(title)=>{
  if(typeof title !=="string"){
    setTitleError("title is not valid string");
  }
  else if(!title){
    setTitleError("title is required");
  }
  else if (title.length<20){
    setTitleError("title must be atleast 20 characters long");
  }
  else if(title.length>200){
    setTitleError("title can have 200 characters atmost");
  }
  else {
    setTitleError("")
  }
}




const validatePhoto=()=>{
  if(!photo){
    setPhotoError("Photo is required");
  }
  else{
    setPhotoError("")
  }
}


// handling blur of the content
  const handleBlur=(content)=>()=>{
    validateContent(content);
    setContentTouched(true);


  }


  // exclude the html from the text
  const getTextFromHtml = (html) => {
  return html.replace(/<(?:.|\n)*?>/gm, '').trim();
};
 





  //----------------------------------
  // submitting the data to the server
  //----------------------------------


  const handleSubmit = async () => {

    //---------------------------------------------------
    // storing the data in object to send to the backend
    //---------------------------------------------------




    let data = {
      title,content,photo,category
    };

    const response =  await submitBlog(data);

    if(response.status === 201){
      navigate("/");
    }

  }

const data = (_=>{
console.log("my photo data", photo);

}

  )()



// ---------------------------------------------------------
// handle photo change will be handle here
// ---------------------------------------------------------
   const handlePhotoChange= (e) => {
        const file = e.target.files[0];
        validatePhoto();
        setPhotoTouched(true)
        if(file){
          console.log(file.type, "the type of the file")
            if((file.type && !file.type.startsWith("image/"))||!file.type){
                setPhotoError("File is not a valid image.");
                return;
            }
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload=()=>{
                setPhoto(reader.result);
                setFileName(file.name);
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
          onChange={(e)=>{
            setTitle(e.target.value)
            validateTitle(e.target.value);
          }}
          placeholder="title"
          onBlur={()=>{
            setTitleTouched(true);
            validateTitle(title);
          }}
        />
        {titleError && titleTouched&&<p className="text-left w-full my-3  text-red-600">{titleError}</p> }
        <BlogCategory selected={category} setSelected={setCategory} categories={categories} />


      <TextEditor 
      value={content} setValue={setContent} handleBlur={handleBlur} validateContent={validateContent} />
      {contentError&&contentTouched&& <p className="text-left w-full my-3  text-red-600">{contentError}</p>}     
     



      <div className="flex items-center   w-full my-3 gap-3">
        
      
      <div className="rounded-md hover:bg-blue-600 cursor-pointer text-white w-60 text-center h-15 bg-blue-500">
        <label className=" cursor-pointer h-full  w-full block p-3" htmlFor="blogphoto" >
            Choose A Photo
            <input accept="image/jpg, image/jpeg, image/png" className="hidden" id="blogphoto"  type="file" onChange={handlePhotoChange} />
        </label>
      </div>
      {
        fileName?<p className="text-blue-500 font-bold">{fileName.slice(0,20)+"..."}</p>:<p className="text-blue-500 font-bold">No File Chosen</p>
      }
     

      </div>

      {photoError&& <p className="text-left w-full my-3  text-red-600" >{photoError}</p>}

      <button className={`${styles.submit} bg-blue-500 disabled:bg-blue-400 `} disabled={!title||!getTextFromHtml(content)||!photo||!photoTouched||!titleTouched||!contentTouched||titleError||contentError||photoError} onClick={handleSubmit} >Submit</button>


      
    </div>
  )

}


export default Create;









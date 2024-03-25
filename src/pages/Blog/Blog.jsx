
import { blogAll } from "../../api/internal";
import{useState,useEffect} from "react";
import Loader from "../../components/Loader/Loader.jsx";
import styles from "./Blog.module.css"
import { useNavigate } from "react-router-dom";


function Blog(){
  const [i,setI]=useState(0)
  const [length,setLength]=useState(0)



  // navigate to the specific blog post detail page
  const navigateToBlogDetail=(blogId)=>()=>{
    navigate(`/blog/${blogId}`)
  }



const handleNext=()=>{
if(i<length-10){
  setI(i+10)

}

}

const handlePrevious=()=>{
  if(i>0){
    setI(i-10)

  }
}


 const navigate=useNavigate()
const blogStyle=(url)=>{
  return {
    background: `url(${url})`,
    backgroundPosition:"center",
    backgroundRepeat:"no-repeat",
    backgroundSize:"cover",
    width:"200px",
    height:"200px",
  }
}

    const[blogs,setBlogs]=useState([])
    const [content,setContent]=useState("")
  
    useEffect(() => {
    (async _=>{
    
      let response=  await blogAll(i) 

        if(response.status===200){
          setBlogs(response.data.blogs)
          setLength(response.data.length)
        }
    
    
    })();
    
    
    
    setBlogs([])
    
    
    
    }, [i])
  
    



    if(blogs.length===0){
      return (
        <Loader text="Blogs" />
      )
    }

    return (
  <div className={styles.blogsWrapper}>
{
  blogs.map((blog)=>(

<div key={blog._id} className={styles.blog} onClick={navigateToBlogDetail(blog._id)}>
  <div className={styles.photoCover} style={blogStyle(blog.photo)}>
  </div>
  <div className={styles.textCover}>
  <h2 className={styles.title}>{blog.title}</h2>

  <p className={styles.content}>
    
    {
  `${blog.content.replace(/\|n\|/g,'\n') }
     ` }
  </p>
  </div>
</div>
  ))
}




<div className={styles.buttonSection}>
  <button disabled={i===0} onClick={handlePrevious}>Previous Page</button>
  <button disabled={i>=length-10} onClick={handleNext}>Next Page</button>
</div>
  </div>






    )
}


export default Blog;
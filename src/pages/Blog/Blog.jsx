
import { blogAll } from "../../api/internal";
import{useState,useEffect} from "react";
import Loader from "../../components/Loader/Loader.jsx";
import styles from "./Blog.module.css"
import { useNavigate } from "react-router-dom";


function Blog(){
 const navigate=useNavigate()


    const[blogs,setBlogs]=useState([])
    useEffect(() => {
    (async _=>{
    
      let response=  await blogAll() 

        if(response.status===200){
          setBlogs(response.data.blogs)
        }
    
    
    })();
    
    
    
    setBlogs([])
    
    
    
    }, [])
  
    



    if(blogs.length===0){
      return (
        <Loader text="Blogs" />
      )
    }

    return (
  <div className={styles.blogsWrapper}>
{
  blogs.map((blog)=>(
<div className={styles.blog} onClick={_=>navigate(`/blog/${blog._id}`)}>
<h2 className={styles.title}>{blog.title}</h2>
<img className={styles.photo} src={blog.photo} />
<p className={styles.content}>
  {blog.content}
</p>
</div>

  ))
}
  </div>
    )
}


export default Blog;

import { blogAll } from "../../api/internal";
import{useState,useEffect} from "react";
import Loader from "../../components/Loader/Loader.jsx";
import styles from "./Blog.module.css"
import { useNavigate } from "react-router-dom";


function Blog(){

  // navigate to the specific blog post detail page
  const navigateToBlogDetail=(blogId)=>()=>{
    navigate(`/blog/${blogId}`)
  }

 const navigate=useNavigate()
const blogStyle=(url)=>{
  return {
    background: `url(${url})`,
    backgroundPosition:"center",
    backgroundRepeat:"no-repeat",
    backgroundSize:"cover",

  }
}

    const[blogs,setBlogs]=useState([])
    const [content,setContent]=useState("")
  
    useEffect(() => {
    (async()=>{
    
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
    console.log(blogs)

    return (
      <div className={styles.main} >
        <div className={styles.sideBar} >
          <h2 className={styles.sideHeading}>Categories</h2>

          <ul className={styles.sideList} >
            <li className={styles.sideItem}>All</li>
            <li className={styles.sideItem}>Technology</li>
            <li className={styles.sideItem}>Life Style</li>
            <li className={styles.sideItem}>Travel</li>
            <li className={styles.sideItem}>Food</li>
            <li className={styles.sideItem}>Finance</li>
            <li className={styles.sideItem}>Education</li>
            <li className={styles.sideItem}>Business</li>
            <li className={styles.sideItem}>Arts and Culture</li>
            <li className={styles.sideItem}>Parenting</li>
            <li className={styles.sideItem}>Sports</li>
            <li className={styles.sideItem}>Environment</li>
            <li className={styles.sideItem}>Politics</li>
            <li className={styles.sideItem}>Health and Wellness</li>
            <li className={styles.sideItem}>Entertainment</li>
            <li className={styles.sideItem}>Science</li>
          </ul>

        </div>
        
        <div className={styles.blogsWrapper}>
        <input type ="text" placeholder=" Search blog post " className={styles.searchBar} />
      {
          blogs.map((blog)=>(

          <div key={blog._id} className={styles.blog} onClick={navigateToBlogDetail(blog._id)}>
            <div className={styles.photoCover} style={blogStyle(blog.photo)}>
            </div>
            <div className={styles.textCover}>
              <h2 className={styles.title}>{blog.title}</h2>
              <p className={styles.description}>
                
                {
              `${blog.description.replace(/\|n\|/g,'\n') }
                 `}
              </p>
            </div>
          </div>
    ))
}

      </div>
  </div>






    )
}


export default Blog;
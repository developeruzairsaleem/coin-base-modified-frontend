import { blogAll } from "../../api/internal";
import { useState, useEffect } from "react";
import Loader from "../../components/Loader/Loader.jsx";
import styles from "./Blog.module.css"
import { useNavigate } from "react-router-dom";
import ProfilePhoto from "../../components/ProfilePhoto/ProfilePhoto";
import SearchBlog from "../../components/SearchBlog/SearchBlog"

function Blog() {

    // author image size 
    // constant size of image on every blog author
    const IMAGE_SIZE = {
        width: "40px",
        height: "40px",
        fontSize: "17px",
    };

    const categories = ["all", "technology", "life style", "travel", "food", "finance", "education","business","arts and culture","parenting", "sports", "environment", "politics", "health and wellness", "entertainment", "science"];

    // navigate to the specific blog post detail page
    const navigateToBlogDetail = (blogId) => () => {
        navigate(`/blog/${blogId}`)
    }

    const navigate = useNavigate()
    const blogStyle = (url) => {
        return {
            background: `url(${url})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",

        }
    }

    const [blogs, setBlogs] = useState([]);
    const [content, setContent] = useState("");
    const [searchString, setSearchString] = useState("");
    const [activeCategory, setActiveCategory] =  useState("all");

    useEffect(() => {
        (async () => {

            let response = await blogAll()

            if (response.status === 200) {
                console.log(response.data.blogs);
                setBlogs(response.data.blogs)
            }


        })();



        setBlogs([])



    }, [])


    const handleSearchClick=(searchValue)=>{
      setSearchString(searchValue);
    }

    const handleCategoryClick=(category)=>{
      setActiveCategory(category)
    }




    if (blogs.length === 0) {
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
          {
            categories.map(category=>{
              return <li onClick={_=> handleCategoryClick(category)} className={`${styles.sideItem} ${activeCategory===category?"bg-blue-50":""}`}>{category}</li>
            })
          }
          </ul>

        </div>
        
        <div className={styles.blogsWrapper}>
        <SearchBlog handleClick={handleSearchClick}/>
      {
          blogs
          .filter((blog)=>{
            return blog.title.toLowerCase().includes(searchString.toLowerCase())
          })
          .map((blog)=>(
          <div key={blog._id} className={styles.blog}>

            <div className={styles.textCover}>
             <div className={`${styles.author}`} >
                  <ProfilePhoto photo={blog.authorProfilePhoto} name={blog.authorUsername} size ={IMAGE_SIZE}/>
                  <p className={styles.authorUsername}>{blog.authorUsername} - <span className={styles.blogCreatedAt}>{new Date(blog.createdAt).toLocaleDateString("en-US",{
                    month:"long",
                    day:"2-digit",
                    year:"numeric"
                  })}</span></p>
                <div className="bg-gray-200  ml-auto text-gray-500 p-1 text-sm rounded-lg"> {'Technology'} </div>
                
              </div>
              <h2 className={`${styles.title} mt-5 mb-5`}>{blog.title}</h2>
              <div className={styles.buttonCover} >
                <button onClick={navigateToBlogDetail(blog._id)} className={styles.readButton}>{"Continue Reading"}</button>
              </div>

            </div>
            <div className={styles.photoCover} style={blogStyle(blog.photo)}>
            </div>
            </div>
    ))
}

      </div>
  </div>






    )
}


export default Blog;
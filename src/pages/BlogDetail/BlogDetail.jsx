import styles from "./BlogDetail.module.css"
import { getBlogById, postComment, deleteBlog, getCommentsById } from "../../api/internal";
import { useState, useEffect} from "react"
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../../components/Loader/Loader";
import CommentsList from "../../components/CommentsList/CommentsList.jsx"

function BlogDetail(){


    
    const[blog,setBlog]=useState([])
    const [comments, setComments]= useState([])
const [owns, setOwns]= useState(false)
const [newComment, setNewComment]= useState("")
const [reload,setReload]= useState(false);
const navigate = useNavigate()

const params = useParams()
const blogId = params.id 

const username= useSelector((state)=>state.user.username)
const userId  = useSelector((state)=>state.user._id)



const handlePostComment= async()=>{

    const data= {
        author:userId,
        content:newComment,
        blog:blogId
    }

  let response= await postComment(data)
  if(response.status===201){
    setNewComment("")
    setReload(!reload)

  }

}

const handleDeleteBlog= async ()=>{

      let response =  await deleteBlog(blogId)
if(response.status===200){
    navigate("/")
}

    
}



    useEffect(()=>{
    ( async _=>{

        const commentResponse= await getCommentsById(blogId)

        if(commentResponse.status===200){
            setComments(commentResponse.data.data)
console.log(commentResponse.data.data)
        }


        const blogResponse = await getBlogById(blogId)
        if(blogResponse.status===200){
            setBlog(blogResponse.data.blog)
            console.log(blogResponse.data.blog)
             setOwns(username===blogResponse.data.blog.authorUsername)

        }
    })()



    },[reload])




if(blog.length===0){
    return (
        <Loader text="blog details" />
    )
}


return(
    <div className={styles.wrapper} >

    <div className={styles.left}>
        <h1 className={styles.title}>{blog.title}</h1>
        <div className={styles.meta}>

        <p>@ {blog.authorUsername+ " on" + new Date(blog.createdAt).toDateString()}</p>
        </div>
        <div className={styles.photo}>
            <img src={blog.photo} width={250} height={250} />
        </div>

        <p className={styles.content}>{blog.content}</p>
        {
            owns && (
                <div className={styles.buttonWrapper}>
                    <button className={styles.edit} onClick={()=>{
                        navigate("/blog-update/"+blog._id)
                    }}>Edit</button>
                    <button onClick={handleDeleteBlog} className={styles.delete}>Delete</button>
                </div>
            )
        }
    </div>

    <div className={styles.right}>
        <div className={styles.commentsWrapper}>
        <CommentsList comments={comments} />
        <div className={styles.postComment}>
        <input
         className={styles.input}
         placeholder={"your comment goes here"}
         value={newComment}
         onChange={(e)=>setNewComment(e.target.value)}
          />
        <button className={styles.postCommentButton} onClick={handlePostComment} > Post</button>
        </div>
        </div>
    </div>



    </div>
)    
}


export default BlogDetail;
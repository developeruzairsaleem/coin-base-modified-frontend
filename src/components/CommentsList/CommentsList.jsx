import styles from "./CommentsList.module.css"
import Comment from "../Comment/Comment.jsx"
function CommentsList({comments}){


    return(

        <div className={styles.commentsListWrapper}>
        <div className={styles.commentsList}>


        {
          comments.length===0?(
            <div className={styles.noComments}>No comments posted</div>
          ):
          comments.map((comment)=>(
           <Comment key={comment._id} comment={comment} />
          ))
        
          
        }
        </div>
        </div>
    )







}

export default CommentsList;
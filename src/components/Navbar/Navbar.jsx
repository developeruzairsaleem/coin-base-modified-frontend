import {NavLink} from "react-router-dom";
import styles from "./Navbar.module.css"
import { useSelector } from "react-redux";
import {signout} from "../../api/internal.js"
import { resetUser } from "../../store/userSlice";
import { useDispatch } from "react-redux";
import ProfilePhoto from "../ProfilePhoto/ProfilePhoto.jsx"
function Navbar(){


const IMAGE_SIZE={
    width:"50px",
    height:"50px",
    fontSize:"17px"
}
const dispatch=useDispatch()
    const handleSignout= async()=>{

         await signout()
        dispatch(resetUser())


    }
const isAuthenticated= useSelector(state=>state.user.auth);
    return (
        <>
            <nav className={styles.navbar}>
                <div className={styles.left}>
            <NavLink to="/" className={`${styles.logo} ${styles.inActiveStyle}`}>{"Coin Bounce"}</NavLink>

                </div>
                <div className={styles.center}>

            <NavLink to ="/" className={({isActive})=> isActive?styles.activeStyle:styles.inActiveStyle}>Home</NavLink>
            <NavLink to="crypto" className={({isActive})=>isActive?styles.activeStyle:styles.inActiveStyle}>CryptoCurrencies</NavLink>
            
            
            <NavLink to={isAuthenticated?"blogs":"login"} className={({isActive})=>isActive&&isAuthenticated?styles.activeStyle:styles.inActiveStyle}>
                   Blogs
              
            </NavLink>
            

            <NavLink to={isAuthenticated?"submit":"login"}  className={({isActive})=>isActive&&isAuthenticated?styles.activeStyle:styles.inActiveStyle}>
                Submit a blog
               
            </NavLink>
                </div>

                <div className={styles.right}>

            {isAuthenticated?<NavLink ><button onClick={handleSignout} className={styles.logoutButton} >Logout</button></NavLink>:<><NavLink to="login" className={({isActive})=>isActive?styles.activeStyle:styles.inActiveStyle}><button className={styles.logInButton} >Login</button></NavLink>
            <NavLink to="signup" className={({isActive})=>isActive?styles.activeStyle:styles.inActiveStyle}><button className={styles.signUpButton} >Signup</button></NavLink>
            </>}
            <ProfilePhoto name={"Uzair"} photo={"https://avatars.githubusercontent.com/u/119891591?v=4"} size={IMAGE_SIZE}/>
            <ProfilePhoto name={"Saleem"} photo={""} size={IMAGE_SIZE}/>


                </div>
            </nav>
            <div className={styles.separator}>

            </div>
        </>
    )
}


export default Navbar;
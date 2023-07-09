import {NavLink} from "react-router-dom";
import styles from "./Navbar.module.css"
import { useSelector } from "react-redux";
import {signout} from "../../api/internal.js"
import { resetUser } from "../../store/userSlice";
import { useDispatch } from "react-redux";
function Navbar(){

const dispatch=useDispatch()
    const handleSignout= async()=>{

         await signout()
        dispatch(resetUser())


    }
const isAuthenticated= useSelector(state=>state.user.auth);
    return (
        <>
            <nav className={styles.navbar}>
            <NavLink to="/" className={`${styles.logo} ${styles.inActiveStyle}`}>Coin Base</NavLink>
            <NavLink to ="/" className={({isActive})=> isActive?styles.activeStyle:styles.inActiveStyle}>Home</NavLink>
            <NavLink to="crypto" className={({isActive})=>isActive?styles.activeStyle:styles.inActiveStyle}>CryptoCurrencies</NavLink>
            <NavLink to="blogs" className={({isActive})=>isActive?styles.activeStyle:styles.inActiveStyle}>Blogs</NavLink>
            <NavLink to="submit" className={({isActive})=>isActive?styles.activeStyle:styles.inActiveStyle}>Submit a blog</NavLink>
            {isAuthenticated?<NavLink ><button onClick={handleSignout} className={styles.logoutButton} >Logout</button></NavLink>:<><NavLink to="login" className={({isActive})=>isActive?styles.activeStyle:styles.inActiveStyle}><button className={styles.logInButton} >Login</button></NavLink>
            <NavLink to="signup" className={({isActive})=>isActive?styles.activeStyle:styles.inActiveStyle}><button className={styles.signUpButton} >Signup</button></NavLink>
            </>}</nav>
            <div className={styles.separator}>

            </div>
        </>
    )
}


export default Navbar;
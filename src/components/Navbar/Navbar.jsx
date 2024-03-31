import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useSelector } from "react-redux";
import { signout } from "../../api/internal.js";
import { resetUser } from "../../store/userSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfilePhoto from "../ProfilePhoto/ProfilePhoto.jsx";
import ProfileMenu from "../ProfileMenu/ProfileMenu.jsx";

function Navbar() {
  // constant size of image in the navigation bar we might have to change it for other authors in the blog page
  const IMAGE_SIZE = {
    width: "40px",
    height: "40px",
    fontSize: "17px",
  };
  const navigate = useNavigate();

  // state for togglig the menubar for showing or hiding the profile menu
  const [menuActive, setMenuActive] = useState(false);

  // getting the current user info from redux reducer from store folder
  const {
    auth: isAuthenticated,
    profilePhoto,
    name,
  } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  // signing out the user
  const handleSignout = async () => {
    // signing out the user by clearing cookies and removing user state from backend
    await signout();
    dispatch(resetUser());
  };

  // togging the menu bar  of user profile icon in the navigation menu
  const handlePhotoClick = () => {
    console.log("Clicked");
    setMenuActive(!menuActive);
  };
  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.left}>
          <NavLink to="/" className={`${styles.logo} ${styles.inActiveStyle}`}>
            Coin<span className="text-blue-500">Bounce</span>
          </NavLink>
        </div>
        <div className={styles.center}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? styles.activeStyle : styles.inActiveStyle
            }
          >
            Home
          </NavLink>
          <NavLink
            to="crypto"
            className={({ isActive }) =>
              isActive ? styles.activeStyle : styles.inActiveStyle
            }
          >
            CryptoCurrencies
          </NavLink>

          <NavLink
            to={isAuthenticated ? "blogs" : "login"}
            className={({ isActive }) =>
              isActive && isAuthenticated
                ? styles.activeStyle
                : styles.inActiveStyle
            }
          >
            Blogs
          </NavLink>

          <NavLink
            to={isAuthenticated ? "submit" : "login"}
            className={({ isActive }) =>
              isActive && isAuthenticated
                ? styles.activeStyle
                : styles.inActiveStyle
            }
          >
            Submit a blog
          </NavLink>
        </div>

        <div className={styles.right}>
          {isAuthenticated ? (
            <>
              <div className="relative">
                <ProfilePhoto
                  name={name}
                  photo={profilePhoto}
                  size={IMAGE_SIZE}
                  onClick={handlePhotoClick}
                />
                <ProfileMenu
                  handleLogout={handleSignout}
                  handleProfile={(_) => {
                    navigate("/profileupdate");
                    handlePhotoClick();
                  }}
                  handleClick={handlePhotoClick}
                  menuActive={menuActive}
                />
              </div>
            </>
          ) : (
            <>
              <NavLink
                to="login"
                className={({ isActive }) =>
                  isActive ? styles.activeStyle : styles.inActiveStyle
                }
              >
                <button className={styles.logInButton}>Login</button>
              </NavLink>
              <NavLink
                to="signup"
                className={({ isActive }) =>
                  isActive ? styles.activeStyle : styles.inActiveStyle
                }
              >
                <button className={styles.signUpButton}>Signup</button>
              </NavLink>
            </>
          )}
        </div>
      </nav>
      <div className={styles.separator}></div>
    </>
  );
}

export default Navbar;

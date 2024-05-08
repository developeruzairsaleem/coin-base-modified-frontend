import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Home from "./pages/Home/Home.jsx";
import Error from "./pages/Error/Error.jsx"
import Login from "./pages/Login/Login.jsx"
import Signup from "./pages/Signup/Signup.jsx"
import styles from "./App.module.css";
import Crypto from "./pages/Crypto/Crypto.jsx";
import Protected from "./components/Protected/Protected.jsx";
import Blog from "./pages/Blog/Blog.jsx";
import Create from "./pages/Create/Create.jsx";
import { useSelector } from "react-redux";
import BlogDetail  from "./pages/BlogDetail/BlogDetail.jsx";
import UpdateBlog from "./pages/UpdateBlog/UpdateBlog.jsx";
import Loader from "./components/Loader/Loader.jsx";
import useAutoLogin from "./hooks/useAutoLogin.js";
import ProfileUpdate from "./pages/ProfileUpdate/ProfileUpdate.jsx";
function App() {
  const isAuth= useSelector(state=>state.user.auth);
  const loading = useAutoLogin();
  return loading?(<Loader text = "..." />) :(

    <div className={styles.container}>
      <BrowserRouter>
        <div className={styles.layout}>
          <Navbar />

          <Routes>

            <Route
              path="/"
              exact
              element={
                <div className={styles.main}>
                  <Home  />
                </div>
              }
            />

            <Route
              path="profileupdate"
              exact
              element={
                <Protected isAuth={isAuth}>

                  <div className={styles.main}>
                    <ProfileUpdate  />
                  </div>

                </Protected>
              }
            />

            <Route
              path="submit"
              exact
              element={
                <Protected isAuth={isAuth}>

                <div className={styles.main}>
                  <Create/>
                </div>
                </Protected>
              }
            />


            <Route
              path="login"
              exact
              element={
                <div className={styles.main}>
                  <Login/>
                </div>
              }
            />
            <Route
              path="logout"
              exact
              element={
                <div className={styles.main}>
                  logout page
                </div>
              }
            />





            <Route
              path="signup"
              exact
              element={
                <div className={styles.main}>
               <Signup/>
                </div>
              }
            />


            <Route
              path="blogs"
              exact
              element={
                <Protected isAuth={isAuth}>


                <div className={styles.main}>
                  <Blog/>
                </div>
                </Protected>
              }
            />



          <Route
              path="blog/:id"
              exact
              element={
                <Protected isAuth={isAuth}>


                <div className={styles.main}>
                  <BlogDetail/>
                </div>
                </Protected>
              }
            />


          <Route
              path="/blog-update/:id"
              exact
              element={
                <Protected isAuth={isAuth}>


                <div className={styles.main}>
                  <UpdateBlog/>
                </div>
                </Protected>
              }
            />
            <Route
              path="crypto"
              exact
              element={
                <div className={styles.main}>
                  <Crypto />
                </div>
              }
            />


              <Route path="*" element={
                <div className={styles.main} >
                  <Error/>
                </div>
              } />






          </Routes>

          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

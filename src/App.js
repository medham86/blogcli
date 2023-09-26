import * as React from "react";
import {useEffect} from "react";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header";
import BlogDetails from "./pages/BlogDetails";
import Blogs from "./pages/Blogs";
import CreateBlog from "./pages/CreateBlog";
import Login from "./pages/Login";
import LogOut from "./pages/LogOut";
import Register from "./pages/Register";
import UserBlogs from "./pages/UserBlogs";
import { Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "./redux/reducers/user";

const App = () => {
  const isLogin = useSelector((state) => state.user.isLogin);
  const user = useSelector((state) => state.user.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);
  return (
    <>
      <Header />
      <ToastContainer />

      <Routes>
        <Route path="/" element={<Blogs />} />
        {isLogin && user.isAdmin && <Route path="/blogs" element={<Blogs />} />}
        {isLogin && <Route path="/my-blogs" element={<UserBlogs />} />}
        {isLogin && <Route path="/blog-details/:id" element={<BlogDetails />} />}
        {isLogin && <Route path="/create-blog" element={<CreateBlog />} />}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<LogOut />} />
        <Route path="*" element={<Blogs />} />
      </Routes>
    </>
  );
};

export default App;

import React, { useEffect } from 'react'
import { fetchAdminBlogs } from '../redux/reducers/blogs'
import { useDispatch, useSelector } from 'react-redux'
import Api from '../config/api'
import BlogCard from "../components/BlogCard";
import { notifyError } from '../config/notify';
import domain from '../config/domain';

const Blogs = () => {

  const dispatch = useDispatch();

  const blogs = useSelector((state)=>state.blogs.alldata)

  useEffect(()=>{
    dispatch(fetchAdminBlogs())
  },[])
  return (
    <div>
      {blogs.length >= 0
        ? blogs.map((blog) => {
            return (
              <BlogCard key={blog._id}
                id={blog._id}
                title={blog.title}
                content={blog.content}
                image={blog.image}
                time={blog.date}
                username={blog?.owner?.fname}
               
              />
            );
          })
        : notifyError("No blogs found")}
    </div>
  )
}

export default Blogs

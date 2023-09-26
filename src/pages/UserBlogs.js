import React, { useEffect } from "react";
import { notifyError } from "../config/notify";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserBlogs } from "../redux/reducers/blogs";
import { useNavigate } from "react-router-dom";

import BlogCard from "../components/BlogCard";

export default function UserBlogs() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const data = useSelector((state) => state.blogs.data);

  useEffect(() => {
    dispatch(fetchUserBlogs());
  }, [dispatch]);

  return (
    <>
      {data.length >= 0
        ? data.map((blog) => {
            return (
              <BlogCard key={blog._id}
                id={blog._id}
                title={blog.title}
                content={blog.content}
                image={blog.image}
                time={blog.date}
                isUser={true}
                username={blog?.owner?.fname}
              />
            );
          })
        : notifyError("No blogs found")}
    </>
  );
}

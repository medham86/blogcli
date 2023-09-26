import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchUserBlogs } from '../redux/reducers/blogs'
import defaultImage from "../images/blog3.jpg";
import { notifyError, notifySuccess } from '../config/notify'
import {
  MDBInput,
  MDBBtn,
  MDBTextArea,
  MDBCardImage,
  MDBCard,
} from "mdb-react-ui-kit";
import Api from '../config/api'
import domain from './../config/domain';

const BlogDetails = () => {
  const {id} = useParams();
  const imageRef = useRef();
  const dispatch = useDispatch()

  const [imageData , setImageData]=useState(null)
  
  const [inputs, setInputs] = useState({
    title: "",
    content: "",
    image: null,
  });

  const blogs = useSelector((state)=>state.blogs.data)

  const blogData =blogs.find((ele)=>ele._id === id)

 

 
const handleChanges = (e) => {
  setInputs((prevState) => ({
    ...prevState,
    [e.target.name]: e.target.value,
  }));
};

const uploadImage = () => {
  imageRef.current.click();
};

const fileUpload =(e)=>{
  const image = e.target.files[0] ;
  setImageData(image)
}
const handleSubmit = (e) => {
  e.preventDefault();
  
  try {
    Api.patch("/blog", {...inputs, image:imageData||inputs.image},{
      headers : {
        "Content-Type" : "multipart/form-data"
      }
    })
      .then(() => {
        notifySuccess("blog updated successifuly");
        
        setInputs({
          title: "",
          content: "",
          image: null,
        })

      })
      .catch((err) => {
        const errorMsg =
          err?.response?.data?.message || err?.response?.data?.error;
        notifyError(errorMsg);
      });
  } catch (err) {
    notifyError(err);
  }
};

useEffect(()=>{
  dispatch(fetchUserBlogs())
  setInputs(blogData)
},[id,dispatch])

return (
  <form className="w-50 mx-auto mt-5" onSubmit={handleSubmit}>
    <MDBInput
      name="title"
      value={inputs?.title}
      onChange={handleChanges}
      type="text"
      id="form4Example1"
      wrapperClass="mb-4"
      label="Title"
    />

    <MDBTextArea
      name="content"
      value={inputs?.content}
      onChange={handleChanges}
      wrapperClass="mb-4"
      textarea
      id="form4Example3"
      rows={5}
      label="Content"
    />
    <input
      name="image"
      onChange={fileUpload}
      style={{ display: "none" }}
      ref={imageRef}
      type="file"
      id="form4Example1"
      wrapperClass="mb-4"
    />
    <MDBCard >
      <MDBCardImage className="rounded" height="300px"  src={(imageData && URL.createObjectURL(imageData))||(domain + inputs?.image) || defaultImage} alt="blogImage" />
    </MDBCard>

    <MDBBtn type="button" className="my-2" block onClick={uploadImage}>
      Upload image
    </MDBBtn>

    <MDBBtn type="submit" className="mb-2" block>
      Save Edit
    </MDBBtn>
  </form>
);
}

export default BlogDetails

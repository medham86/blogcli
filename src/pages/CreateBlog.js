import React, { useRef, useState } from "react";
import {
  MDBInput,
  MDBBtn,
  MDBTextArea,
  MDBCardImage,
  MDBCard,
  MDBIcon
  
} from "mdb-react-ui-kit";
import { notifyError, notifySuccess } from "../config/notify";
import Api from "../config/api";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../redux/reducers/user";
import { useNavigate } from "react-router-dom";
import defaultImage from "../images/blog3.jpg";
import { fetchUserBlogs } from "../redux/reducers/blogs";

const CreateBlog = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const imageField = useRef();
  const [inputs, setInputs] = useState({
    title: "",
    content: "",
    image: null,
  });

  const handleChanges = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      Api.post("/blog", inputs,{
        headers : {
          "Content-Type" : "multipart/form-data"
        }
      })
        .then(() => {
          notifySuccess("blog created successifuly");
          setInputs({
            title: "",
            content: "",
            image: null,
          })

          dispatch(fetchUserBlogs());
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

  const uploadImage = () => {
    imageField.current.click();
  };

  const fileUpload =(e)=>{
    const image = e.target.files[0] ;
    setInputs({...inputs,image})
  }
  return (
    <form className="w-50 mx-auto mt-5" onSubmit={handleSubmit}>
      <MDBInput
        name="title"
        value={inputs.title}
        onChange={handleChanges}
        type="text"
        id="form4Example1"
        wrapperClass="mb-4"
        label="Title"
      />

      <MDBTextArea
        name="content"
        value={inputs.content}
        onChange={handleChanges}
        wrapperClass="mb-4"
        textarea
        id="form4Example3"
        rows={5}
        label="Content"
      />
      <MDBInput
        name="image"
        // value={inputs.image}
        onChange={fileUpload}
        style={{ display: "none" }}
        ref={imageField}
        type="file"
        id="form4Example1"
        wrapperClass="mb-4"
      />
      <MDBCard >
        <MDBCardImage className="rounded" height="300px"  src={(inputs.image && URL.createObjectURL(inputs.image)) || defaultImage} alt="blogImage" />
      </MDBCard>

      <MDBBtn type="button" className="my-2" block onClick={uploadImage}>
        Upload image
      </MDBBtn>

      <MDBBtn type="submit" className="mb-2" block>
        Create Blog
      </MDBBtn>
    </form>
  );
};

export default CreateBlog;

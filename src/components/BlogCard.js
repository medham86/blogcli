import React, { useEffect } from "react";
import Api from "../config/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchUserBlogs } from "../redux/reducers/blogs";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
  MDBIcon,
} from "mdb-react-ui-kit";
import domain from "../config/domain";
import { notifyError, notifySuccess } from "../config/notify";

const BlogCard = ({ title, content, id, time, image, isUser, username }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserBlogs());
  }, [dispatch]);

  const handleEdit = () => {
    navigate(`/blog-details/${id}`);
  };

  const handleDelete = async () => {
    try {
      await Api.delete(`/blog/${id}`)
        .then(() => {
          notifySuccess("Blog deleted");
          dispatch(fetchUserBlogs());
        })
        .catch((error) => {
          const errorMsg =
            error?.response?.data?.message || error?.response?.data?.error;
          notifyError(errorMsg);
        });
    } catch (err) {
      notifyError(err);
    }
  };

  return (
    <>
      <MDBCard className="w-50 mx-auto mt-5 h-25">
        <div className="d-flex justify-content-between p-2">
          <h6 className="mt-2"> {`Creater : ${username}`} </h6>
          <h6 className="mt-2">{time}</h6>
        </div>
        {isUser && (
          <div className="d-flex justify-content-end p-2">
            <div className="d-grid gap-2 d-md-flex justify-content-md-end ">
              <MDBBtn floating tag="a" onClick={handleEdit}>
                <MDBIcon fas icon="pen" />
              </MDBBtn>
              <MDBBtn color="danger" floating tag="a" onClick={handleDelete}>
                <MDBIcon fas icon="trash-alt" />
              </MDBBtn>
            </div>
          </div>
        )}
        <MDBCardImage
          style={{ height: 300 }}
          src={domain + image}
          className="img-thumbnail"
          alt="..."
        />
        <MDBCardBody>
          <MDBCardTitle>{title}</MDBCardTitle>
          <MDBCardText>{content}</MDBCardText>
        </MDBCardBody>
      </MDBCard>
    </>
  );
};

export default BlogCard;

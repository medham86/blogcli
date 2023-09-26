import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import Api from "./../config/api";
import { notifyError, notifySuccess } from '../config/notify';

import {
  MDBInput,
  MDBCol,
  MDBRow,
  MDBCheckbox,
  MDBBtn,
  MDBIcon,
} from "mdb-react-ui-kit";

export default function Register() {
 
  const navigate = useNavigate();

  const [loading , setLoading] = useState(false)

  const [inputs, setInputs] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    rePassword: "",
  });

  const handleChanges = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true)

    try {
      if (inputs.password !== inputs.rePassword) {
        notifyError("password does not match");
        setLoading(false)
      } else {
        Api.post('/auth/signup', inputs)
          .then(() => {
            notifySuccess("register success")
            navigate('/login')
            setLoading(false)
        })
          .catch((err) => {
            const errorMsg = err?.response?.data?.message || err?.response?.data?.error
            notifyError(errorMsg)
            setLoading(false)
          });
      }
    } catch (err) {
      notifyError(err);
     
    }
  };
  return (
    <form onSubmit={handleSubmit} className="w-50 mx-auto mt-5">
      <MDBRow className="mb-4">
        <MDBCol>
          <MDBInput
            name="fname"
            value={inputs.fname}
            id="form3Example1"
            label="First name"
            onChange={handleChanges}
          />
        </MDBCol>
        <MDBCol>
          <MDBInput
            name="lname"
            value={inputs.lname}
            id="form3Example2"
            label="Last name"
            onChange={handleChanges}
          />
        </MDBCol>
      </MDBRow>
      <MDBInput
        name="email"
        value={inputs.email}
        className="mb-4"
        type="email"
        id="form3Example3"
        label="Email address"
        onChange={handleChanges}
      />
      <MDBInput
        name="password"
        value={inputs.password}
        className="mb-4"
        type="password"
        id="form3Example4"
        label="Password"
        onChange={handleChanges}
      />
      <MDBInput
        name="rePassword"
        value={inputs.rePassword}
        className="mb-4"
        type="password"
        id="form3Example5"
        label="rePassword"
        onChange={handleChanges}
      />
      <MDBBtn type="submit" className="mb-4" block disabled={loading}>
        Register
      </MDBBtn>
    </form>
  );
}

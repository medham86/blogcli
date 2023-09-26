import React, { useEffect, useState } from "react";
import {
  MDBInput,
  MDBCol,
  MDBRow,
  MDBCheckbox,
  MDBBtn,
  MDBIcon,
} from "mdb-react-ui-kit";
import { notifyError, notifySuccess } from "../config/notify";
import { useNavigate } from "react-router-dom";
import Api from "../config/api";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../redux/reducers/user";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

 

  const handleChanges = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name] : e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      Api.post("/auth/login", inputs)
        .then(() => {
          notifySuccess("login success");
          navigate("/my-blogs");
          setLoading(false);
          dispatch(fetchUserData())
        })
        .catch((err) => {
          const errorMsg =
            err?.response?.data?.message || err?.response?.data?.error;
          notifyError(errorMsg);
          setLoading(false);
        });
    } catch (err) {
      notifyError(err);
    }
  };



  return (
    <form className="w-50 mx-auto mt-5" onSubmit={handleSubmit}>
      <MDBInput
        name="email"
        value={inputs.email}
        onChange={handleChanges}
        className="mb-4"
        type="email"
        id="form2Example1"
        label="Email address"
      />
      <MDBInput
        name="password"
        value={inputs.password}
        onChange={handleChanges}
        className="mb-4"
        type="password"
        id="form2Example2"
        label="Password"
      />

      <MDBRow className="mb-4">
        <MDBCol className="d-flex justify-content-center">
          <MDBCheckbox id="form2Example3" label="Remember me" defaultChecked />
        </MDBCol>
        <MDBCol>
          <a href="#!">Forgot password?</a>
        </MDBCol>
      </MDBRow>

      <MDBBtn disabled={loading} type="submit" className="mb-4" block>
        Sign in
      </MDBBtn>

      <div className="text-center">
        <p>
          Not a member? <a href="#!">Register</a>
        </p>
        <p>or sign up with:</p>

        <MDBBtn floating color="secondary" className="mx-1">
          <MDBIcon fab icon="facebook-f" />
        </MDBBtn>

        <MDBBtn floating color="secondary" className="mx-1">
          <MDBIcon fab icon="google" />
        </MDBBtn>

        <MDBBtn floating color="secondary" className="mx-1">
          <MDBIcon fab icon="twitter" />
        </MDBBtn>

        <MDBBtn floating color="secondary" className="mx-1">
          <MDBIcon fab icon="github" />
        </MDBBtn>
      </div>
    </form>
  );
}

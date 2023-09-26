import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData, logoutUser } from "../redux/reducers/user";
import blogimg from '../images/icons8.svg'
function Header() {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.user.isLogin);
  const user = useSelector((state) => state.user.data);

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);
  return (
    <>
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          {/* <Link to="/" className="text-decoration-none text-light"> */}
            <Navbar.Brand><img src={blogimg} alt="logo"/>BLOGS</Navbar.Brand>
          <Nav className="me-auto">

            {isLogin && user.isAdmin && <Link to="blogs">
              <Button>Blogs</Button>
            </Link>}
            {isLogin && (
              <>
                <Link to="/my-blogs">
                  <Button>My-Blogs</Button>
                </Link>
                <Link to="create-blog">
                  <Button>Create-Blog</Button>
                </Link>
              </>
            )}
          </Nav>
          <Nav className="mx-auto">
            {!isLogin && (
              <>
                <Link to="login">
                  <Button>Login</Button>
                </Link>
                <Link to="/register">
                  <Button>Register</Button>
                </Link>
              </>
            )}

            {isLogin && (
              <Link to="logout">
                <Button onClick={()=>dispatch(logoutUser())}>Log Out</Button>
              </Link>
            )}
          </Nav>
        </Container>
      </Navbar>

      <br />
    </>
  );
}

export default Header;

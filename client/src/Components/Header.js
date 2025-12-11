import {Link, useNavigate } from "react-router-dom";
import logo from "../Images/logo-t.png";
import { Navbar,Nav,NavItem } from "reactstrap";
import { logout } from "../Feature/UserSlice";
import { useDispatch } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout=async () =>{
      dispatch(logout());

    await new Promise((resolve) => setTimeout(resolve, 100));}
  return (
<>
<Navbar>
  <Nav>
    <NavItem>
      <Link  href="#">< img src={logo} className="userImage" ></img></Link>
      </NavItem>
        <NavItem>
          <Link to="/">Home</Link>
          </NavItem>
          <NavItem>
          <Link to="/profile">profile</Link>
            </NavItem>
            <NavItem>
          <Link onClick={handleLogout}>Logout</Link>
              </NavItem>
              </Nav>
              </Navbar>
</>

  );
};

export default Header;

import {
  Button,Container,Row,FormGroup,form,Input,Col,Label} from "reactstrap";
import { useState } from "react";
import {Link} from "react-router-dom";
import logo from "../Images/logo-t.png";
import { login } from "../Feature/UserSlice";
import {useEffect} from "react";
import { useNavigate } from "react-router-dom";

import {useDispatch,useSelector } from "react-redux"; //useDispatch= call function


const Login = () => {
  const [email,setemail]= useState("");
  const [password,setpassword]= useState("");  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state)=>state.user.user);
  const isSuccess = useSelector((state) => state.user.isSuccess);
  const isError = useSelector((state) => state.user.isError);
 useEffect(() => {
  if (isSuccess) {
    navigate("/");
  }

  if (isError) {
    alert("Invalid login");
  }
}, [isSuccess, isError]);


  const handleLogin=()=>
  {
    const userData=
    {
      email,
      password,
    }
          dispatch(login(userData))
  }


  return (
    <div>
      <Container>
        <form>
          <Row >
            <Col md={3}>
              <img src ={logo}/>
            </Col>
          </Row>
          <Row>
            <Col md={3}>
            <FormGroup floating>
              <Label for="email">
                Email
              </Label>
              <Input 
              id="email"
              name="email"
              placeholder="Enter your email "
              type="email"
              onChange={(e) => setemail(e.target.value)}
              />          
            </FormGroup>
            </Col>
            </Row>
            <Row>
              <Col md={3}>
              <FormGroup>
                <Label for="password">
                  Password
                  </Label>
                  <Input 
                  id="password"
                  name="password"
                  placeholder="Enter your password "
                  type="password"
                  onChange={(e) => setpassword(e.target.value)}
                  />  
              </FormGroup>
              </Col>
              </Row>
              <Row>
                <Col md={3}>
                <Button
                color="primary"
                className="button"
                onClick={() => handleLogin()}
              >
                Sign in
              </Button>
                </Col>
              </Row>
                    </form>
                    <p className="small text">
                      No Account? <Link to ="/register">Sign Up now.</Link>
                      </p>
                      </Container>
                      </div>
                      );
};

export default Login;

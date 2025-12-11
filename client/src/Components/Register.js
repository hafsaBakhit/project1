import { userSchemaValidation } from '../validation/UserValidation.js';
import {useSelector,useDispatch} from "react-redux"; //useDispatch= call function
import { Button,Container,Row,Form,Input,Col} from "reactstrap";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useState} from "react";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { addUser,deleteUser,registerUser } from '../Feature/UserSlice.js';
import { useNavigate } from "react-router-dom";

const Register = () => {
  const userlist = useSelector((state)=> state.user.value);
  const dispatch =useDispatch();
  const navigate = useNavigate()
  const [name,setname]= useState("");  
  const [email,setemail]= useState("");
  const [password,setpassword]= useState("");  
  const [confirmPassword,setconfirmPassword]= useState("");  


  const {
    register,
    handleSubmit, 
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchemaValidation), 
  });

    const handleDelete = (email) => {
    dispatch(deleteUser(email));
  };

    const onSubmit = (data) => {
      try{
        const usersdata={
          name:data.name,
          email:data.email,
          password:data.password
        }
        dispatch(registerUser(usersdata));
      }
      catch(error)
      {
        console.log(error);
           }
    console.log("Form Data", data); 
      alert("Validation all good.")   
      navigate("/login") 
    
     
    };
  return (
    <Container fluid>
      <Row className="formrow">
        <Col className="column div1" lg="6">
        {/*Execute first thr submitForm function and if vallidation is good execute the handleSubmit sunction*/}
        <Form className="div-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="appTitle"></div>
            <section className="form">
              <div>
            <input 
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter your name "
            {...register("name", {
              onChange: (e) => setname(e.target.value),
            })} 
            />
            <p className="error">{errors.name?.message}</p>

                      </div>

             <div className="from-group">
            <input 
            type="text"
            className="form-control"
            id="email"
            placeholder="Enter your email "
            {...register("email",{
              onChange: (e) => setemail(e.target.value),
            })}
            />
             <p className="error">{errors.email?.message}</p>
          </div>


          <div className="from-group">
           <input 
           type="password"
           className="form-control"
           id="password" 
           placeholder="Enter your password"
           {...register("password",{
              onChange: (e) => setpassword(e.target.value),
            })}
           />

             <p className="error">{errors.password?.message}</p>
          </div>
          <div className="from-group">
            <input 
            type="text"
            className="form-control"
            id="password"
            placeholder="Enter your password "
            {...register("confirmPassword",{
              onChange: (e) => setconfirmPassword(e.target.value),
            })}
            />
            <p className="error">{errors.confirmPassword?.message}</p>
          </div>
          <Button color="primary" className="button">Register</Button>
          </section>
        </Form>
        </Col>
        <Col className="column div2" lg="6">
        </Col>
      </Row>
      <Row>
        <Col md={6}>
        <h2></h2>
        {/*<table>
          <tbody>
            <tr>
              <th>Name</th>
              <th>email</th>
              <th>password</th>
            </tr>
            {userlist.map((user)=>(
              <tr key={user.email}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>
              <Button onClick={() => handleDelete(user.email)}>delete</Button>
              </td>
              <td>
              <Link to={`/update/${user.email}/${user.name}/${user.password}`}>
      <Button color="primary">Update User</Button>
</Link></td>

              </tr>
            ))}
          </tbody>
        </table>*/}
        </Col>
      </Row>
    </Container>
  );
};

export default Register;

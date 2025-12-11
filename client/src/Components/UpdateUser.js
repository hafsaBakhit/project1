import { useParams } from "react-router-dom";
import { Button,Container,Row,Form,input,Col} from "reactstrap";
import { updateUser } from "../Feature/UserSlice";
import{useDispatch} from "react-redux";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useState} from "react";
import { userSchemaValidation } from '../validation/UserValidation.js';


function UpdateUser ()
{
    
    const { user_email, user_name, user_password } = useParams();
    const [name, setname] = useState(user_name);
    const [email, setemail] = useState(user_email);
    const [password, setpassword] = useState(user_password);
    const [confirmPassword, setconfirmPassword] = useState(user_password);
    const dispatch=useDispatch();

    const {
        register,
        handleSubmit, 
        formState: { errors },
      } = useForm({
        resolver: yupResolver(userSchemaValidation), 
      });
    const handleUpdate=()=>
        {
            try{
            const userData = {
              name: name, 
              email: email,
              password: password,
            };
          dispatch(updateUser(userData)); 
          alert("Validation all good.")
          }
          catch(error)
          {
            console.log(error);
          }
      }
 return(
 <Container fluid>
      <Row className="formrow">
        <Col className="column div1" lg="6">
        {/*Execute first thr submitForm function and if vallidation is good execute the handleSubmit sunction*/}
        <form className="div-form" onSubmit={handleSubmit(handleUpdate)}>
        <div className="appTitle"></div>
            <section className="form">
              <div>
            <input 
            type="text"
            value={name}
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
            <input readOnly 
            type="text"
            value={email}
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
           value={password}
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
            value={confirmPassword}
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
        </form>
        
        </Col>
       
      </Row>
     
    </Container>
        
  
 );
};

export default UpdateUser;
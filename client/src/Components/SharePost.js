import {Button, Container, Row,FormGroup,Form,Input,} from "reactstrap";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { savePost } from "../Feature/PostSlice";

const SharePosts = () => {
const [postMsg, setpostMsg] = useState("");
const navigate = useNavigate();
const dispatch = useDispatch();
const email = useSelector((state) => state.user.user.email) 
const handlePost = async () => {
    
    if (!postMsg.trim()) {
      alert("Post message is required."); 
    }

    const postData = {
      postMsg: postMsg,
      email: email,
    };

    dispatch(savePost(postData)); 
setpostMsg(""); 

  };

  return (

<Container>
  <Row>
    <Form>
      <FormGroup>
        <Input 
        id="share"
        name="share"
        type="textarea"
        value={postMsg}
        onChange={(e)=>setpostMsg(e.target.value)}
        />
        <br></br>
        <Button onClick={()=>handlePost()}> PostIT</Button>
        </FormGroup>
        </Form>
        </Row>
    </Container> 
 );
};

export default SharePosts;

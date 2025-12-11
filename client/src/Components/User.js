import userimg from "../Images/user.png";
import { useSelector } from "react-redux";
import Location from "../Location";



const User = () => {
  const user    = useSelector((state) => state.user.user);
  const email   = useSelector((state)=>state.user.user?.email);
  const name    = useSelector((state)=>state.user.user?.name);
  const picURL  = useSelector((state)=>state.user.user?.profilePic);

  
  if (!user) {
    return <p>Loading...</p>; 
  }
  console.log(picURL);
  return (
    <div>
       <img
        src={"http://localhost:3001/uploads/" + picURL}
        alt={user}
        className="userImage"
      />
      <p>{name}</p>
      <p>{email}</p>
      <Location/>
    </div>
  );
};

export default User;

import React from "react";
import userImage from '../Images/user.png';

const About = () => {
  return (
    <div>
      <h1>About this project</h1>
      <p>UTAS-ibra</p>
      <p>Full-Stack</p>
      <img src={userImage} alt="devimage" className="userImage" />
      <button>Contact Us</button>
    </div>
  );
};

export default About;

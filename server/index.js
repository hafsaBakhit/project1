import mongoose from "mongoose";
import express from "express"; // comunicate with backend mongodb
import cors from "cors";
import UserModel from "./Models/UserModel.js";
import bcrypt from "bcrypt";
import PostModel from "./Models/Posts.js";
import fs from "fs";
import multer from "multer";
import { fileURLToPath } from "url";
import { dirname } from "path";

const app = express ();
app.use(express.json());
app.use(cors());
// Set up multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Specify the directory to save uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Unique filename
  },
});
// Create multer instance
const upload = multer({ storage: storage });


const connectString="mongodb+srv://admin:123admin@postitcluster.ay2cvjv.mongodb.net/postITDb?appName=PostITCluster";

mongoose.connect(connectString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//==========================================
app.put(
  "/updateUserProfile/:email/",
  upload.single("profilePic"), // Middleware to handle single file upload
  async (req, res) => {
    const email = req.params.email;
    const name = req.body.name;
    const password = req.body.password;

    try {
      const userToUpdate = await UserModel.findOne({ email: email });

      if (!userToUpdate) {
        return res.status(404).json({ error: "User not found" });
      }
      let profilePic = null;
      if (req.file) {
        profilePic = req.file.filename; // Filename of uploaded file
        // Update profile picture if a new one was uploaded but delete first the old image
        if (userToUpdate.profilePic) {
          const oldFilePath = path.join(
            __dirname,
            "uploads",
            userToUpdate.profilePic
          );
          fs.unlinke(oldFilePath, (err) => {
            if (err) {
              console.error("Error deleting file:", err);
            } else {
              console.log("Old file deleted successfully");
            }
          });
          userToUpdate.profilePic = profilePic; // Set new profile picture path
        }
      } else {
        console.log("No file uploaded");
      }

      // Update user's name
      userToUpdate.name = name;

      // Hash the new password and update if it has changed
      if (password !== userToUpdate.password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        userToUpdate.password = hashedPassword;
      } else {
        userToUpdate.password = password; // Keep the same password if unchanged
      }

        // Save the updated user information to the database
      await userToUpdate.save();

      // Send the updated user data and a success message as a response
      res.send({ user: userToUpdate, msg: "Updated." });
    } catch (err) {
      // Handle any errors during the update process
      res.status(500).json({ error: err.message });
    }
  }
);

      //==================================

app.post ("/login",async(req,res)=>{
  try{
    console.log(req.body);

    const email = req.body.email;
    const password = req.body.password;
    const user = await UserModel.findOne({email:email});
    if (!user){
      return res.status(500).json({error: "user not found"})
    }
    console.log(user);
    const passwordMatch = await bcrypt.compare(password,user.password);  
        if (!passwordMatch) 
          {
      return res.status(401).json({ error: "Authentication failed" });
    }

    res.status(200).json({ user, message: "Success." });
  } catch (err) {
    res.status(500).json({ user,error: err.message });
  }
});

app.post("/registerUser", async(req,res)=>{
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const hashedpassword = await bcrypt.hash(password, 10);
    const user = new UserModel({
      name: name,
      email: email,
      password: hashedpassword,
    });
    await user.save();
    res.send({user: user, msg: "Added."});
  } catch (error){
    res.status(500).json({error: "An error occurred"});
  }
  
})
app.post("/logout", async (req, res) => {
  res.status(200).json({ message: "Logged out successfully" });
});



app.post("/savePost", async (req, res) => {
  try {
    const postMsg = req.body.postMsg;
    const email = req.body.email;

    const post = new PostModel({
      postMsg: postMsg,
      email: email,
    });

    await post.save();
    res.send({ post: post, msg: "Added." });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});


app.get("/getPosts", async (req, res) => {
  try {
    const posts = await PostModel.find({}).sort({ createdAt: -1 });

    const countPost = await PostModel.countDocuments({});

    res.send({ posts: posts, count: countPost });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred" });
  }
});
//=========================================

/*app.get("/getPosts", async (req, res) => {
  try {
    // Fetch all posts from the "PostModel" collection, sorted by createdAt in descending order
    const posts = await PostModel.find({}).sort({ createdAt: -1 });

    const countPost = await PostModel.countDocuments({});

    res.send({ posts: posts, count: countPost });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred" });
  }
});*/


app.listen(3001, ()=>{
    console.log("server connected");

})

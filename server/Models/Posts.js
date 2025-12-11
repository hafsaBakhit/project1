import mongoose  from "mongoose";
 const PostSchema = mongoose.Schema(
    {
        postMsg:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            required:true,
        },
        likes:{
            type:String,
            required:true,
            default:0,
        },
        users:{
            type:[String],
            default:[],

        },
    },
 )
 const PostModel = mongoose.model("posts", PostSchema);

export default PostModel;

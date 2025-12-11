import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  posts: [],
  comments: [],
  likes: [],
};
export const savePost = createAsyncThunk(
  "posts/savePost",
   async (postData) => {
        try{
            const response  = await axios.post('http://localhost:3001/savePost', {
      postMsg: postData.postMsg,
      email: postData.email,
    });
    const post = response.data.post;
    return post;

        }catch (error){
          console.log(error);
        }
      }
    );

    export const getPosts = createAsyncThunk("post/getPosts", async () => {
  try {
    const response = await axios.get("http://localhost:3001/getPosts");
    return response.data.posts;
  } catch (error) {
    console.log(error);
  }
});

//=================================================

    const PostSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(savePost.pending, (state) => {state.status = "loading";
      })
      .addCase(savePost.fulfilled, (state, action) => {console.log(action.payload);state.status = "succeeded";state.posts.unshift(action.payload);
      })
      .addCase(savePost.rejected,(state,action)=> {state.status = "failed";state.error=action.error.message;
        });
 
      builder
      .addCase(getPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Update the state with fetched posts
        console.log(action.payload);
        state.posts = action.payload;
      })
            .addCase(getPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
})

export default PostSlice.reducer;






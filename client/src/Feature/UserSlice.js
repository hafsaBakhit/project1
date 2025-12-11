import { createSlice, createAsyncThunk  } from "@reduxjs/toolkit";
import { usersdata } from "../ExampleData";
import axios from"axios";
const initialState = {
  user: {},
  isLoading: false,
  isSuccess: false,
  isError: false,
};
//=====================================
export const updateUserProfile = createAsyncThunk(
  "user/updateUserProfile",
  async(userData) => {
    try{
    const response = await axios.put(
      `http://localhost:3001/updateUserProfile/${userData.email}`, 
      {
        email:userData.email,
        name: userData.name,
        password: userData.password,
        profilePic: userData.profilePic,
      },
      {
        header:{
          "content-type":"multipart/from-data",
        },
      }
    );
      const user = response.data.user;
      return user;
    } catch (error) {
      // Log any errors that occur during the request
      console.log(error);
    }
      }
)
//==========================================
export const registerUser = createAsyncThunk
  ("users/registerUser",
    async(userData)=>{
      try{
        const response = await
        axios.post("http://localhost:3001/registerUser", 
          {
            name:userData.name,
            email:userData.email,
            password:userData.password,
      })
              console.log(response);
      const user = response.data.user; 
      return user;

     } catch(error) {
        console.log(error)
      }
    }
)
export const login = createAsyncThunk("users/login", async (userData) => {
  try {
    const response = await axios.post("http://localhost:3001/login", {
      email: userData.email,
      password: userData.password,
    });

    const user = response.data.user;
    console.log(response);
    return user;
  } catch (error) {
    const errorMessage = "Invalid credentials";
    alert(errorMessage);
    throw new Error(errorMessage);
  }
});
export const logout = createAsyncThunk("users/logout", async () => {
  try {
    const response = await axios.post("http://localhost:3001/logout");
  } catch (error) {}
});


export const userSlice = createSlice({

    name: "users",
    initialState,
    reducers: {
        addUser   :  (state,action) =>
        {
            state.value.push(action.payload);
        },
        deleteUser   :  (state,action) =>
            {
            state.value=state.value.filter((user) =>
                 user.email !== action.payload);
        },
        updateUser: (state, action) => {
          const idx =  state. value.findIndex(
            (user)=>user.email === action.payload.email
          );
        if (idx!== -1){ state.value [idx] = {... state.value[idx], ...action.payload};
      
        }
      }

        
      },
      extraReducers: (builder) => { builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = true;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
      })
    
      .addCase(login.pending, (state) => {state.isLoading = true;})
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
         state.isSuccess = true;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = {};
        state.isLoading = false;
        state.isSuccess = false;
      })
      .addCase(logout.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
    
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(updateUserProfile.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
    },
    
});


export const {addUser} = userSlice.actions;
export const {deleteUser} = userSlice.actions;
export const {updateUser} = userSlice.actions;



export default userSlice.reducer;
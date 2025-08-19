import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
      id: "",
      picture: "",
      name: "",
        email: "",
    isAuthenticated: false,
    StarredSnippets: [],
  },
  reducers: {
    setUser: (state, action) => {
      const { id, picture, name, email } = action.payload;
      state.id = id;
      state.picture = picture;
      state.name = name;
      state.email = email;
      state.isAuthenticated = true;
    },
    setStarredSnippets: (state, action) => {
      state.StarredSnippets = action.payload;
    },
    logoutUser: (state) => {
        state.id = "";
        state.picture = "";
        state.name = "";
        state.email = "";
        state.isAuthenticated = false;
    },
  },
});

export const { setUser, setStarredSnippets, logoutUser } = userSlice.actions;
export default userSlice.reducer;
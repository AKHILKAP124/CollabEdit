import { createSlice } from "@reduxjs/toolkit";

const snippetSlice = createSlice({
  name: "snippet",
  initialState: {
    snippets: [],
  },
  reducers: {
    addSnippets: (state, action) => {
      state.snippets = action.payload;
    }
  },
});

export const { addSnippets } = snippetSlice.actions;
export default snippetSlice.reducer;
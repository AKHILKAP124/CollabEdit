import axios from "axios";

const dispatch = require("redux").dispatch;

export const getUserStarredSnippets = async (userId) => {
  try {
      await axios.get(`/api/v1/snippet/user/${userId}/starred`)
          .then((res) => {
              if (res.status === 200) {
              dispatch({
                  type: 'user/setStarredSnippets',
                  payload: res.data,
              });
              return res.data;
          }
      } );
  } catch (error) {
    console.error("Error fetching user starred snippets:", error);
    throw error;
    
  }
}



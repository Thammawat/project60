export const getUserData = (data, token) => (
  (dispatch) => {
    console.log("action")
    dispatch({type: 'GET_USER_DATA' , userData: data , userToken: token});
  }
);

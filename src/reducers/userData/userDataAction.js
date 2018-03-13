export const getUserData = (data, token) => (
  (dispatch) => {
    dispatch({type: 'GET_USER_DATA' , userData: data , userToken: token});
  }
);

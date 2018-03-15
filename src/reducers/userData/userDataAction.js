export const getUserData = (data, token) => (
  (dispatch) => {
    console.log(data);
    console.log(token);
    dispatch({type: 'GET_USER_DATA' , userData: data , userToken: token});
  }
);

export const getCurrentMember = ( data ) => (
  (dispatch) => {
    dispatch({type: 'GET_CURRENT_MEMBER', currentMember: data});
  }
);

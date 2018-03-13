const initialState = {
  userData: null,
  userToken: null,
};

const roadDataReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'GET_USER_DATA':
      console.log("reducer")
      return Object.assign({}, state, { userData: action.userData, userToken: action.userToken });
    default:
      return state;
  }
};

export default roadDataReducer;

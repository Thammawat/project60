const initialState = {
  userData: {
    firstname: localStorage.getItem('firstname'),
    lastname: localStorage.getItem('lastname'),
    username: localStorage.getItem('username'),
    status: localStorage.getItem('status'),
  },
  userToken: localStorage.getItem('token'),
  currentMember: {},
};

const roadDataReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'GET_USER_DATA':
      console.log(action.userToken);
      return Object.assign({}, state, { userData: action.userData, userToken: action.userToken });
    case 'GET_CURRENT_MEMBER':
      return Object.assign({}, state, { currentMember: action.currentMember });
    default:
      return state;
  }
};

export default roadDataReducer;

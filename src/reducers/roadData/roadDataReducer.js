const initialState = {
  roadData: "Hello",
};

const roadDataReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'INITIAL_DATA':
      return Object.assign({}, state, { roadData: action.roadData });
    default:
      return state;
  }
};

export default roadDataReducer;

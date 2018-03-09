export const InitialData = (data) => (
  (dispatch) => {
    console.log("action WOW")
    dispatch({type: 'INITIAL_DATA' , roadData: data});
  }
);

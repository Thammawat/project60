export const InitialData = (data) => (
  (dispatch) => {
    dispatch({type: 'INITIAL_DATA' , roadData: data});
  }
);

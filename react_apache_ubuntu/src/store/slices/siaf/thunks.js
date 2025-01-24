import { resetCurrentSecuencia, setCurrentExped, setCurrentSecuencia } from "./siafSlice"



export const setCurrentExpedThunk = (expedData) => {
    return async (dispatch) => {
      dispatch(setCurrentExped({ currentExped: expedData }));
    };
  };
  
  export const addPropertyCurrentExpedThunk = (property) => {
    return async (dispatch, getState) => {      
      const { currentExped } = getState().siaf;
  
      const updatedExped = { ...currentExped, ...property };
  
      dispatch(setCurrentExped({ currentExped: updatedExped }));
    };
  };

  export const setCurrentSecuenciaThunk = (secuenciaData) => {
    return async (dispatch) => {
      dispatch(setCurrentSecuencia({ currentSecuencia: secuenciaData }));
    };
  };

  export const resetCurrentSecuenciaThunk = () => {
    return async (dispatch) => {
      dispatch(resetCurrentSecuencia());
    }
  };

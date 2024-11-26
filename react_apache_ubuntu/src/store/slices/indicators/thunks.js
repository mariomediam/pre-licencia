import { setSelectedYear } from "./indicatorsSlice";

export const setSelectedYearThunk = (year) => (dispatch) => {    
    dispatch(setSelectedYear(year));
};


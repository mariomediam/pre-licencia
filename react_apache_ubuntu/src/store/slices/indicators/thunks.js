import { setSelectedType, setSelectedYear } from "./indicatorsSlice";

export const setSelectedYearThunk = (year) => (dispatch) => {    
    dispatch(setSelectedYear(year));
};

export const setSelectedTypeAndYearThunk = (type, year) => (dispatch) => {    
    dispatch(setSelectedYear(year));
    dispatch(setSelectedType(type));
}

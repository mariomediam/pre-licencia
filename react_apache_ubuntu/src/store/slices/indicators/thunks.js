import { setCurrentYear } from "./indicatorsSlice";

export const setCurrentYearThunk = (year) => (dispatch) => {
    dispatch(setCurrentYear(year));
};


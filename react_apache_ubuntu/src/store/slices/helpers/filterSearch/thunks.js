import { initialFilterSearch, setFilterSearch} from "./filterSearchSlice"

export const updateFilterSearch = (filterSearch) => {
    return async (dispatch, getState) => {
        dispatch(setFilterSearch(filterSearch));
    }
}


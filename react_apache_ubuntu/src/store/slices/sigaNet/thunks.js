import { ejecucionDetallada } from "../../../services/tesoreroService";
import { finishLoadingSiga, setDetailedExecution, startLoadingSiga } from "./sigaSlice";

export const getDetailedExecution = (filters) => {

    return async (dispatch) => {
        try {
            
            dispatch(startLoadingSiga());
            
            const data = await ejecucionDetallada(filters);
            
            dispatch(setDetailedExecution({ detailedExecution: data }));
        } catch (error) {
            dispatch(finishLoadingSiga());
            throw error;
        }
    }
}

export const initValuesDetailedExecution = () => {
    return (dispatch) => {
        dispatch(setDetailedExecution({ detailedExecution: [] }));
    }
}

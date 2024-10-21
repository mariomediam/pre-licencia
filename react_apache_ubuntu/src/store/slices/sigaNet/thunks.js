import { ejecucionDetallada } from "../../../services/tesoreroService";
import { finishLoadingSiga, setDetailedExecution, startLoadingSiga } from "./sigaSlice";

export const getDetailedExecution = (filters) => {

    return async (dispatch) => {
        try {
            console.log("02")
            dispatch(startLoadingSiga());
            console.log("05")
            const data = await ejecucionDetallada(filters);
            console.log("08")
            
            dispatch(setDetailedExecution({ detailedExecution: data }));
        } catch (error) {
            dispatch(finishLoadingSiga());
            throw error;
        }
    }

}
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import { addPropertyCurrentExpedThunk } from "../../../../../store/slices/siaf/thunks";
import { obtenerExpedienteFase } from "../../../../../services/siafService";
import { AccrualFormatExpedItem } from "./AccrualFormatExpedItem";
import ExclamationCircleIcon from "../../../../../icons/ExclamationCircleIcon";

export const AccrualFormatStep1 = ({ expedErrors, setExpedErrors }) => {
  const dispatch = useDispatch();
  const { currentExped } = useSelector((state) => state.siaf);
  const { anioExped, numeroExped } = currentExped;
  const [isLoading, setIsLoading] = useState(false);

  const [expedFases, setExpedFases] = useState([]);

  useEffect(() => {
    if (numeroExped.length !== 10) {
      dispatch(
        addPropertyCurrentExpedThunk({
          numeroExped: numeroExped.padStart(10, "0"),
        })
      );
    }
  }, [numeroExped, dispatch]);

  useEffect(() => {
    const getExpediente = async () => {
      if (numeroExped.length === 10) {
        try {
          setIsLoading(true);
          console.log("loading");
          const data = await obtenerExpedienteFase({
            anio: anioExped,
            expediente: numeroExped,
            ciclo: "G",
            fase: "D",
          });          
          setExpedFases(data);
        } catch (error) {
          console.log("error", error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    getExpediente();
  }, [numeroExped, anioExped]);

  return (
    <div className="px-3">
      <small>
        Expediente {numeroExped} {anioExped}
      </small>
      {isLoading && (
        <div className="d-flex mt-2 justify-content-center align-items-center">
          <Spinner animation="border me-2" variant="primary" /> <small>Buscando devengados...</small>
        </div>
      )}

      {expedFases.map((item, index) => (
        <AccrualFormatExpedItem
          key={index}
          expedFase={item}
          setExpedErrors={setExpedErrors}
        />
      ))}
      {/* {
       <small className="text-danger"> {expedErrors.selectedSecuencia}</small>
      } */}

     



      {expedErrors.selectedSecuencia && (
        <small className="text-danger d-flex align-items-center">
          <ExclamationCircleIcon className="me-1" />
          {expedErrors.selectedSecuencia}
        </small>
      )}
    </div>
  );
};

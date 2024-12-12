import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addPropertyCurrentExpedThunk } from "../../../../../store/slices/siaf/thunks";
import { obtenerExpedienteFase } from "../../../../../services/siafService";
import { AccrualFormatExpedItem } from "./AccrualFormatExpedItem";
import ExclamationCircleIcon from "../../../../../icons/ExclamationCircleIcon";

export const AccrualFormatStep1 = ({ expedErrors, setExpedErrors }) => {
  const dispatch = useDispatch();
  const { currentExped } = useSelector((state) => state.siaf);
  const { anioExped, numeroExped } = currentExped;

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
        const data = await obtenerExpedienteFase({
          anio: anioExped,
          expediente: numeroExped,
          ciclo: "G",
          fase: "D",
        });
        console.log("first data", data);
        setExpedFases(data);
      }
    };
    getExpediente();
  }, [numeroExped, anioExped]);

  return (
    <div className="px-3">
      <small>
        Expediente {numeroExped} {anioExped}
      </small>
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

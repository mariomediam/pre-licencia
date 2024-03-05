import { useSelector, useDispatch } from "react-redux";
import { Form } from "react-bootstrap";

import { RequeElaboraStepItemsClasifComponent } from "./RequeElaboraStepItemsClasifComponent";
import { getTotalRequerimiento } from "../../../store/slices";

export const RequeElaboraStepPreviewComponent = () => {
  const dispatch = useDispatch();

  const { currentReque } = useSelector((state) => state.requerimiento);
  const {
    requeClasificadores = [],
    C_sf_dep,
    C_biesertipo,
    C_anipre,
    T_reque_obs,
  } = currentReque;

  const getTotal = () => {
    // Obtener la suma de los subtotales de los items
    const total = dispatch(getTotalRequerimiento());

    return total.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <small>
      <div className="d-flex justify-content-end align-items-center">
        <small className="text-muted pe-2">Total: </small>{" "}
        <h4> S/. {getTotal()}</h4>
      </div>
      {requeClasificadores.map((clasificador, i) => {
        return (
          <article key={i}>
            <RequeElaboraStepItemsClasifComponent
              clasificador={clasificador}
              C_sf_dep={C_sf_dep}
              C_biesertipo={C_biesertipo}
              C_anipre={C_anipre}
              accion={"preview"}
            />
          </article>
        );
      })}

      <h6 className="text-muted mb-0">Observaciones</h6>
      <p className="mt-0 pt-0">
        {T_reque_obs}
      </p>

      
    </small>
  );
};

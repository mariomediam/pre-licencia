import { useDispatch, useSelector } from "react-redux";
import { Table } from "react-bootstrap";
import { UbicacionListaItemComponent } from "./UbicacionListaItemComponent";
import { useEffect, useRef, useState } from "react";
import { getListarLicProvUbica } from "../../../store/slices";
import { useParams } from "react-router-dom";
import { UbicacionGestionaModalComponent } from "./UbicacionGestionaModalComponent";
import Loading from "../../Loading";

export const UbicacionListaComponent = ({ show, handleClose, handleShow }) => {
  const dispatch = useDispatch();
  const activeTrUbica = useRef();

  const { licProvUbica, currentLicProvUbica, isLoading } = useSelector(
    (state) => state.licProvUbica
  );

  const [activeUbicaId, setActiveUbicaId] = useState(0);

  const { tipo: tipoStr } = useParams();
  const tipo = parseInt(tipoStr);

  useEffect(() => {
    dispatch(getListarLicProvUbica(tipo));
  }, [dispatch, tipo]);

  useEffect(() => {
    if (activeUbicaId > 0 && activeTrUbica.current && !isLoading) {
      window.scrollTo({
        top: activeTrUbica.current.offsetTop,
        behavior: "smooth",
      });
      activeTrUbica.current.classList.add('animate__heartBeat');         
      activeTrUbica.current.classList.add('animate__slower');   
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeUbicaId]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="px-5">
      <small>{licProvUbica.length} registro(s) encontrado(s)</small>
      <div style={{ border: "1px solid lightgrey" }}>
        <Table
          responsive
          hover
          className="caption-top mb-1 animate__animated animate__fadeIn animate__faster"
        >
          <thead>
            <tr className="color-header1 text-white">
              <th className="text-center align-middle m-0 p-0">Id</th>
              <th className="text-center align-middle m-0 p-0">Código</th>
              <th className="text-center align-middle m-0 p-0">
                Ubicación propuesta
              </th>
              <th className="text-center align-middle m-0 p-0"></th>
              <th className="text-center align-middle m-0 p-0"></th>
            </tr>
          </thead>
          <tbody>
            {licProvUbica.map((ubicacion, i) => (
              <UbicacionListaItemComponent
                key={ubicacion.ubicaId}
                ubicacion={ubicacion}
                handleShow={handleShow}
                activeUbicaId={activeUbicaId}
                activeTrUbica={activeTrUbica}
              />
            ))}
          </tbody>
        </Table>
      </div>
      <UbicacionGestionaModalComponent
        show={show}
        handleClose={handleClose}
        active={currentLicProvUbica}
        setActiveUbicaId={setActiveUbicaId}
      />
    </div>
  );
};

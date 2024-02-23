import { useEffect } from "react";
import { useSelector } from "react-redux";

import { Card, Table } from "react-bootstrap";
import { RequeElaboraStepTareasItemSaldoDetComponent } from "./RequeElaboraStepTareasItemSaldoDetComponent";
import { useState } from "react";

export const RequeElaboraStepTareasItemSaldoComponent = ({
  C_secfun,
  actividad,
}) => {
  const { C_activpoi, N_activpoi_desc, C_depen, clasificadores } = actividad;

  const { currentReque } = useSelector((state) => state.requerimiento);
  const { requeClasificadores } = currentReque;
  const [clasificadoresChecked, setClasificadoresChecked] =
    useState(clasificadores);

  useEffect(() => {
    const clasificadoresTmp = clasificadores.map((clasificador, i) => {
      const { C_clapre, C_objpoi, C_metapoi } = clasificador;

      const elementoBuscado = {
        C_clapre: C_clapre,
        C_secfun: C_secfun,
        C_depen: C_depen,
        C_activpoi: C_activpoi,
        C_objpoi: C_objpoi,
        C_metapoi: C_metapoi,
      };

      const check = requeClasificadores.some(
        (elemento) =>
          JSON.stringify(elemento) === JSON.stringify(elementoBuscado)
      );

      clasificador.selecc = check;

      return clasificador;
    });

    setClasificadoresChecked(clasificadoresTmp);
  }, [C_secfun, C_activpoi, C_depen, clasificadores, requeClasificadores]);

  return (
    <Card className="mb-4">
      <Card.Header title={N_activpoi_desc?.trim()}>
        <p className="mb-0 text-truncate">
          <small className="text-muted">Tarea operativa: </small>
          <small>
            {C_activpoi} - {N_activpoi_desc?.trim()}
          </small>
        </p>
      </Card.Header>
      <Card.Body>
        <Table
          hover
          responsive
          size="sm"
          className="caption-top mb-1 animate__animated animate__fadeIn animate__faster"
        >
          <thead>
            <tr className="">
              <th className="align-middle m-0 p-0">
                <small className="text-muted">Clasificador</small>
              </th>
              <th>
                <small className="text-muted">Objetivo / Meta</small>
              </th>
              <th className="align-middle m-0 p-0">
                <small className="text-muted">Fuente / Recurso</small>
              </th>
              <th>
                <small className="text-muted text-end">Saldo</small>
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {clasificadoresChecked.map((clasificador, i) => (
              <tr key={i}>
                <RequeElaboraStepTareasItemSaldoDetComponent
                  C_secfun={C_secfun}
                  C_activpoi={C_activpoi}
                  C_depen={C_depen}
                  clasificador={clasificador}
                />
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

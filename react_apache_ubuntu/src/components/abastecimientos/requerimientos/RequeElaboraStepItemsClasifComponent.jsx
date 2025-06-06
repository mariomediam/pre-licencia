import { useState } from "react";
import { Card, Table } from "react-bootstrap";

import { RequeElaboraStepItemsClasifDetComponent } from "./RequeElaboraStepItemsClasifDetComponent";
import { RequeElaboraStepItemsAddComponent } from "./RequeElaboraStepItemsAddComponent";

export const RequeElaboraStepItemsClasifComponent = ({
  clasificador,
  C_sf_dep,
  C_biesertipo,
  C_anipre,
  accion = "",
  f_libre = ""
}) => {
  const [showAddItem, setShowAddItem] = useState(false);

  const handleCloseAddItem = () => setShowAddItem(false);
  const handleShowAddItem = () => setShowAddItem(true);

  const {
    C_clapre,
    C_secfun,
    C_activpoi,
    C_objpoi,
    C_metapoi,
    C_depen,
    items = [],
    N_clapre_desc,
    N_metapresup_desc,
    N_activpoi_desc,
  } = clasificador;

  const getTotal = () => {
    // Obtener la suma de los subtotales de los items
    let total = 0;
    items.forEach((item) => {
      total += item.Q_requedet_cant * item.Q_requedet_precio;
    });

    return total.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  if (accion !== "elaborar" && items.length === 0) {
    return <></>;
  }

  return (

    <div className="pb-4">
      <Card>
        <Card.Header>
          <div className="">
          <p className="m-0 p-0">
              <small className="text-muted">Clasificador: </small>
              {C_clapre} <small><small className="text-muted">{N_clapre_desc}</small></small>
            </p>
            <p className="m-0 p-0">
              <small className="text-muted">Secuencia funcional: {C_secfun} <small>{N_metapresup_desc}</small></small>
              
            </p>
            <p className="m-0 p-0">
              <small className="text-muted">Tarea operativa:  {C_activpoi} <small>{N_activpoi_desc}</small></small>
             
            </p>
           
            <p className="m-0 p-0">
              <small className="text-muted">Objetivo / Meta:  {C_objpoi} / {C_metapoi}</small>
             
            </p>
          </div>
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
                  <small className="text-muted">
                    {C_biesertipo === "01" ? "Bien" : "Servicio"}
                  </small>
                </th>
                <th className="text-end">
                  <small className="text-muted">Cantidad</small>
                </th>
                <th className="align-middle m-0 p-0 text-end">
                  <small className="text-muted ">Precio</small>
                </th>
                <th className="text-end">
                  <small className="text-muted">Sub total</small>
                </th>
                {accion === "elaborar" && (
                  <>
                    <th></th>
                    <th></th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {items.map((item, i) => (
                <tr key={i}>
                  <RequeElaboraStepItemsClasifDetComponent
                    item={item}
                    C_sf_dep={C_sf_dep}
                    C_biesertipo={C_biesertipo}
                    C_clapre={C_clapre}
                    C_secfun={C_secfun}
                    C_activpoi={C_activpoi}
                    C_objpoi={C_objpoi}
                    C_metapoi={C_metapoi}
                    C_depen={C_depen}
                    accion={accion}
                  />
                </tr>
              ))}

              <tr>
                <td></td>
                <td></td>
                <td className="align-middle">Total</td>
                <td className="align-middle text-end">{getTotal()}</td>
                {accion === "elaborar" && (
                  <>
                    <td></td>
                    <td className="text-end">
                      <button
                        className="btn btn-primary rounded-circle"
                        style={{ width: "45px", height: "45px" }}
                        title={`Agregar ${
                          C_biesertipo === "01" ? "bien" : "servicio"
                        }`}
                        onClick={handleShowAddItem}
                      >
                        <i className="fas fa-plus"></i>
                      </button>
                    </td>
                  </>
                )}
              </tr>

            </tbody>
          </Table>
        </Card.Body>
      </Card>
      <div>
        <RequeElaboraStepItemsAddComponent
          show={showAddItem}
          handleClose={handleCloseAddItem}
          clasificador={clasificador}
          C_biesertipo={C_biesertipo}
          C_anipre={C_anipre}
          f_libre={f_libre}
        />
      </div>
    </div>
  );
};

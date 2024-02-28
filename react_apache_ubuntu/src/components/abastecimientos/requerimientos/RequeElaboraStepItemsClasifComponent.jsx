import { Card, Table } from "react-bootstrap";
import { RequeElaboraStepItemsClasifDetComponent } from "./RequeElaboraStepItemsClasifDetComponent";
import { useState } from "react";
import { RequeElaboraStepItemsAddComponent } from "./RequeElaboraStepItemsAddComponent";

export const RequeElaboraStepItemsClasifComponent = ({
  clasificador,
  C_sf_dep,
  C_biesertipo,
  C_anipre,
}) => {
  const [showAddItem, setShowAddItem] = useState(false);

  const handleCloseAddItem = () => setShowAddItem(false);
  const handleShowAddItem = () => setShowAddItem(true);

  const { C_clapre, C_secfun, C_activpoi, C_objpoi, C_metapoi, items } =
    clasificador;

  return (
    <div>
      <Card>
        <Card.Header>
          <div className="d-flex flex-wrap gap-3 justify-content-between">
            <p className="m-0 p-0">
              <small className="text-muted">Secuencia funcional: </small>
              {C_secfun}
            </p>
            <p className="m-0 p-0">
              <small className="text-muted">Tarea operativa: </small>
              {C_activpoi}
            </p>
            <p className="m-0 p-0">
              <small className="text-muted">Clasificador: </small>
              {C_clapre}
            </p>
            <p className="m-0 p-0">
              <small className="text-muted">Objetivo / Meta: </small>
              {C_objpoi} / {C_metapoi}
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
                <th>
                  <small className="text-muted">Cantidad</small>
                </th>
                <th className="align-middle m-0 p-0">
                  <small className="text-muted">Precio</small>
                </th>
                <th>
                  <small className="text-muted text-end">Sub total</small>
                </th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, i) => (
                <tr key={i}>
                  <RequeElaboraStepItemsClasifDetComponent
                    item={item}
                    C_sf_dep={C_sf_dep}
                    C_biesertipo={C_biesertipo}
                  />
                </tr>
              ))}

              <tr>
                <td></td>
                <td></td>
                <td className="align-middle">Total</td>
                <td className="align-middle">0.0</td>
                <td></td>
                <td>
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
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      <div>
        <RequeElaboraStepItemsAddComponent
          show={showAddItem}
          handleClose={handleCloseAddItem}
          clasificador = {clasificador}
          C_biesertipo = {C_biesertipo}
          C_anipre = {C_anipre}
        />
      </div>
    </div>
  );
};

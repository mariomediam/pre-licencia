import { Table } from "react-bootstrap";
import { TributoContribEmisionItemComponent } from "./TributoContribEmisionItemComponent";

export const TributoContribEmisionComponent = ({
  C_Contrib,
  N_Contrib,
  C_TipOpe,
  N_TipOpe,
  listTributo,
}) => {  
  return (
    <>
      <small>
        <small className="text-muted">
          {" "}
          {C_Contrib} {N_Contrib} / {N_TipOpe}
        </small>
      </small>
      <div style={{ border: "1px solid lightgrey" }} className="mt-2">
        <Table
          hover
          responsive
          size="sm"
          className="caption-top mb-1 animate__animated animate__fadeIn animate__faster"
        >
          <thead>
            <tr
              className="color-header2 text-white"
              style={{ fontSize: "14px" }}
            >
              <th className="align-middle m-0"></th>

              <th className="align-middle m-0" style={{ fontWeight: "100" }}>
                Partida
              </th>
              <th
                className="text-end align-middle m-0"
                style={{ fontWeight: "100" }}
              >
                Cta Contable
              </th>
              <th className="text-end pe-3" style={{ fontWeight: "100" }}>
                Monto
              </th>
            </tr>
          </thead>
          <tbody>
            {listTributo.map((tributo, index) => (
              <TributoContribEmisionItemComponent
                key={`${tributo.C_Archivo}_${tributo.C_OpeFin}`}
                tributo={tributo}
              />
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

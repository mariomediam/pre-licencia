import { Table } from "react-bootstrap";
import { DetailedExecutionSiganetItem } from "./DetailedExecutionSiganetItem";
import { DownloadExecution } from "./DownloadExecution";

export const DetailedExecutionSiganet = ({ data = [] }) => {
  return (
    <div style={{ minWidth: "992px" }}>
      {data?.length > 0 && (
        <div
          className="d-flex justify-content-end mb-3"
          style={{ marginTop: "-45px" }}
        >
          <DownloadExecution source="siga.net" />
        </div>
      )}

      <div
        style={{ border: "1px solid lightgrey" }}
        className="table-responsive"
      >
        <Table
          size="sm"
          hover
          responsive
          className="caption-top mb-1 animate__animated animate__fadeIn animate__faster"
        >
          <thead>
            <tr className="color-header2 text-white">
              <th className="align-middle m-0">
                <small>Expediente</small>
              </th>
              <th className="align-middle m-0" title="Ciclo / Fase">
                <small>C / F</small>
              </th>
              <th
                className=" align-middle m-0 p-0"
                title="Rubro / Tipo de recurso"
              >
                <small>Rb / Tr</small>
              </th>
              <th className=" align-middle m-0 p-0">
                <small>Documento</small>
              </th>
              <th className=" align-middle m-0 p-0">
                <small>Presupuestal</small>
              </th>
              <th className=" align-middle m-0 p-0">
                <small>Proveedor</small>
              </th>
              <th className=" align-middle m-0 p-0">
                <small>Importe</small>
              </th>
              <th className=" align-middle m-0 p-0">
                <small>Glosa</small>
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((record, index) => (
              <DetailedExecutionSiganetItem key={index} record={record} />
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

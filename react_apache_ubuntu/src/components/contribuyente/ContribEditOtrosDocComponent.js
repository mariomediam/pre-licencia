import { Form, Table, Button } from "react-bootstrap";

export const ContribEditOtrosDocComponent = ({ valores, setField, errors }) => {
  return (
    <div>
      <div>
        {/* ------------------ DOCUMENTOS -------------------*/}
        <Form.Group md="6" controlId="id_direccLote">
          <Form.Label className="text-muted mb-0 mt-0">
            <small className="mb-0">Documentos</small>
            <Button
                className="ms-2"
              variant="outline-dark"
              size="sm"
              title="Agregar documento"
            >
              <i className="fas fa-plus"></i>
            </Button>
          </Form.Label>
          <Table hover className="caption-top mb-1">
            <thead>
              <tr className="color-header1 text-white">
                <th className="text-center align-middle m-0 p-0">Tipo</th>
                <th className="text-center align-middle m-0 p-0">Número</th>
                <th className="text-center align-middle m-0 p-0"></th>
              </tr>
            </thead>
            <tbody>
              {valores.documentos.map((documento, i) => (
                <tr key={documento.CodDoc}>
                  <td>{documento.Descripción}</td>
                  <td>{documento.Número}</td>
                  <td className="d-flex justify-content-end">
                    <Button
                      //   href={`/pre_licencia_ver/${soliciPrecalif.precalId}`}

                      variant="outline-danger"
                      size="sm"
                      title="Eliminar documento"
                    >
                      <i className="fas fa-trash-alt"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Form.Control.Feedback type="invalid">
            {errors.direccLote}
          </Form.Control.Feedback>
        </Form.Group>
      </div>
    </div>
  );
};

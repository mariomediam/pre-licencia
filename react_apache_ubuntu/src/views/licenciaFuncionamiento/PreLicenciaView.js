import Header from "../../components/Header";
import { Table, Button, Form, InputGroup, FormControl } from "react-bootstrap";

export default function PreLicenciaView() {
  return (
    <div>
      <Header />

      <div className="container">
        <div className="row justify-content-center">
          <div
            className="align-items-center p-2 col-sm-12 col-lg-8"
            style={{ border: "0px solid black" }}
          >
            <h3 className="mt-0 text-center">
              <i className="fas fa-store me-3"></i>
              Pre Licencia de Funcionamiento
            </h3>
            <div className="row mt-4">
              <div className="col-12 col-sm-6">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label className="fw-bold">Mostrar</Form.Label>
                  <Form.Select aria-label="Default select example">
                    <option>Pendientes</option>
                    <option value="1">Aprobados</option>
                    <option value="2">Rechazados</option>
                    <option value="3">Todos</option>
                  </Form.Select>
                </Form.Group>
              </div>
              <div className="col-12 col-sm-6">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label className="fw-bold">Buscar</Form.Label>
                  <InputGroup className="mb-3">
                    <FormControl
                      // placeholder="Recipient's username"
                      // aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                    />
                    <Button variant="outline-secondary" id="button-addon2" title="Buscar">
                      <i className="fas fa-search"></i>
                    </Button>
                  </InputGroup>
                </Form.Group>
              </div>
            </div>
            <div>
              <Table bordered hover>
                <thead>
                  <tr className="color-header1 text-white">
                    <th>#</th>
                    <th>Código</th>
                    <th>Solicitante</th>
                    <th>Estado</th>
                    <th>Ver</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>00001</td>
                    <td>DEDIOS SAAVEDRA-JORGE ANTONIO</td>
                    <td>Pendiente</td>
                    <td>
                      <Button href="/pre_licencia_ver" variant="success" size="sm" title="Ver solicitud">
                        <i className="fas fa-eye"></i>
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>00002</td>
                    <td>DEDIOS SAAVEDRA-JORGE ANTONIO</td>
                    <td>Rechazado</td>
                    <td>
                      <Button href="/pre_licencia_ver" variant="success" size="sm" title="Ver solicitud">
                        <i className="fas fa-eye"></i>
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

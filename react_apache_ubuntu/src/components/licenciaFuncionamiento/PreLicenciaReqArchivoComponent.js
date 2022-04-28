import { useState, useEffect } from "react";
import { obtenerReqArchivoPorPrecalId } from "../../services/licFuncService";
import { Navbar, Container, Table, Button } from "react-bootstrap";

export const PreLicenciaReqArchivoComponent = ({ precalId }) => {
  const [requisitoArchivo, setRequisitoArchivo] = useState([]);
  const urlDownloadRequisitoArchivo = `${process.env.REACT_APP_API}/licfunc/view/requisito-archivo/`;
 console.log(urlDownloadRequisitoArchivo)
  const verRequisitoArchivo = async () => {
    const reqArchivoTmp = await obtenerReqArchivoPorPrecalId("01", precalId);
    setRequisitoArchivo(reqArchivoTmp);
  };

  useEffect(() => {
    verRequisitoArchivo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [precalId]);

  return (
    <>
      {requisitoArchivo.length > 0 && (
        <div>
          <div
            className="mt-2 color-header1"
            style={{ border: "1px solid rgb(40, 116, 166)" }}
          >
            <Navbar className="color-header1" variant="dark">
              <Container fluid>
                <Navbar.Brand href="#home">
                  <i className="fa fa-paperclip me-2"></i>Requisitos presentados
                  por el ciudadano
                </Navbar.Brand>
              </Container>
            </Navbar>
          </div>
          <div
            className="px-2"
            style={{ border: "1px solid rgb(40, 116, 166)" }}
          >
            <Table bordered hover className="mt-3">
              <thead>
                <tr>
                  <th>Requisito</th>
                  <th>Folios</th>
                  <th>Ver</th>
                </tr>
              </thead>
              <tbody>
                {requisitoArchivo.map(
                  (
                    {
                      N_ReqTup_Item,
                      N_ReqTup_descrip,
                      numeroFolio,
                      ruta,
                      C_FileFirma,
                      N_FileFirma_Nombre,
                      N_FileFirma_Ruta,
                      idRequisitoArchivo,
                    },
                    i
                  ) => (
                    <tr key={N_ReqTup_Item}>
                      <td>
                        {N_ReqTup_descrip}

                        {C_FileFirma ? (
                          <p className="pb-0 mb-0">
                            <small>
                              Archivo firmado:{" "}
                              <i className="fas fa-download" title="Descargar"  style={{color:"#4169E1"}}></i>{" "}
                              <span style={{color:"#4169E1"}}><a href={`${urlDownloadRequisitoArchivo}${idRequisitoArchivo}`}target="_blank" rel='noreferrer'>{N_FileFirma_Nombre}</a></span> -
                              <i className="fas fa-times ms-2"  style={{color:"#FF0000"}}></i> <span style={{color:"#FF0000"}}> Eliminar archivo </span>
                            </small>
                          </p>
                        ) : (
                          <div>
                            {" "}
                            <Button
                              type="button"
                              variant="outline-secondary"
                              className="btn-sm"
                            >
                              Subir archivo firmado
                            </Button>
                          </div>
                        )}
                      </td>
                      <td>{numeroFolio}</td>
                      <td>
                        {ruta && (
                          <div>
                            {" "}
                            <Button
                              href={`${urlDownloadRequisitoArchivo}${idRequisitoArchivo}`}
                              variant="success"
                              size="sm"
                              title="Ver requisito"
                              target="_blank" 
                              rel='noreferrer'
                            >
                              <i className="fas fa-eye"></i>
                            </Button>
                          </div>
                        )}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </Table>
          </div>
        </div>
      )}
    </>
  );
};

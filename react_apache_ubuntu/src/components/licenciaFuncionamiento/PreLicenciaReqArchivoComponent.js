import { useState, useEffect } from "react";
import { obtenerReqArchivoPorPrecalId } from "../../services/licFuncService";
import { Navbar, Container, Table, Button, Alert } from "react-bootstrap";
import { PreLicenciaReqArchSubirFirmaComponent } from "./PreLicenciaReqArchSubirFirmaComponent";
import { PreLicenciaVBComponent } from "./PreLicenciaVBComponent";

export const PreLicenciaReqArchivoComponent = ({ precalId, resultadoDL }) => {
  const [requisitoArchivo, setRequisitoArchivo] = useState([]);
  const urlDownloadRequisitoArchivo = `${process.env.REACT_APP_API}/licfunc/view/requisito-archivo/`;
  const urlViewFirmaArchivo = `${process.env.REACT_APP_API}/licfunc/view/firma-archivo/`;
  const [refresfcarRequisitos, setrefresfcarRequisitos] = useState(true);

  const verRequisitoArchivo = async () => {
    const reqArchivoTmp = await obtenerReqArchivoPorPrecalId("01", precalId);
    setRequisitoArchivo(reqArchivoTmp);
  };

  useEffect(() => {
    // setRequisitoArchivo([])
    verRequisitoArchivo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresfcarRequisitos, precalId]);

  // precalId, refresfcarRequisitos

  return (
    <>
      {requisitoArchivo.length > 0 ? (
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
                      idRequisito,
                    },
                    i
                  ) => (
                    <tr key={N_ReqTup_Item}>
                      <td>
                        {N_ReqTup_descrip}
                        {idRequisitoArchivo && (
                          <PreLicenciaReqArchSubirFirmaComponent
                            C_FileFirma={C_FileFirma}
                            urlViewFirmaArchivo={urlViewFirmaArchivo}
                            idRequisitoArchivo={idRequisitoArchivo}
                            N_FileFirma_Nombre={N_FileFirma_Nombre}
                            setrefresfcarRequisitos={setrefresfcarRequisitos}
                            idRequisito={idRequisito}
                          />
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
                              rel="noreferrer"                            >
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
          <PreLicenciaVBComponent precalId={precalId} />
        </div>
      ) : (
        resultadoDL === 1 && (
          <Alert key="warning" variant="warning" className="mt-2">
            El ciudadano aún no carga requisitos.
          </Alert>
        )
      )}
    </>
  );
};

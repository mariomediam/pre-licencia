import { useState } from "react";
import { Button } from "react-bootstrap";

export const TributoContribEmisionComponent = ({
  tipo,
  anio,
  mes,
  detalle,
}) => {
  const [showDetail, setShowDetail] = useState(false);

  return (
    <>
      {detalle.map(
        ({
          C_Emision_Contrib,
          N_Emision_Contrib,
          C_Emision_Partida,
          N_Emision_Partida,
          Q_Emision_Monto,
          C_Emision_CtaCon,
          D_Emision_FecDig,
          C_Usuari_Login,
          N_Emision_PC,
          C_TipOpe,
          M_Archivo_Anio,
          M_Archivo_Mes,
          N_TipOpe,
        }) => (
          <>
            <tr>
              <td className="">{N_TipOpe}</td>
              <td className="align-middle">
                <div className="d-flex flex-column">
                  {N_Emision_Contrib}
                  <small className="text-muted">
                    {" "}
                    Cod. {C_Emision_Contrib}
                  </small>
                </div>
              </td>
              <td className="align-middle">
                <div className="d-flex flex-column">
                  {N_Emision_Partida}
                  <small className="text-muted">
                    {" "}
                    Cod. {C_Emision_Partida}
                  </small>
                </div>
              </td>
              <td className="text-end align-middle">{Q_Emision_Monto}</td>
              <td>
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => setShowDetail(!showDetail)}
                  // disabled={isDownload}
                  title="Descargar archivo"
                  className="me-2"
                >
                  adadad
                </Button>
              </td>
            </tr>
            {showDetail && (
              <tr>
                <td colSpan={5}>
                  <div className="d-flex align-items-center">
                    <div>
                      <small className="text-muted">Cuenta contable: </small>
                      {C_Emision_CtaCon}
                    </div>
                  </div>
                </td>
              </tr>
            )}
          </>
        )
      )}      
    </>
  );
};

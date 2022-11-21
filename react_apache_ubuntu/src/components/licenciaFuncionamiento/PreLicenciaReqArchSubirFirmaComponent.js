import { useState, useRef } from "react";
import { Button, Form } from "react-bootstrap";
import {
  agregarFirmaArchivo,
  eliminarFirmaArchivo,
} from "../../services/licFuncService";

export const PreLicenciaReqArchSubirFirmaComponent = ({
  C_FileFirma,
  urlViewFirmaArchivo,
  idRequisitoArchivo,
  N_FileFirma_Nombre,
  setrefresfcarRequisitos,
  idRequisito,
}) => {
  const [idReqArchivo, setIdReqArchivo] = useState(undefined);
  const inputFileFirmaArchivo = useRef();

  const clicButtonFileFirmaArchivo = (event) => {
    setIdReqArchivo(event.target.value);
    inputFileFirmaArchivo.current.click();
  };

  const changeInputFileFirmaArchivo = async (e) => {
    // e.preventDefault();

    if (e.target.files[0]) {
      await agregarFirmaArchivo(idReqArchivo, e.target.files[0]);
      setrefresfcarRequisitos((valor) => !valor);
    }
  };

  const spanEliminarFirmaArchivo = async (e) => {
    await eliminarFirmaArchivo(e.target.id);
    setrefresfcarRequisitos((valor) => !valor);
  };

  return (
    <div>
      {C_FileFirma ? (
        <p className="pb-0 mb-0">
          <small>
            Archivo firmado:{" "}
            <span style={{ color: "#4169E1" }}>
              <a
                href={`${urlViewFirmaArchivo}${C_FileFirma}`}
                target="_blank"
                rel="noreferrer"
              >
                <i
                  className="fas fa-download"
                  title="Descargar"
                  style={{ color: "#4169E1" }}
                ></i>{" "}
                Ver archivo                 
                {/* {idRequisito} */}
              </a>
            </span>{" "}
            -
            <span
              style={{ color: "#FF0000", cursor: "pointer" }}
              id={C_FileFirma}
              onClick={spanEliminarFirmaArchivo}
            >
              <i className="fas fa-times ms-2" style={{ color: "#FF0000" }}></i>{" "}
              Eliminar archivo{" "}
            </span>
          </small>
        </p>
      ) : (
        <div className="mb-0">
          {" "}
          <Button
            type="button"
            variant="outline-secondary"
            className="btn-sm"
            onClick={clicButtonFileFirmaArchivo}
            value={idRequisitoArchivo}
          >
            Subir archivo firmado
          </Button>
          <Form.Group
            // controlId="formFileSm"
            className="mb-0"
          >
            <Form.Control
              type="file"
              size="sm"
              style={{ display: "none" }}
              ref={inputFileFirmaArchivo}
              onChange={changeInputFileFirmaArchivo}
              key={idRequisitoArchivo}
              id={idRequisitoArchivo}
              accept="application/pdf"
            />
          </Form.Group>
        </div>
      )}
    </div>
  );
};

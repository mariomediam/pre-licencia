import { useState, useEffect } from "react";
import {
  obtenerContribuyenteDocumento,
  obtenerContribuyenteTelefono,
  obtenerContribuyenteDirElect,
  obtenerContribuyenteNacion,
} from "../../services/contribuyenteService";

export const DocumentosViewComponent = ({
  codigoContrib,
  codigoContribSelecc,
}) => {
  const [documentos, setDocumentos] = useState([]);
  const [telefonos, setTelefonos] = useState([]);
  const [dirElect, setDirElect] = useState([]);
  const [nacion, setNacion] = useState([]);

  const verDocumentos = async () => {
    if (
      codigoContrib &&
      codigoContribSelecc &&
      codigoContrib === codigoContribSelecc
    ) {      
      const documentosTmp = await obtenerContribuyenteDocumento(
        codigoContribSelecc
      );
      setDocumentos(documentosTmp);

      const telefonosTmp = await obtenerContribuyenteTelefono(
        codigoContribSelecc
      );
      setTelefonos(telefonosTmp);

      const dirElectTmp = await obtenerContribuyenteDirElect(
        codigoContribSelecc
      );
      setDirElect(dirElectTmp);

      const naciontTmp = await obtenerContribuyenteNacion(codigoContribSelecc);
      setNacion(naciontTmp);
    }
  };

  useEffect(() => {
    verDocumentos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [codigoContribSelecc]);

  return (
    <div className="ps-2">
      {documentos.length > 0 && (
        <div>
          <p className="text-muted pb-0 mb-0 mt-0">
            <small className="mb-0">Documentos</small>
          </p>
          {documentos.map((docum, i) => (
            <div key={i}>
              <small>{docum.Descripción}</small> {docum.Número}
            </div>
          ))}
        </div>
      )}

      {telefonos.length > 0 && (
        <div>
          <p className="text-muted pb-0 mb-0 mt-2">
            <small className="mb-0">Teléfonos</small>
          </p>
          {telefonos.map((telefono, i) => (
            <div key={i}>
              <small>{telefono.TipTel}</small> {telefono.Número}
            </div>
          ))}
        </div>
      )}

      {dirElect.length > 0 && (
        <div>
          <p className="text-muted pb-0 mb-0 mt-2">
            <small className="mb-0">Dirección electrónica</small>
          </p>
          {dirElect.map((dirElect, i) => (
            <div key={i}>{dirElect.Dirección_Electrónica}</div>
          ))}
        </div>
      )}

      {nacion.length > 0 && (
        <div>
          <p className="text-muted pb-0 mb-0 mt-2">
            <small className="mb-0">Nacionalidad</small>
          </p>
          {nacion.map((nac, i) => (
            <div key={i}>{nac.Gentilicio}</div>
          ))}
        </div>
      )}
    </div>
  );
};

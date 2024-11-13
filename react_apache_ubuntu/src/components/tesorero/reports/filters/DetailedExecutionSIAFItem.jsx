import { useEffect, useState, useRef } from "react";
import { formatNumber, transformarFecha } from "../../../../utils/varios";

export const DetailedExecutionSIAFItem = ({ record }) => {
  const [isTruncated, setIsTruncated] = useState(false);
  const [viewMore, setViewMore] = useState(false);
  const [viewMoreText, setViewMoreText] = useState("Ver más");

  const {
    // sec_ejec,
    ano_eje,
    expediente,
    fecha_doc,
    ciclo,
    fase,
    // secuencia,
    // CORRELATIVO,
    // cod_doc,
    num_doc,
    banco,
    cta_cte,
    ano_cta_cte,
    sec_func,
    monto,
    // ID_CLASIFICADOR,
    fuente_financ,
    tipo_recurso,
    clasificador,
    tipo_operacion,
    ruc,
    NOMBRE,
    glosa,
    certificado,
    // certificado_secuencia,
    doc_abreviatura,
  } = record;

  const glosaRef = useRef(null);

  useEffect(() => {
    const glosa = glosaRef.current;

    const isOverflowing = glosa.scrollHeight > glosa.clientHeight;

    if (isOverflowing) {
      setIsTruncated(true);
    } else {
      setIsTruncated(false);
    }
  }, []);

  const toggleViewMore = () => {
    setViewMore(!viewMore);
    setViewMoreText(viewMore ? "Ver más" : "Ver menos");
  };

  return (
    <tr style={{ fontSize: "12px" }}>
      <td>
        <div>
          <p className="my-0 py-0">
            {expediente}-{ano_eje}
          </p>
          <p className="my-0 py-0">
            <small className="text-muted">Fecha:</small>{" "}
            {transformarFecha(fecha_doc).substring(0, 10)}
          </p>
          <p className="my-0 py-0">
            <small className="text-muted">T.O:</small> {tipo_operacion}
          </p>
          <p className="my-0 py-0">
            <small className="text-muted">Certif:</small> {certificado}
          </p>
        </div>
      </td>
      <td className="">{`${ciclo} / ${fase}`}</td>
      <td className="">{`${fuente_financ} / ${tipo_recurso}`}</td>
      <td
        className=""
        style={{ maxWidth: "150px" }}
      >{`${doc_abreviatura} ${num_doc}`}</td>
      <td className="">
        <div>
          <p className="my-0 py-0">
            <small className="text-muted">Sec.Func: </small>
            {sec_func}
          </p>
          <p className="my-0 py-0">
            <small className="text-muted">Clasif: </small>
            {clasificador}
          </p>
          {ano_cta_cte && (
            <p className="my-0 py-0">
              <small className="text-muted">Cuenta:</small> {`${ano_cta_cte}-${banco}-${cta_cte}`}
            </p>
          )}
        </div>
      </td>

      <td className="" style={{maxWidth: "150px"}}>
        <div>
          <p className="my-0 py-0">{NOMBRE}</p>
          <p className="my-0 py-0">
            <small className="text-muted">Código: </small>
            {ruc}
          </p>
        </div>
      </td>
      <td className="">{formatNumber(monto)}</td>
      <td className="">
        <p
          className={`py-0 my-0 ${viewMore ? "" : "max-five-lines"}`}
          style={{ maxWidth: "220px", minWidth: "50px" }}
          ref={glosaRef}
        >
          {glosa}
        </p>
        {isTruncated && (
          <button
            className="btn btn-link p-0 m-0"
            onClick={toggleViewMore}
            style={{ fontSize: "12px" }}
          >
            {viewMoreText}
          </button>
        )}
      </td>
    </tr>
  )
};

import { useEffect, useState, useRef } from "react";
import { formatNumber, transformarFecha } from "../../../../utils/varios";

export const DetailedExecutionSiganetItem = ({ record }) => {
  const [isTruncated, setIsTruncated] = useState(false);
  const [viewMore, setViewMore] = useState(false);
  const [viewMoreText, setViewMoreText] = useState("Ver más");

  const {
    C_EXP,
    C_ANIPRE,
    D_FECHA,
    C_OPER,
    C_CICLO,
    C_FASE,
    C_FUEFIN,
    N_OPER_NOMBRE,
    C_RECURSO,
    N_TIPDOC_ABREV,
    C_DOCUM,
    C_SECFUN,
    N_METAPRESUP_DESC,
    C_CLAPRE,
    N_CLAPRE_DESC,
    C_DEPEN,
    N_DEPENDENCIA_DESC,
    C_PLANCON,
    N_PLANCON_DESC,
    C_PROV,
    N_PROV_NOMBRE,
    Q_MONTO,
    T_OBS,
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
            {C_EXP}-{C_ANIPRE}
          </p>
          <p className="my-0 py-0">
            <small className="text-muted">Fecha:</small>{" "}
            {transformarFecha(D_FECHA).substring(0, 10)}
          </p>
          <p className="my-0 py-0" title={N_OPER_NOMBRE}>
            <small className="text-muted">T.O:</small> {C_OPER}
          </p>
        </div>
      </td>
      <td className="">{`${C_CICLO} / ${C_FASE}`}</td>
      <td className="">{`${C_FUEFIN} / ${C_RECURSO}`}</td>
      <td
        className=""
        style={{ maxWidth: "150px" }}
      >{`${N_TIPDOC_ABREV} ${C_DOCUM}`}</td>
      <td className="">
        <div>
          <p className="my-0 py-0" title={N_METAPRESUP_DESC}>
            <small className="text-muted">Sec.Func: </small>
            {C_SECFUN}
          </p>
          <p className="my-0 py-0" title={N_CLAPRE_DESC}>
            <small className="text-muted">Clasif: </small>
            {C_CLAPRE}
          </p>
          <p className="my-0 py-0" title={N_DEPENDENCIA_DESC}>
            <small className="text-muted">Depend:</small> {C_DEPEN}
          </p>
          {C_PLANCON && (
            <p className="my-0 py-0" title={N_PLANCON_DESC}>
              <small className="text-muted">Cuenta:</small> {C_PLANCON}
            </p>
          )}
        </div>
      </td>

      <td className="">
        <div>
          <p className="my-0 py-0">{N_PROV_NOMBRE}</p>
          <p className="my-0 py-0">
            <small className="text-muted">Código: </small>
            {C_PROV}
          </p>
        </div>
      </td>
      <td className="">{formatNumber(Q_MONTO)}</td>
      <td className="">
        <p
          className={`py-0 my-0 ${viewMore ? "" : "max-five-lines"}`}
          style={{ maxWidth: "220px" }}
          ref={glosaRef}
        >
          {T_OBS}
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
  );
};

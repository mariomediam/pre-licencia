import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Badge } from "react-bootstrap";

import { formatNumber, transformarFecha } from "../../../../../utils/varios";
import { setCurrentSecuenciaThunk } from "../../../../../store/slices/siaf/thunks";

export const AccrualFormatExpedItem = ({ expedFase, setExpedErrors }) => {
  const dispatch = useDispatch();
  const { currentSecuencia } = useSelector((state) => state.siaf);
  const {
    anioExped: currentSecAnio,
    numeroExped: currentSecNumero,
    secuencia: currentSecSecuencia,
    correlativo: currentSecCorrelativo,
  } = currentSecuencia;

  const [isTruncated, setIsTruncated] = useState(false);
  const [viewMore, setViewMore] = useState(false);
  const [viewMoreText, setViewMoreText] = useState("Ver más");

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

  const {
    MONTO_NACIONAL,
    ABREVIATURA,
    SERIE_DOC,
    NUM_DOC,
    FECHA_DOC,
    FUENTE_FINANC,
    TIPO_RECURSO,
    NOMBRE,
    RUC,
    GLOSA,
    SECUENCIA,
    CORRELATIVO,
    ANO_EJE,
    EXPEDIENTE,
  } = expedFase;

  const onArticleClick = () => {
    dispatch(
      setCurrentSecuenciaThunk({
        anioExped: ANO_EJE,
        numeroExped: EXPEDIENTE,
        secuencia: SECUENCIA,
        correlativo: CORRELATIVO,
        MONTO_NACIONAL,
        ABREVIATURA,
        SERIE_DOC,
        NUM_DOC,
        FECHA_DOC,
        FUENTE_FINANC,
        TIPO_RECURSO,
        NOMBRE,
        RUC,
        GLOSA,
      })
    );
    setExpedErrors({}); // Reset errors
  };

  return (
    <article
      className={`border rounded my-2 p-2 ${
        currentSecAnio === ANO_EJE &&
        currentSecNumero === EXPEDIENTE &&
        currentSecSecuencia === SECUENCIA &&
        currentSecCorrelativo === CORRELATIVO
          ? "border-primary border-2"
          : ""
      }`}
      onClick={onArticleClick}
    >
      <header className="d-flex justify-content-between mb-2">
        <span>
          {ABREVIATURA} {SERIE_DOC} {NUM_DOC}
        </span>
        <Badge bg="secondary">S/. {formatNumber(MONTO_NACIONAL, 2)}</Badge>
      </header>
      <p className="my-0 py-0">
        <small className="text-muted">Fecha:</small>{" "}
        {transformarFecha(FECHA_DOC).substring(0, 10)}
      </p>
      <p className="my-0 py-0">
        <small className="text-muted">Rubro:</small> {FUENTE_FINANC} -{" "}
        {TIPO_RECURSO}
      </p>
      <p className="my-0 py-0">
        <small className="text-muted">Proveedor:</small> {RUC} - {NOMBRE}
      </p>
      <p
        className={`py-0 my-0 ${viewMore ? "" : "max-two-lines"}`}
        ref={glosaRef}
      >
        <small>
          <span className="text-muted text-balance">Glosa: </span> {GLOSA}
        </small>
      </p>
      {isTruncated && (
        <button
          className="btn btn-link p-0 m-0"
          onClick={(e) => {
            e.stopPropagation();
            toggleViewMore();
          }}
          style={{ fontSize: "12px" }}
        >
          {viewMoreText}
        </button>
      )}
    </article>
  );
};

import { useEffect, useRef, useState } from "react";
import { Badge } from "react-bootstrap";

import { formatNumber, transformarFecha } from "../../../../../utils/varios";
import TrashIcon from "../../../../../icons/TrashIcon";

export const TrustFormatItemComponent = ({
  cartaOrden,
  removeCartaSelected,
}) => {
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
  }, [cartaOrden]);

  const toggleViewMore = () => {
    setViewMore(!viewMore);
    setViewMoreText(viewMore ? "Ver más" : "Ver menos");
  };

  const {
    ANO_EJE,
    EXPEDIENTE,
    FECHA_DOC,
    NUM_DOC,
    RUC,
    NOMBRE_PROVEEDOR,
    MONTO_NACIONAL,
    GLOSA,
    key,
  } = cartaOrden;

  const onDeleteClick = () => {    
    removeCartaSelected(key);
  };

  return (
    <article
      className={`border rounded my-2 p-2 bg-white animate__animated animate__fadeIn`}
      // onClick={onArticleClick}
    >
      <header className="d-flex justify-content-between mb-2">
        <span>CARTA ORDEN {NUM_DOC}</span>
        <Badge bg="secondary">S/. {formatNumber(MONTO_NACIONAL, 2)}</Badge>
      </header>
      <p className="my-0 py-0">
        <small className="text-muted">Fecha:</small>{" "}
        {transformarFecha(FECHA_DOC).substring(0, 10)}
      </p>
      <p className="my-0 py-0">
        <small className="text-muted">Expediente:</small> {EXPEDIENTE}-{ANO_EJE}
      </p>
      <p className="my-0 py-0">
        <small className="text-muted">Proveedor:</small> {RUC} -{" "}
        {NOMBRE_PROVEEDOR}
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

      <div className="d-flex justify-content-end mt-0 mb-2">

        <button
            className="btn btn-outline-danger btn-sm"
            onClick={onDeleteClick}
        >
            Eliminar <TrashIcon className="ms-1" />
        </button>
        </div>
    </article>
  );
};

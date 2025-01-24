import { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import PlusIcon from "../../../../../icons/PlusIcon";

export const AccuralRetentionAdd = ({ setRetentions }) => {
  const inputDescripcion = useRef(null);
  const inputMonto = useRef(null);

  const [retencionErrors, setRetencionErrors] = useState({});

  const onClickAddRetention = () => {
    const descripcion = inputDescripcion.current.value.trim();
    const monto = inputMonto.current.value;
    const errors = {};

    if (!descripcion) {
      errors.descripcion = "Campo requerido";
    }

    if (!monto) {
      errors.monto = "Campo requerido";
    } else if (parseFloat(monto) <= 0) {
      errors.monto = "El monto debe ser mayor a 0";
    }

    setRetencionErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    const newRetention = {
      code: uuidv4(),
      description: descripcion,
      value: parseFloat(monto),
      isPersonalized: true,
    };

    setRetentions((prev) => [...prev, newRetention]);
    inputDescripcion.current.value = "";
    inputMonto.current.value = "";
  };

  const onChangeInput = (e) => {
    const { name } = e.target;
    setRetencionErrors({ ...retencionErrors, [name]: "" });
  };

  return (
    <>
      <small className="fw-bold">Añadir retención</small>
      <div className="row pt-1 pb-0">
        <div className="col">
          <input
            type="text"
            className={`form-control ${
              retencionErrors.descripcion ? "is-invalid" : ""
            }`}
            placeholder="Descripción"
            ref={inputDescripcion}
            name="descripcion"
            onChange={onChangeInput}
          />
        </div>
        <div className="col d-flex gap-1">
          <input
            type="number"
            className={`form-control text-end ${
              retencionErrors.monto ? "is-invalid" : ""
            }`}
            placeholder="0.00"
            ref={inputMonto}
            step={1}
            name="monto"
            onChange={onChangeInput}
          />
          <button
            type="button"
            className="btn btn-primary fw-bold"
            title="Agregar retención"
            onClick={onClickAddRetention}
          >
            <PlusIcon />
          </button>
        </div>
      </div>
      <div className="row mt-0 pt-0">
        <div className="col mt-0 pt-0">
          <span
            className="text-danger mt-0 pt-0"
            style={{ fontSize: "0.8rem" }}
          >
            {" "}
            {retencionErrors.descripcion}
          </span>
        </div>
        <div className="col mt-0 pt-0">
          <span
            className="text-danger mt-0 pt-0"
            style={{ fontSize: "0.8rem" }}
          >
            {" "}
            {retencionErrors.monto}
          </span>
        </div>
      </div>
    </>
  );
};

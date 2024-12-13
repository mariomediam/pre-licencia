import { useRef } from "react";
import { v4 as uuidv4 } from "uuid";

import PlusIcon from "../../../../../icons/PlusIcon";

export const AccuralRetentionAdd = ({ setRetentions }) => {
  const inputDescripcion = useRef(null);
  const inputMonto = useRef(null);

  const onClickAddRetention = () => {
    const newRetention = {
      code: uuidv4(),
      description: inputDescripcion.current.value,
      value: parseFloat(inputMonto.current.value),
      isPersonalized: true,
    };
    setRetentions((prev) => [...prev, newRetention]);
    inputDescripcion.current.value = "";
    inputMonto.current.value = "";
  };

  return (
    <>
      <small className="fw-bold">Añadir retención</small>
      <div className="row py-1">
        <div class="col">
          <input
            type="text"
            className={`form-control`}
            placeholder="Descripción"
            ref={inputDescripcion}
          />
        </div>
        <div class="col d-flex gap-1">
          <input
            type="number"
            className={`form-control text-end`}
            maxLength={10}
            placeholder="0.00"
            ref={inputMonto}
            step={1}
          />
          <button
            type="button"
            class="btn btn-primary fw-bold"
            title="Agregar retención"
            onClick={onClickAddRetention}
          >
            <PlusIcon />
          </button>
        </div>
      </div>
    </>
  );
};

import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPropertyCurrentExpedThunk } from "../../../../../store/slices/siaf/thunks";

export const AccrualFormatStep0 = ({ expedErrors, setExpedErrors }) => {
  const dispatch = useDispatch();
  const { currentExped } = useSelector((state) => state.siaf);
  const numeroInputRef = useRef(null);

  useEffect(() => {
    if (numeroInputRef.current) {
      numeroInputRef.current.focus();
    }
  }, []);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setExpedErrors({ ...expedErrors, [name]: "" });
    dispatch(addPropertyCurrentExpedThunk({ [name]: value }));
  };

  return (
    <div className="d-flex gap-2 px-3">
      <div className="mb-3 full-width">
        <label htmlFor="anioInput" className="form-label">
          <small className="text-muted">Año</small>
        </label>
        <input
          type="number"
          className={`form-control ${
            expedErrors.anioExped ? "is-invalid" : ""
          }`}
          id="anioInput"
          maxLength={4}
          name="anioExped"
          onChange={onChangeInput}
          value={currentExped.anioExped}
        />

        <span className="text-danger" style={{ fontSize: "0.8rem" }}>
          {" "}
          {expedErrors.anioExped}
        </span>
      </div>
      <div className="mb-3 full-width">
        <label htmlFor="numeroInput" className="form-label">
          <small className="text-muted">Número</small>
        </label>
        <input
          type="number"
          className={`form-control ${
            expedErrors.numeroExped ? "is-invalid" : ""
          }`}
          id="numeroInput"
          maxLength={10}
          name="numeroExped"
          onChange={onChangeInput}
          value={currentExped.numeroExped}
          ref={numeroInputRef}
          step={1}
        />

        <span className="text-danger" style={{ fontSize: "0.8rem" }}>
          {" "}
          {expedErrors.numeroExped}
        </span>        
      </div>
    </div>
  );
};

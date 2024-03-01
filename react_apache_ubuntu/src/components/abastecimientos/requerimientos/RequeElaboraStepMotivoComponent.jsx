import { useSelector, useDispatch } from "react-redux";
import { Form } from "react-bootstrap";


import {
  getTotalRequerimiento,
  setCurrentRequerimiento,
} from "../../../store/slices";

export const RequeElaboraStepMotivoComponent = () => {
  const dispatch = useDispatch();
  const { currentReque } = useSelector((state) => state.requerimiento);

  const { T_referencia_obs } = currentReque;

  const getTotal = () => {
    // Obtener la suma de los subtotales de los items
    const total = dispatch(getTotalRequerimiento());

    return total.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  // const onChangeInputObservaciones = useDebouncedCallback((value) => {
  //   dispatch(
  //     setCurrentRequerimiento({
  //       T_referencia_obs: value,
  //     })
  //   );
  //   console.log("holaaaa")
  // }, 300);

  const onChangeInputObservaciones = (e) => {
    const value = e.target.value;
    dispatch(
      setCurrentRequerimiento({
        "T_referencia_obs": value,
      })
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-end align-items-center">
        <small className="text-muted pe-2">Total: </small>{" "}
        <h4 className=""> S/. {getTotal()}</h4>
      </div>
      <Form.Group md="6" controlId="id_observ" className="mt-0">
        <Form.Label className="text-muted my-0">
          <small className="mb-0">Observaciones</small>
        </Form.Label>
        <Form.Control
          type="textarea"
          as="textarea"
          rows={4}
          name="name_observ"
          onChange={onChangeInputObservaciones}
          value={T_referencia_obs}
          // onChange={(e) => setField("observ", e.target.value)}
          // isInvalid={!!errors.observ}
        />

        {/* <Form.Control.Feedback type="invalid">
          {errors.observ}
        </Form.Control.Feedback> */}
      </Form.Group>
    </div>
  );
};

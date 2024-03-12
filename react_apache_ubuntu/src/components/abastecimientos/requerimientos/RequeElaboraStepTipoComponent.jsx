import { useState } from "react";
import { Form } from "react-bootstrap";

import { RequeCardOptionComponent } from "./RequeCardOptionComponent";
import { tipoDeRequerimientos } from "../../../utils/varios";

export const RequeElaboraStepTipoComponent = () => {
  const [tipoRequeChecked, setTipoRequeChecked] = useState("04");

  return (
    <>
      <p>
        <small>Escoger tipo de requerimiento:</small>
      </p>
      <Form>
        {tipoDeRequerimientos.map((tipoRequerimiento) => (
          <RequeCardOptionComponent
            key={tipoRequerimiento.id}
            tipoRequerimiento={tipoRequerimiento}
            tipoRequeChecked={tipoRequeChecked}
            setTipoRequeChecked={setTipoRequeChecked}
          />
        ))}
      </Form>
    </>
  );
};

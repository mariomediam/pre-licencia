import { useState } from "react";
import { Form } from "react-bootstrap";

import { RequeCardOptionComponent } from "./RequeCardOptionComponent";

const tipoDeRequerimientos = [
  {
    id: "04",
    descripcion: "Libre de servicios",
    C_biesertipo: "02",
    f_libre: "1",
    pathImage: "/images/requerimientos/libre-servicios.svg",
  },
  {
    id: "03",
    descripcion: "Libre de bienes",
    C_biesertipo: "01",
    f_libre: "1",
    pathImage: "/images/requerimientos/libre-bienes.svg",
  },
  {
    id: "02",
    descripcion: "Servicios",
    C_biesertipo: "02",
    f_libre: "0",
    pathImage: "/images/requerimientos/servicios.svg",
  },

  {
    id: "01",
    descripcion: "Bienes",
    C_biesertipo: "01",
    f_libre: "0",
    pathImage: "/images/requerimientos/bienes.svg",
  },
];

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

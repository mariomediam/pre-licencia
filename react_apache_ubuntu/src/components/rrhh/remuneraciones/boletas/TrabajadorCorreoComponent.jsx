import { useLocation, useNavigate } from "react-router-dom";

import { Form, InputGroup, Button, FormControl } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { startGetTrabajadorCorreo } from "../../../../store/slices";
import { TrabajadorCorreoListaComponent } from "./TrabajadorCorreoListaComponent";

export const TrabajadorCorreoComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();

  const q = location.search
    .split("&")[0]
    .replace("?q=", "")
    .replaceAll("%20", " ");

  const [valorBuscado, setvalorBuscado] = useState(q || "");

  useEffect(() => {
    if (q === "") return;
    dispatch(startGetTrabajadorCorreo(q));
  }, [q, dispatch]);

  const onClickBuscar = () => {
    if (valorBuscado === "") return;
    navigate(`?q=${valorBuscado}`);
  };

  return (
    <>      
      <div className="row justify-content-center">
        <div className="col-12 col-md-5">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Buscar por DNI o apellidos</Form.Label>
            <InputGroup className="mb-3">
              <FormControl
                aria-describedby="basic-addon2"
                name="valorBuscado"
                value={valorBuscado}
                onChange={(e) => setvalorBuscado(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    onClickBuscar();
                  }
                }}
              />
              <Button
                variant="outline-secondary"
                id="button-addon2"
                title="Buscar"
                onClick={onClickBuscar}
              >
                <i className="fas fa-search"></i>
              </Button>
            </InputGroup>
          </Form.Group>
        </div>
      </div>
      <hr />
      <TrabajadorCorreoListaComponent />
    </>
  );
};

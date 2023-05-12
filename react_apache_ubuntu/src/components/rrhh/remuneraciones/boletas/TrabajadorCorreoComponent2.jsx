import { Form, InputGroup, Button, FormControl, Container } from "react-bootstrap";
import TrabajadorCorreoListaComponent from "./TrabajadorCorreoListaComponent";
import { useState, useMemo } from "react";
import { useForm } from "../../../../hooks/useForm";
import { useNavigate, useLocation } from "react-router-dom";
import queryString from "querystring";



const initialState = {
  valorBuscado: ""
};

const initialStateFiltro = {
  valor: "",
  reload: true,
  items: [],
}


export const TrabajadorCorreoComponent = () => {

  
  const navigate = useNavigate();
  const location = useLocation();
  const { q = ''} = useMemo(() => {
    return queryString.parse(location.search.replace('?', ''));
  }, [location.search]);

 
 const { valorBuscado, onInputChange } = useForm(initialState);

  const [filtro, setFiltro] = useState(initialStateFiltro);

  const onClickBuscar = () => {
    console.log("Se ejecuta onClickBuscar");
    setFiltro({
      items: [],
      reload: true,
      valor: valorBuscado,
    });
    console.log({
      ...filtro,
      valor: valorBuscado,
    });
    navigate(`?q=${valorBuscado}`)
  };

  return (
    <>
    <Container>
      <div className="">
        <div className="row justify-content-center">
          <div className="col-12 col-md-5">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Buscar por DNI o apellidos</Form.Label>
              <InputGroup className="mb-3">
                <FormControl
                  aria-describedby="basic-addon2"
                  name="valorBuscado"
                  value={valorBuscado}
                  onChange={onInputChange}
                  // cuando se presiona enter llamar a onClickBuscar
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
      </div>
      </Container>
      <hr />
      <div className="row justify-content-center">

          <div className="col-sm-12 col-sm-12 col-lg-10 col-xl-8 mt-3">
            <TrabajadorCorreoListaComponent filtro={filtro} />
          </div>
      </div>
    </>
  );
};

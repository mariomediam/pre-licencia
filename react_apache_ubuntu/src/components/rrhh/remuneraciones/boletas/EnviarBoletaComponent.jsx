
import { useEffect, useState, useMemo } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import { Mes } from "../../../../utils";
import { ListaBoletasEnviadas } from "./ListaBoletasEnviadas";
import { AniosPlanillas } from "../../../../views/rrhh";
import { useParams, useNavigate } from "react-router-dom";


const anioActual = () => {
  const fecha = new Date();
  return fecha.getFullYear();
};

const mesActual = () => {
  const fecha = new Date();
  return fecha.getMonth() + 1;
};

export const EnviarBoletaComponent = () => {

  const navigate = useNavigate();
  
  let { anio = anioActual(), mes = mesActual() } = useParams();
   
  const [selectedAnio, setSelectedAnio] = useState(anio);
  const [selectedMonth, setSelectedMonth] = useState(mes);

  const memoizedListaBoletasEnviadas = useMemo(() => {
    return <ListaBoletasEnviadas anio={selectedAnio} mes={selectedMonth} />;
  }, [selectedAnio, selectedMonth]);

  useEffect(() => {
    navigate(`/rrhh/remuneraciones/enviar_boleta/${selectedAnio}/${selectedMonth}`);
  }, [navigate, selectedAnio, selectedMonth]);

 
  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-3">
            <Form.Text id="passwordHelpBlock" muted>
              Debe ingresar año y mes de la planilla a generar.
            </Form.Text>
            <br />

            <Form.Label className="mt-2" htmlFor="inputAnio">
              Año
            </Form.Label>
            <AniosPlanillas
              selectedYear={selectedAnio}
              setSelectedYear={setSelectedAnio}
            />

            <Form.Label htmlFor="selectMes" className="mt-2">
              Mes
            </Form.Label>
            <InputGroup className="mb-3">
              <Mes
                selectedMonth={selectedMonth}
                setSelectedMonth={setSelectedMonth}
              />
              
              <Button variant="outline-secondary" id="button-addon2">
                <i className="fas fa-search"></i>
              </Button>
            </InputGroup>
          </div>
        </div>
      </div>
      <hr />      
      {memoizedListaBoletasEnviadas}
    </>
  );
};

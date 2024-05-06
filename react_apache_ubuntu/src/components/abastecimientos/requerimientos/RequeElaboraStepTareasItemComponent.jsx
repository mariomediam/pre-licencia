import { Accordion } from "react-bootstrap";
import { RequeElaboraStepTareasItemSaldoComponent } from "./RequeElaboraStepTareasItemSaldoComponent";

export const RequeElaboraStepTareasItemComponent = ({ tarea, active }) => {
  const { C_secfun, N_metapresup_desc, actividades = []} = tarea;
  return (
    <div className="mb-4">
       
      <Accordion defaultActiveKey={active ? "0" : ""}>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <p className="m-0 p-0 text-truncate">
              <small className="text-muted">Secuencia funcional: </small>
              <small>
                {C_secfun} {N_metapresup_desc}{" "}
              </small>
            </p>
          </Accordion.Header>
          <Accordion.Body>
            {actividades.map((actividad, i) => (
              <RequeElaboraStepTareasItemSaldoComponent
                key={i}
                C_secfun = {C_secfun}
                actividad={actividad}      
                N_metapresup_desc = {N_metapresup_desc}          
              />
            ))}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

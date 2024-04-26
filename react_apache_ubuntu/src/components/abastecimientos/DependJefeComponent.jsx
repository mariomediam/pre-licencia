import React, { useEffect, useRef, useState } from "react";
import Select from "react-select";
import { Form, Alert } from "react-bootstrap";

import { obtenerAccesoDepen } from "../../services/abastecService";
import { obtenerJefeDepen } from "../../services/generalService";

export const DependJefeComponent = ({  
  dependSelected,
  setDependSelected,
  currentDependJefe,
  setCurrentDependJefe,
  titleDepend = "Unidad orgánica",
  onlyDepend = true,
}) => {
  const controlSelectDepend = useRef(null);
  const [dependencias, setDependencias] = useState([]);

  
  
  
  const { N_TRABA_NOMBRE : n_jefe_nombre } = currentDependJefe;

  const date = new Date();
  const aniosSelected = date.getFullYear();

  const onChangeControlSelectDepend = (e) => {
    if (e?.value) {      
      setDependSelected(e.value);
    }
  };

  useEffect(() => {
    const getDependencias = async () => {
      if (aniosSelected) {
        controlSelectDepend.current.clearValue();
        const data = await obtenerAccesoDepen(aniosSelected);
        const dependenciasTmp = data.map(
          ({ C_depen, N_dependencia_desc, t }) => {
            return {
              value: C_depen,
              label: `${C_depen} - ${N_dependencia_desc}`,
              tipo: t,
            };
          }
        );

        if (onlyDepend) {
          setDependencias(dependenciasTmp.filter((dep) => dep.tipo === 0));
        } else {
          setDependencias(dependenciasTmp);
        }
      }
    };
    getDependencias();
  }, [aniosSelected, onlyDepend]);

  useEffect(() => {
    // setIsLoading(true);
    const getDependJefe = async () => {
      if (dependSelected && aniosSelected && onlyDepend) {        

        const data = await obtenerJefeDepen(aniosSelected, dependSelected);

        console.log(data)
        
        setCurrentDependJefe(data || {});
      } else {
        setCurrentDependJefe({});
      }
      
      // setIsLoading(false);
    };
    getDependJefe();
  }, [dependSelected, aniosSelected, onlyDepend, setCurrentDependJefe]);

  return (
    <>
      <div className="w-100 pb-2">
        <Form.Group className="mt-3" controlId="formBasicEmail">
          {/* <Form.Label className="text-muted mb-0">{titleDepend}</Form.Label> */}
          <small className="text-muted">{titleDepend}</small>
          <Select
            placeholder="Seleccionar unidad orgánica"
            ref={controlSelectDepend}
            noOptionsMessage={() => "Registro no encontrado"}
            name="dependencias"
            onChange={onChangeControlSelectDepend}
            options={dependencias}
            className="basic-multi-select"
            classNamePrefix="select"
          />
        </Form.Group>
      </div>

      {onlyDepend && (
            <>
              <small className="text-muted">Encargado:</small>

              {n_jefe_nombre && n_jefe_nombre.trim().length > 0 ? (
                <p>{n_jefe_nombre}</p>
              ) : (
                <Alert variant="danger">
                  <small>
                    {dependSelected ? (
                      <>
                        No se encontro el jefe de dependencia, por favor contacte a
                        la Oficina de Procesos Técnicos y Bienestar Social
                      </>
                    ) : (
                      <>Seleccione {titleDepend}</>
                    
                    )}
                    
                  </small>
                </Alert>
              )}
            </>
          )}
    </>
  );
};

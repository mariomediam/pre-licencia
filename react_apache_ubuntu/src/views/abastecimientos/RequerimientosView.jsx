import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Breadcrumb, Form } from "react-bootstrap";
import Select from "react-select";

import {
  obtenerAccesoDepen,
  obtenerRequeDepen,
} from "../../services/abastecService";

import Header from "../../components/Header";
import { RequeListaDepend } from "../../components/abastecimientos/requerimientos/RequeListaDepend";

const anios = [];

for (let i = new Date().getFullYear(); i >= 1999; i--) {
  anios.push({ value: i.toString(), label: i });
}

export const RequerimientosView = () => {
  const [searchParams] = useSearchParams();

  const controlSelectAnio = useRef(null);
  const controlSelectDepend = useRef(null);

  const [aniosSelected, setAniosSelected] = useState(
    searchParams.get("anio") || new Date().getFullYear().toString()
  );
  const [dependSelected, setDependSelected] = useState(undefined);

  const [paramsDepend, setParamsDepend] = useState(
    searchParams.get("depend") || undefined
  );

  const [dependencias, setDependencias] = useState([]);

  const [requerimientos, setRequerimientos] = useState([]);

  useEffect(() => {
    const getDependencias = async () => {
      if (aniosSelected) {
        controlSelectDepend.current.clearValue();
        const data = await obtenerAccesoDepen(aniosSelected);
        const dependenciasTmp = data.map(({ C_depen, N_dependencia_desc }) => {
          return {
            value: C_depen,
            label: `${C_depen} - ${N_dependencia_desc}`,
          };
        });

        setDependencias(dependenciasTmp);
      }
    };

    getDependencias();
  }, [aniosSelected]);

  const onChangeControlSelectAnio = (e) => {
    setDependSelected(undefined);
    setAniosSelected(e.value);
  };

  const onChangeControlSelectDepend = (e) => {
    if (e?.value) {
      setDependSelected(e.value);
    }
  };

  useEffect(() => {
    if (paramsDepend && dependencias.length > 0) {
      const defaultValue = dependencias.filter(
        ({ value }) => value === paramsDepend
      )[0];
      if (defaultValue) {
        controlSelectDepend.current.setValue(defaultValue);
      }
      setParamsDepend(undefined);
    }
  }, [dependencias, paramsDepend]);

  useEffect(() => {
    const getRequerimientos = async () => {
      if (dependSelected && aniosSelected) {
        const lcTipoBieSer = "99";
        const data = await obtenerRequeDepen(
          aniosSelected,
          dependSelected,
          lcTipoBieSer
        );
        setRequerimientos(data);
      } else {
        console.log("Se ejecuto  setRequerimientos([]);");
        setRequerimientos([]);
      }
    };
    getRequerimientos();
  }, [dependSelected, aniosSelected]);

  return (
    <div>
      <Header />
      <div className="ps-3 mb-0">
        <Breadcrumb>
          <Breadcrumb.Item active>Requerimientos</Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <h3 className="mt-0 mb-3 text-center">
        <i className="fas fa-box-open me-3"></i>
        Elaborar requerimiento de bienes y servicios
      </h3>

      <div className="d-flex justify-content-center mx-1 flex-wrap px-5">
        <div className="w-100 px-5">
          <Form.Group className="mt-3" controlId="formBasicEmail">
            <Form.Label className="text-muted mb-0">Año</Form.Label>
            <Select
              placeholder="Seleccionar año"
              defaultValue={{
                value: aniosSelected?.toString(),
                label: aniosSelected,
              }}
              ref={controlSelectAnio}
              noOptionsMessage={() => "Registro no encontrado"}
              name="anios"
              onChange={onChangeControlSelectAnio}
              options={anios}
              className="basic-multi-select"
              classNamePrefix="select"
            />
          </Form.Group>
        </div>

        <div className="w-100 px-5">
          <Form.Group className="mt-3" controlId="formBasicEmail">
            <Form.Label className="text-muted mb-0">Unidad Orgánica</Form.Label>
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
          <RequeListaDepend requerimientos={requerimientos} />
        </div>
      </div>
    </div>
  );
};

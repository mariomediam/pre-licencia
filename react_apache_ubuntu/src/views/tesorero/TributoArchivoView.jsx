import { useEffect, useState, useCallback } from "react";
import { Breadcrumb } from "react-bootstrap";

import { ReactComponent as Beneficios } from "../../assets/images/svg/businessplan.svg";
import { ReactComponent as SaldoInicial } from "../../assets/images/svg/coins.svg";
import { ReactComponent as Bajas } from "../../assets/images/svg/file-dollar.svg";
import { ReactComponent as Recaudacion } from "../../assets/images/svg/moneybag.svg";
import { ReactComponent as Emision } from "../../assets/images/svg/receipt-2.svg";
import { ReactComponent as Altas } from "../../assets/images/svg/cash.svg";

import {
  obtenerTributoTipoOperacion,
  obtenerTributoPeriodosDisponibles,
  obtenerTributoArchivo
} from "../../services/tesoreroService";
import Header from "../../components/Header";
import { TributoArchivoListarComponent } from "../../components/tesorero/tributo/TributoArchivoListarComponent";
import { TributoArchivoListarModalComponent } from "../../components/tesorero/tributo/TributoArchivoListarModalComponent";

const anios = [];
const anioActual = new Date().getFullYear();
for (let i = anioActual; i >= 2000; i--) {
  anios.push(i);
}

export const TributoArchivoView = () => {
  const operationIcons = {
    "01": SaldoInicial,
    "02": Emision,
    "03": Altas,
    "04": Bajas,
    "05": Recaudacion,
    "06": Beneficios,
  };

  const [lisTipoOperacion, setLisTipoOperacion] = useState([]);
  const [anioSelected, setAnioSelected] = useState(
    anios.length > 0 ? anios[0] : undefined
  );
  const [tipOpeSelected, setTipOpeSelected] = useState(undefined);
  const [periodosDisponibles, setPeriodosDisponibles] = useState([]);  
  const [listTributoArchivo, setListTributoArchivo] = useState([]);
  const [isLoading, setIsLoading] = useState(false)

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchTributoArchivo = useCallback(async () => {
    try {
        setIsLoading(true)
      // const opcion = tipOpeSelected === "01" ? "03" : "04";
      const opcion = "04"
      const valor01 = tipOpeSelected;
      const valor02 = anioSelected;
      const data = await obtenerTributoArchivo({ opcion, valor01, valor02 });
      setListTributoArchivo(data);
      setIsLoading(false)
    } catch (error) {
      console.error(error);
    }    
  }, [tipOpeSelected, anioSelected]);

  

  const getNameTipoOperacion = (cTipOpe) => {
    const tipoOperacion = lisTipoOperacion.find(
      (item) => item.C_TipOpe === cTipOpe
    );
    return tipoOperacion ? tipoOperacion.N_TipOpe : "";
  };


  const onClicTipoOperacion = (cTipOpe) => {
    setTipOpeSelected(cTipOpe);
  }

  useEffect(() => {
    const fetchTributoTipoOperacion = async () => {
      try {
        const data = await obtenerTributoTipoOperacion();
        setLisTipoOperacion(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTributoTipoOperacion();
  }, []);


  useEffect(() => {
    if (lisTipoOperacion.length > 0) {
      setTipOpeSelected(lisTipoOperacion[0].C_TipOpe);
    }
  }, [lisTipoOperacion]);

  const fetchTributoPeriodosDisponibles = useCallback(async () => {
    try {
      const data = await obtenerTributoPeriodosDisponibles({
        tipo: tipOpeSelected,
        anio: anioSelected,
      });
      setPeriodosDisponibles(data);
    } catch (error) {
      console.error(error);
    }
  }, [tipOpeSelected, anioSelected]);

  useEffect(() => {
    setPeriodosDisponibles([]);

    // const fetchTributoPeriodosDisponibles = async () => {
    //   try {
    //     const data = await obtenerTributoPeriodosDisponibles({
    //       tipo: tipOpeSelected,
    //       anio: anioSelected,
    //     });
    //     setPeriodosDisponibles(data);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };
    fetchTributoPeriodosDisponibles();
  }, [tipOpeSelected, anioSelected, fetchTributoPeriodosDisponibles]);

  return (
    <>
      <Header />
      <div className="ps-3 mb-0">
        <Breadcrumb>
          <Breadcrumb.Item active>Gestión y operaciones</Breadcrumb.Item>
          <Breadcrumb.Item active>Control y Gestión Tributaria</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <hr />

      <h3 className="mt-0 mb-3 text-center text-color-default">
        <i className="fas fa-file-upload me-2"></i>
        Archivos cargados
      </h3>

      <div className="container border rounded p-4 fullHeight">
        <div className="row">
          <div className="col-12">
            <div className="mb-4">
              <h5 className="text-color-default">Año</h5>
              <select
                className="form-select mb-3"
                aria-label="Default select example"
                defaultValue={anios[0]}
                onChange={(e) => setAnioSelected(e.target.value)}
              >
                {anios.map((anio) => (
                  <option key={anio} value={anio}>
                    {anio}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <h5 className="text-color-default">
                Tipo de operación financiera
              </h5>

              <div className="container mt-3">
                <div className="row">
                  {lisTipoOperacion.map((itemTipOpe) => {
                    const OperationIcon = operationIcons[itemTipOpe.C_TipOpe];
                    return (
                      <div
                        key={itemTipOpe.C_TipOpe}
                        className="col-6 col-md-4 col-lg-3 mb-3"
                      >
                        <div
                          role="button"
                          className={`border p-3 d-flex gap-2 rounded ${
                            itemTipOpe.C_TipOpe === tipOpeSelected
                              ? "tributo-selected"
                              : "tributo"
                          }`}
                          onClick={() => onClicTipoOperacion(itemTipOpe.C_TipOpe)}
                        >
                          {OperationIcon && <OperationIcon />}
                          {itemTipOpe.N_TipOpe}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <TributoArchivoListarComponent
          cTipOpe={tipOpeSelected}
          NTipOpe={getNameTipoOperacion(tipOpeSelected)}          
          fetchTributoArchivo={fetchTributoArchivo}
          listTributoArchivo={listTributoArchivo}          
          isLoading={isLoading}             
          fetchTributoPeriodosDisponibles={fetchTributoPeriodosDisponibles}       
        />

        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", right: "0px", width: "70px" }}>
            <div style={{ position: "fixed", bottom: "25px" }}>
              <button
                className="btn btn-primary rounded-circle"
                style={{ width: "70px", height: "70px" }}
                title={`Agregar ${getNameTipoOperacion(
                  tipOpeSelected
                ).toLowerCase()}`}
                onClick={handleShow}                
                disabled={periodosDisponibles.length === 0}
              >
                <i className="fas fa-plus"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <TributoArchivoListarModalComponent
        show={show}
        handleClose={handleClose}
        anioSelected={anioSelected}
        tipOpeSelected={tipOpeSelected}
        NTipOpe={getNameTipoOperacion(tipOpeSelected)}
        periodosDisponibles={periodosDisponibles}   
        fetchTributoArchivo={fetchTributoArchivo}
        fetchTributoPeriodosDisponibles={fetchTributoPeriodosDisponibles}
      />
    </>
  );
};

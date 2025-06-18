import { useEffect, useState, useCallback } from "react";
import Header from "../../../components/Header";
import { Breadcrumb, Spinner } from "react-bootstrap";
import RefreshIcon from "../../../icons/RefreshIcon";
import {
  obtenerUltimaSincro,
  sincronizarGastoDiario,
} from "../../../services/siafService";
import { transformarFecha } from "../../../utils/varios";
import WarningIcon from "../../../icons/WarningIcon";

export const SincronizaGastoDiario = () => {
  const [ultimaSincro, setUltimaSincro] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const anioActual = new Date().getFullYear();

  const obtenerSincro = useCallback(async () => {
    const params = {
      ano_eje: anioActual,
      sec_ejec: process.env.REACT_APP_SEC_EJEC,
    };      
    const response = await obtenerUltimaSincro(params);
    setUltimaSincro(response);
  }, [anioActual]);

  useEffect(() => {
    obtenerSincro();
  }, [obtenerSincro]);

  const sincronizar = async () => {
    try {
      setIsLoading(true);
      await sincronizarGastoDiario();
      await obtenerSincro();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="ps-3">
        <Breadcrumb>
          <Breadcrumb.Item active>Territorial</Breadcrumb.Item>
          <Breadcrumb.Item active>Proyectos de inversión</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="container">
        <div className="row justify-content-center">
          <div
            className="align-items-center p-2 col-sm-12 col-lg-8"
            style={{ border: "0px solid black" }}
          >
            <h3 className="mt-0 text-center">
              <RefreshIcon className="me-2 mb-1" />
              Actualizar ejecución del gasto
            </h3>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-12 col-lg-4 border p-3 rounded-3 bg-white">
            <h6>Estado de los datos</h6>
            <small>
              Ejecución del gasto presupuestal actualizado al {" "}
              {transformarFecha(ultimaSincro?.ultima_actualizacion)}{" "}
            </small>

            {isLoading && (
              <div className="alert alert-warning mt-2 p-2 d-flex animate__animated animate__fadeIn animate__faster" role="alert">
                <div>
                  <WarningIcon className="me-1 mb-1" width={16} height={16} />
                </div>
                <div>
                  <small>
                    Actualizando información
                    <br />
                  </small>
                  <p style={{ fontSize: "12px" }} className="mb-0">
                    Por favor espere mientras se obtienen los datos más
                    recientes...
                  </p>
                </div>
              </div>
            )}

            <div className="d-grid gap-2 mt-2">
              <button
                className="btn btn-primary btn-sm"
                onClick={sincronizar}
                disabled={isLoading}
              >
                {isLoading ? (
                    <div className="d-flex align-items-center justify-content-center">
                        <Spinner animation="border" size="sm" className="me-2" />
                        Actualizando...
                    </div>
                ) : (
                    <div className="d-flex align-items-center justify-content-center">
                        <RefreshIcon className="me-2" width={16} height={16} />
                        Actualizar gasto
                    </div>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

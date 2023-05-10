import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "react-bootstrap";

import Spinner from "react-bootstrap/Spinner";
import { getPlanillaBoletaYaGeneradas } from "../../../../store/slices/remuneraciones";
import { obtenerNombreMes } from "../../../../utils/varios";
import { ItemEnviarBoletas } from "./ItemEnviarBoletas";

export const ListaEnviarBoletas = ({ anio = 0, mes = 0 }) => {

  const dispatch = useDispatch();
  const { boletasGeneradas = [], isLoading } = useSelector(
    (state) => state.boletasGeneradas
    );
    
    useEffect(() => {    
      dispatch(getPlanillaBoletaYaGeneradas(anio, mes, undefined, undefined));
    }, [dispatch, anio, mes]);
    
      
  return (
    <div className="row justify-content-center">
      <div className="col-sm-12 col-lg-10 col-xl-6">
        {isLoading ? (
          <div className="text-center">
            <Spinner animation="border" role="status" className="me-2">
              <span className="visually-hidden">Cargando...</span>
            </Spinner>
            Cargando
          </div>
        ) : (
          <>
            <small>
              {" "}
              Planillas {obtenerNombreMes(mes)} {anio}
            </small>

            <div style={{ border: "1px solid lightgrey" }}>
              <Table hover responsive className="caption-top mb-1 animate__animated animate__fadeIn animate__faster">
                <thead>
                  <tr className="color-header1 text-white">
                    <th className="text-center align-middle m-0 p-0">
                      Tipo planilla
                    </th>
                    <th className="text-center align-middle m-0 p-0">Número</th>
                    <th className="text-center align-middle m-0 p-0">
                      Colaboradores
                    </th>
                    <th className="text-center align-middle m-0 p-0"></th>
                    <th className="text-center align-middle m-0 p-0"></th>
                  </tr>
                </thead>
                <tbody>
                  {boletasGeneradas.map((boleta, i) => (
                    <tr 
                      key={
                        boleta.c_tippla_id.toString() +
                        "-" +
                        boleta.c_plani_nro.toString()
                      }
                    >
                      <ItemEnviarBoletas {...boleta} />
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

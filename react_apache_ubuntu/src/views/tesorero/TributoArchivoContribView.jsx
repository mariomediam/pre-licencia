import { useState, useRef } from "react";
import { Breadcrumb, Table } from "react-bootstrap";

import Header from "../../components/Header";
import { obtenerTributoContrib } from "../../services/tesoreroService";
import { TributoContribEmisionComponent } from "../../components/tesorero/tributo/TributoContribEmisionComponent";
import { TributoContribEmisionItemComponent } from "../../components/tesorero/tributo/TributoContribEmisionItemComponent";


const anios = [];
const anioActual = new Date().getFullYear();
for (let i = anioActual; i >= 2000; i--) {
  anios.push(i);
}

export const TributoArchivoContribView = () => {
  const [anioSelected, setAnioSelected] = useState(
    anios.length > 0 ? anios[0] : undefined
  );
  const [listTributoContrib, setListTributoContrib] = useState([]);

  const inputContribuyente = useRef(null);

  const buscarTributoContrib = async (event) => {
    

    if (event.key !== "Enter") return;

    try {
      const valor = inputContribuyente.current.value;
      const anio = anioSelected;
      const data = await obtenerTributoContrib({ valor, anio });
      setListTributoContrib(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

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
        <i className="fas fa-user me-2"></i>
        Buscar contribuyente
      </h3>

      <div className="d-flex justify-content-center px-5 pt-4">
        <div className="col-sm-12 col-lg-10 col-xl-6 p-4 border rounded">
          {/* INPUT BUSQUEDA */}
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Ingrese código o nombre del contribuyente"
              aria-label="Ingrese código o nombre del contribuyente"
              aria-describedby="basic-addon2"
              ref={inputContribuyente}
              onKeyPress={buscarTributoContrib}
            />
            <span className="input-group-text" id="basic-addon2">
              <i className="fas fa-search"></i>
            </span>
          </div>

          {/* SELECT AÑO */}
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

          {/* OPERACIONES FINANCIERAS */}
          <div className="mb-4">
            <h5 className="text-color-default">Operaciones financieras</h5>

            <div className="">
              <Table
                hover
                responsive
                className="caption-top mb-1 animate__animated animate__fadeIn animate__faster rounded-3"
              >
                <thead>
                  <tr className="color-header2 text-white">
                    <th className="align-middle m-0">Archivo</th>

                    <th className="align-middle m-0">Contribuyente</th>
                    <th className="align-middle m-0">Partida</th>
                    <th className="text-center align-middle m-0 p-0">
                      Importe
                    </th>
                    <th className="text-center align-middle m-0 p-0"></th>
                  </tr>
                </thead>
                <tbody>
                  {listTributoContrib.map(({ tipo, anio, mes, detalle }, i) => (
                    tipo === "EMISION" && (
                    <TributoContribEmisionComponent
                      tipo={tipo}
                      anio={anio}
                      mes={mes}
                      detalle={detalle}
                      key={`${tipo}-${anio}-${mes}`}
                    />)
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
      <TributoContribEmisionItemComponent />
    </>
  );
};

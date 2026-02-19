import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { Breadcrumb } from "react-bootstrap";
import Swal from "sweetalert2";

import SchoolIcon from "../../icons/Schoolcon";
import DownloadIcon from "../../icons/DownloadIcon";
import { obtenerCapacitacionAgrupadaPorAnioyMes } from "../../services/transporteService";
import { TrainingPerMonth } from "../../components/TransortTraining/TrainingPerMonth";
import { FooterIndicators } from "../managementIndicators/FooterIndicators";

// crear array con años desde el 2024 hasta la actualidad
const anios = Array.from(
  { length: new Date().getFullYear() - 2024 + 1 },
  (_, i) => new Date().getFullYear() - i
);

const currentYear = new Date().getFullYear();



export const TransportTrainingMain = () => {

  const { anio } = useParams();
  const navigate = useNavigate();
  const [capacitaciones, setCapacitaciones] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalCapacitaciones, setTotalCapacitaciones] = useState(0);



  const onChangeAnio = (e) => {
    const anio = e.target.value;
    navigate(`/transportation/training/${anio}`);
  }

  useEffect(() => {
    if (!anio) {
      navigate(`/transportation/training/${currentYear}`);
    }
  }, [anio, navigate]);

  useEffect(() => {
    try {
      setIsLoading(true);
      const getCapacitaciones = async () => {

        const data = await obtenerCapacitacionAgrupadaPorAnioyMes({ anio });
        setCapacitaciones(data);
      }
      getCapacitaciones();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al obtener las capacitaciones",
        text: error.response.data.message,
      });
    } finally {
      setIsLoading(false);
    }
  }, [anio]);

  useEffect(() => {
    if (capacitaciones.length > 0) {
      setTotalCapacitaciones(capacitaciones.reduce((acc, curr) => acc + curr.Q_Capacita_Cantidad, 0));
    } else {
      setTotalCapacitaciones(0);
    }
  }, [capacitaciones]);

  return (
    <>
      <Header />
      <div className="ps-3 mb-0">
        <Breadcrumb>
          <Breadcrumb.Item active>SubGerencia de Educación y Seguridad Vial</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <hr />

      <div className="container mb-3">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8">
            <div className="d-flex align-items-center">
              <SchoolIcon className="me-2 mb-1" width={36} height={36} />
              <h3>
                Capacitaciones viales
              </h3>
            </div>
            <small className="text-muted">
              Capacitaciones viales realizadas por la Subgerencia de Seguridad y Educación Vial
            </small>
            <div className="d-flex align-items-center mt-3 gap-3 justify-content-between bg-white p-3 border rounded" >
              <h5 className="text-muted">{totalCapacitaciones} personas capacitadas</h5>

              <div className="d-flex align-items-center gap-2" style={{ width: "200px" }}>
                <span className="text-muted">Año:</span>


                <select className="form-select" onChange={onChangeAnio} value={anio}>

                  {anios.map((anio) => (
                    <option key={anio} value={anio} defaultValue={anio === currentYear}>
                      {anio}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="d-flex justify-content-end mt-3">
            <button className="btn btn-primary d-flex align-items-center gap-2" disabled={isLoading || capacitaciones.length === 0}>
              Exportar
              <DownloadIcon width={16} height={16} />
            </button>
            </div>

            

            {isLoading ? <div className="d-flex justify-content-center align-items-center">
              <div className="spinner-border text-primary" role="status">
                <span className="">Loading...</span>
              </div>
            </div> : <TrainingPerMonth capacitaciones={capacitaciones} />}
          </div>

        </div>

      </div>

              <FooterIndicators />

    </>
  );
}

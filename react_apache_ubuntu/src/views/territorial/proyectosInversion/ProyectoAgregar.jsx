import { Breadcrumb } from "react-bootstrap";
import Header from "../../../components/Header";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { agregarProyectoInversion, obtenerProductoProyectoNombre, obtenerResumenProductoProyecto } from "../../../services/siafService";
import ArrowRightIcon from "../../../icons/ArrowRight";
import Swal from "sweetalert2";

import { Toast } from "../../../components/tools/PopMessage";


export const ProyectoAgregar = ({ano_eje = 2025}) => {

  const { cui } = useParams();
  const navigate = useNavigate();
  const [proyectoNombre, setProyectoNombre] = useState("");
  const [resumen, setResumen] = useState({});
  const [programacionPresupuestal, setProgramacionPresupuestal] = useState({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0 });
  const [programacionFisica, setProgramacionFisica] = useState({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0 });

  useEffect(() => {
    if (cui) {
      const obtenerNombre = async () => {
        const response = await obtenerProductoProyectoNombre({ ano_eje: ano_eje, producto_proyecto: cui });
        setProyectoNombre(response?.producto_proyecto_nombre)        
      }
      obtenerNombre();

    }
  }, [cui, ano_eje]);


  useEffect(() => {
    if (cui) {
      const obtenerResumen = async () => {
        const response = await obtenerResumenProductoProyecto({ ano_eje: ano_eje, producto_proyecto: cui });
        setResumen(response);
      }
      obtenerResumen();
    }
  }, [cui, ano_eje]);


  const createJsonforSave = () => {

    // Quiero que el json tenga el siguiente formato:

    // {
    //   "ano_eje": 2025,
    //   "c_proinv_codigo": "CUI",
    //   "n_proinv_nombre": "Nombre del proyecto",
    //   "programacion": [
    //    m_prgpro_mes: 1,
    //    q_prgpro_financ: 100000
    //    p_prgpro_fisica: 100000
    //   ]
    // }

    const programacion = [];
    for (let i = 1; i <= 12; i++) {
      programacion.push({
        m_prgpro_mes: i,
        q_prgpro_financ: programacionPresupuestal[i],
        p_prgpro_fisica: programacionFisica[i]
      })
    }

    const json = {
      ano_eje: ano_eje,
      c_proinv_codigo: cui,
      n_proinv_nombre: proyectoNombre,
      programacion: programacion
    }

    return json;
  }

  const saveProyecto = async () => {

    try {
      const json = createJsonforSave();
      await agregarProyectoInversion(json);

      
      Toast.fire({
        icon: "success",
        title: "Proyecto agregado correctamente",
        background: "#F4F6F6",
        timer: 1500,
      });    
      navigate(-1);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error agregando proyecto",
        text: error.message,
      });
    }
    
    
  }

  return (
    <div>
      <Header />
      <div className="ps-3">
        <Breadcrumb>
          <Breadcrumb.Item active>Territorial</Breadcrumb.Item>
          <Breadcrumb.Item active>Proyectos de inversión</Breadcrumb.Item>          
        </Breadcrumb>
      </div>
      <hr className="p-0 m-0" />
      
      <div className="container my-2">
       {/* Aca se renderiza el formulario de agregar proyecto */}
       <div className="row justify-content-center ">
         <div className="col-12 col-lg-10">
           <div className="d-flex align-items-center mb-0">
             <button
               className="btn btn-outline-secondary pb-2 me-2"
              //  style={{ textDecoration: 'none', fontSize: '1.2rem' }}
               onClick={() => navigate(-1)}
               title="Regresar"
             >
               <ArrowRightIcon width={20} height={20} style={{ transform: 'rotate(180deg)' }} />
             </button>
             <h3 className="mb-0">Agregar nuevo proyecto</h3>
           </div>
           <div className="text-muted mb-3">Complete la información del proyecto</div>

           {/* Información básica */}
           <div className="card mb-3">
             <div className="card-body">
               <h6 className="fw-bold mb-3">Información básica</h6>
               <div className="mb-3">
                 <label className="form-label">Código del proyecto (CUI)</label>
                 <input type="text" className="form-control" value={cui} disabled />
               </div>
               <div>
                 <label className="form-label">Descripción del proyecto</label>
                 <textarea className="form-control" value={proyectoNombre} disabled rows={2} />
               </div>
             </div>
           </div>

           {/* Ejecución del gasto presupuestal */}
           <div className="card mb-3">
             <div className="card-body">
               <h6 className="fw-bold mb-3">Ejecución del gasto presupuestal</h6>
               <div className="d-flex flex-wrap justify-content-between text-center">
                 {[
                   { label: 'PIA', value: resumen?.MONTO_PIA },
                   { label: 'PIM', value: resumen?.MONTO_PIM },
                   { label: 'Certificación anual', value: resumen?.MONTO_CERTIFICADO },
                   { label: 'Compromiso anual', value: resumen?.MONTO_COMPROMETIDO_ANUAL },
                   { label: 'Devengado', value: resumen?.MONTO_DEVENGADO },
                 ].map(({ label, value }) => (
                   <div key={label} className="mb-2">
                     <div className="text-muted small m-0 p-0">{label}</div>
                     <div className="m-0 p-0">
                       S/ {Number(value || 0).toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                     </div>
                   </div>
                 ))}
               </div>
             </div>
           </div>

           {/* Programación presupuestal anual */}
           <div className="card mb-3">
             <div className="card-body">
               <h6 className="fw-bold mb-2">Programación presupuestal anual</h6>
               <div className="text-muted mb-2" style={{ fontSize: '0.95em' }}>Ingrese los montos presupuestales programados para cada mes (en soles)</div>
               <div className="row g-2">
                 {['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'].map((mes, idx) => (
                   <div className="col-6 col-md-3" key={mes}>
                     <label className="form-label small">{mes}</label>
                     <input
                       type="number"
                       className="form-control"
                       min="0"
                       step="0.01"
                       value={programacionPresupuestal[idx + 1] === 0 ? "" : programacionPresupuestal[idx + 1]}
                       onChange={e =>
                         setProgramacionPresupuestal({
                           ...programacionPresupuestal,
                           [idx + 1]: e.target.value === "" ? 0 : Number(e.target.value)
                         })
                       }
                     />
                   </div>
                 ))}
               </div>
               <div className="d-flex justify-content-end mt-2">
                 <span className="fw-bold">Total programado</span>
                 <span className="ms-2">
                   S/ {Object.values(programacionPresupuestal).reduce((total, mes) => total + (Number(mes) || 0), 0).toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                 </span>
               </div>
             </div>
             
           </div>

           {/* Programación física anual */}
           <div className="card mb-3">
             <div className="card-body">
               <h6 className="fw-bold mb-2">Programación física anual</h6>
               <div className="text-muted mb-2" style={{ fontSize: '0.95em' }}>Ingrese el porcentaje de avance físico programado para cada mes (debe sumar 100%)</div>
               <div className="row g-2">
                 {['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'].map((mes, idx) => (
                   <div className="col-6 col-md-3" key={mes}>
                     <label className="form-label small">{mes}</label>
                     <div className="input-group">
                       <input type="number" className="form-control" min="0" max="100" step="0.01" value={programacionFisica[idx + 1] === 0 ? "" : programacionFisica[idx + 1]} onChange={e =>
                         setProgramacionFisica({
                           ...programacionFisica,
                           [idx + 1]: e.target.value === "" ? 0 : Number(e.target.value)
                         })
                       } />
                       <span className="input-group-text">%</span>
                     </div>
                   </div>
                 ))}
               </div>
               <div className="d-flex justify-content-end mt-2">
                 <span className="fw-bold">Total programado</span>
                 <span className="ms-2">
                   {Object.values(programacionFisica).reduce((total, mes) => total + (Number(mes) || 0), 0)}%
                 </span>
               </div>
             </div>             
           </div>

           {/* Botones */}
           <div className="d-flex justify-content-end mt-3">
             <button className="btn btn-outline-secondary me-2" onClick={() => navigate(-1)}>Cancelar</button>
             <button className="btn btn-primary" onClick={saveProyecto}>Guardar proyecto</button>
           </div>
         </div>
       </div>
      </div>

    </div>
  )
}

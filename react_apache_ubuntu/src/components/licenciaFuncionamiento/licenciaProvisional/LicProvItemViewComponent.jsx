import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Alert, Button } from "react-bootstrap";
import Swal from "sweetalert2";

import { transformarFecha } from "../../../utils/varios";
import { deleteLicProvPorId, obtenerLicProvPorId } from "../../../services/licFuncService";
import { setCurrentLicProv } from "../../../store/slices";


export const LicProvItemViewComponent = ({ permiso, index }) => {
  const {
    C_LicProv, 
    C_LicProv_Tipo,
    M_LicProv_Nro,
    M_LicProv_Renov,
    n_titular,
    N_Rubro_Descrip,
    C_Ubica_Codigo,
    N_Ubica_Descrip,
    D_LicProv_FecEmi,
    D_LicProv_FinVig,
    n_tipdoc,
    M_LicProv_TitNroDoc,
    N_Rubro_Dimension,
    N_LicProv_HorAte,
    C_Exped,
    C_Exped_Anio,
    N_Imagen_Base64,
    N_LicProv_Formato,
    N_LicProv_CerGas,
    T_LicProv_Obs,
    F_LicProv_Anula,
    T_Anula_Motivo
  } = permiso;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const urlDownloadLicProv = `${process.env.REACT_APP_API}/licfunc/lic-prov-imprimir/${C_LicProv}`;

  const onClicEditar = async (event) => {
    event.preventDefault();
    
    const licProv = await obtenerLicProvPorId(C_LicProv);
    dispatch(setCurrentLicProv(licProv));
    navigate(`/licencia/provisional/gestionar/${C_LicProv_Tipo}/2`);
  };

  const onClicDelete = async (event) => {
    event.preventDefault();

    let messageWarning = `¿Seguro de eliminar la licencia provisional ${M_LicProv_Nro.toString().padStart(4, "0")}?`;
    if (M_LicProv_Renov){
      messageWarning += `- Renovación ${M_LicProv_Renov.toString().padStart(4, "0")}`;
    }

    const result = await Swal.fire({
      title: messageWarning,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "No",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      await deleteLicProvPorId(C_LicProv)

      const resultOk = await Swal.fire({
        icon: "success",
        title: "Licencia provisional",
        text: "Licencia provisional eliminada correctamente",
      });

      if (resultOk.isConfirmed) {        
        window.location.reload();
      }
    }

  };


  return (
    <>

    {F_LicProv_Anula && ( <Alert variant="danger">
         {T_Anula_Motivo}
        </Alert>)}
     
      {M_LicProv_Renov ? (
        <>
        <h5>Renovación {M_LicProv_Renov.toString().padStart(4, "0")}</h5>        
        </>
      ) : (
        <h5>Autorización inicial</h5>
      )}

      <div className="display-grid">
        <div>
          <p className="text-muted pb-0 mb-0 mt-2">
            <small className="mb-0 pb-0">Titular</small>
          </p>
          {n_titular?.toString().replace("-", " ")}
        </div>
        <div>
          {" "}
          <p className="text-muted pb-0 mb-0 mt-2">
            <small className="mb-0 pb-0">Rubro</small>
          </p>
          <p className="m-0 p-0 max-two-lines">{N_Rubro_Descrip}</p>
        </div>
        <div>
          {" "}
          <p className="text-muted pb-0 mb-0 mt-2">
            <small className="mb-0 pb-0">Ubicación</small>
          </p>
          <p className="mt-0 pt-0">
            <small>{C_Ubica_Codigo}</small> {N_Ubica_Descrip}
          </p>
        </div>
        <div>
          {" "}
          <p className="text-muted pb-0 mb-0 mt-2">
            <small className="mb-0 pb-0">Fecha de emisión aaaa</small>
          </p>
          {transformarFecha(D_LicProv_FecEmi).substring(0, 10)}
        </div>
        <div>
          {" "}
          <p className="text-muted pb-0 mb-0 mt-2">
            <small className="mb-0 pb-0">Fecha de vencimiento</small>
          </p>
          {transformarFecha(D_LicProv_FinVig).substring(0, 10)}
        </div>

        <div>
          {" "}
          <p className="text-muted pb-0 mb-0 mt-2">
            <small className="mb-0 pb-0">{n_tipdoc}</small>
          </p>
          {M_LicProv_TitNroDoc}
        </div>
        <div>
          <p className="text-muted pb-0 mb-0 mt-2">
            <small className="mb-0 pb-0">Dimensiones</small>
          </p>
          {N_Rubro_Dimension}
        </div>
        <div>
          {" "}
          <p className="text-muted pb-0 mb-0 mt-2">
            <small className="mb-0 pb-0">Horario de atención</small>
          </p>
          {N_LicProv_HorAte}
        </div>
        <div>
          <p className="text-muted pb-0 mb-0 mt-2">
            <small className="mb-0 pb-0">Expediente</small>
          </p>
          {C_Exped}-{C_Exped_Anio}
        </div>
        <div
          style={{
            gridRow: "2 / span 3",
            gridColumn: "5",
          }}
        >
          <p className="text-muted pb-0 mb-0 mt-2">
            <small className="mb-0 pb-0">Imagen</small>
          </p>
          <img
            src={`data:image/jpeg;base64,${N_Imagen_Base64}`}
            alt=""
            style={{ maxWidth: "128px" }}
          />
        </div>

        <div>
          {" "}
          <p className="text-muted pb-0 mb-0 mt-2">
            <small className="mb-0 pb-0">Número de formato</small>
          </p>
          {N_LicProv_Formato}
        </div>
        <div style={{ gridColumn: "2 / span 3" }}>
          <p className="text-muted pb-0 mb-0 mt-2">
            <small className="mb-0 pb-0">
              Certificado de mantenimiento de gas
            </small>
          </p>
          {N_LicProv_CerGas}
        </div>

        <div style={{ gridColumn: "1 / span 4" }}>
          <p className="text-muted pb-0 mb-0 mt-2">
            <small className="mb-0 pb-0">Observaciones</small>
          </p>
          {T_LicProv_Obs}
        </div>
      </div>

      { !F_LicProv_Anula && index === 0 && (
        <div className="d-flex justify-content-sm-start justify-content-center flex-wrap gap-2 my-4">
          <Button variant="primary" onClick={onClicEditar} >Modificar <i className="fas fa-edit"></i></Button>
          {/* <Button variant="primary" >Renovar <i className="fas fa-sync-alt"></i></Button> */}
          <Button variant="primary" href={urlDownloadLicProv} target="_blank"
          rel="noreferrer" > Imprimir <i className="fas fa-print"></i></Button>

          {/* <Button variant="outline-danger" >Anular <i className="fas fa-window-close"></i></Button> */}
          <Button variant="outline-danger" onClick={onClicDelete} >Eliminar <i className="fas fa-trash-alt"></i></Button>
        </div>

      )}
      {
        M_LicProv_Renov && (<hr className="pt-0 mt-0" />)        
      }
      
    </>
  );
};

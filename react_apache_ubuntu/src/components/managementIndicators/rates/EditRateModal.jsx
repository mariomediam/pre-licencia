import { useEffect, useState, useRef } from "react";
import Swal from "sweetalert2";
import AsyncSelect from "react-select/async";
import { Modal, Button, Spinner, Form, InputGroup } from "react-bootstrap";
import EditIcon from "../../../icons/EditIcon";
import { SelectDependencia } from "../../../services/tradocService";
import { UpdateTasa } from "../../../services/indicatorsService";

// import { buscarCartaOrden } from "../../../../../services/siafService";
// import { TrustFormatModalItemComponent } from "./TrustFormatModalItemComponent";

export const EditRateModal = ({
  show,
  handleClose,
  rateSelected,
  handleBuscar,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const debounceRef = useRef(null);
  const [dependenciasSelected, setDependenciasSelected] = useState({});

  useEffect(() => {
    setDependenciasSelected({});
  }, [show]);


  const updateTasa = async () => {
    try {
      setIsLoading(true);
      await UpdateTasa({ c_tasa: rateSelected.C_Tasa, dependencia: dependenciasSelected.value });
      handleClose();
      handleBuscar();
    } catch (error) {
      setIsLoading(false);
      Swal.fire({
        icon: "error",
        title: "Error actualizando tasa",
        text: error.response.data.message,
      });
    } finally {
      setIsLoading(false);
    }

  };


  const getDependencias = async (inputValue) => {

    if (!inputValue) {
      return [];
    }
    const data = await SelectDependencia({ ano: 2026, field: "NOMBRE", valor: inputValue, solo_activas: 1 });
    const dependencias = data.map(({ c_depend, n_depend_descripcion }) => ({
      value: c_depend,
      label: `${c_depend} - ${n_depend_descripcion}`,
    }));
    return dependencias;
  };

  const promiseOptions = (inputValue) => {
    return new Promise((resolve) => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      debounceRef.current = setTimeout(async () => {
        const data = await getDependencias(inputValue);
        resolve(data);
      }, 1500);
    });
  };



  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="d-flex align-items-center">
            <EditIcon className="me-2" />
            Editar tasa
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <h5 className="mb-0">{rateSelected.N_Tasa_Descrip} <small className="text-muted mt-0 pt-0">(Cod tasa: {rateSelected.C_Tasa_SATP})</small></h5>


          <div className="mt-2">
            <small className="text-muted mb-2">Oficina responsable</small>
            <AsyncSelect
              placeholder=""
              isClearable
              noOptionsMessage={() => "Registro no encontrado"}
              loadOptions={promiseOptions}
              onChange={setDependenciasSelected}
              value={dependenciasSelected}
            // menuPortalTarget={document.body}
            />            
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleClose}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={updateTasa}
            disabled={isLoading || !dependenciasSelected.value}
          >

            Grabar

          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

import { useState, useMemo, useEffect } from "react";
import { Form, Modal, Button, Spinner } from "react-bootstrap";
// import { Dropzone, FileMosaic } from "@files-ui/react";
import Swal from "sweetalert2";

import { ReactComponent as FileUpload } from "../../../assets/images/svg/file-upload.svg";
import {
  obtenerTributoTipoOperacion,
  agregarOpeFin,
  actualizarOpeFin,
} from "../../../services/tesoreroService";
import { obtenerNombreMes } from "../../../utils/varios";
// import { obtenerNombreMes } from "../../../utils/varios";
// import { UploadTributoArchivo } from "../../../services/tesoreroService";
import { Toast } from "../../tools/PopMessage";

const mes = [];

for (let i = 1; i < 13; i++) {
  mes.push(i);
}

export const TributoContribSaldoInicialModalComponent = ({
  show,
  handleClose,
  listTributoContribSelected,
  anioSelected,
  inputContribuyente,
  buscarTributoContrib,
}) => {
  const accion = listTributoContribSelected.length > 0 ? "Editar" : "Agregar";

  const [isSaving, setIsSaving] = useState(false);

  const initialValue = useMemo(
    () => ({
      C_TipOpe: "02",
      D_Fecha: Date.now(),
      C_Contrib: "",
      N_Contrib: "",
      C_Partida: "",
      N_Partida: "",
      M_Anio: 0,
      Q_Monto: 0.0,
      C_CtaCon: "",
      M_Recibo: "",
      N_BasLeg: "",
      M_Archivo_Anio: anioSelected,
      M_Archivo_Mes: 1,
    }),
    [anioSelected]
  );

  const [dataOpeFin, setdataOpeFin] = useState(
    listTributoContribSelected.length === 0 ? initialValue : {}
  );

  const [listTipoTributo, setListTipoTributo] = useState([]);

  const [tributo] = listTributoContribSelected;

  console.log("dataOpeFin", dataOpeFin);

  const mappingTables = useMemo(() => ({
    "01": {
      C_SalIni_Contrib: "C_Contrib",
      N_SalIni_Contrib: "N_Contrib",
      C_TipOpe: "C_TipOpe",
      M_Archivo_Anio: "M_Archivo_Anio",
      M_Archivo_Mes: "M_Archivo_Mes",
      M_SalIni_Anio: "M_Anio",
      Q_SalIni_Monto: "Q_Monto",
      C_SalIni_Partida: "C_Partida",
      N_SalIni_Partida: "N_Partida",
      C_SalIni_CtaCon: "C_CtaCon",
    },
    "02": {
      C_Emision_Contrib: "C_Contrib",
      N_Emision_Contrib: "N_Contrib",
      C_Emision_Partida: "C_Partida",
      N_Emision_Partida: "N_Partida",
      Q_Emision_Monto: "Q_Monto",
      C_Emision_CtaCon: "C_CtaCon",
      C_TipOpe: "C_TipOpe",
      M_Archivo_Anio: "M_Archivo_Anio",
      M_Archivo_Mes: "M_Archivo_Mes",
    },
    "03": {
      D_Alta: "D_Fecha",
      C_Alta_Contrib: "C_Contrib",
      N_Alta_Contrib: "N_Contrib",
      M_Alta_Anio: "M_Anio",
      C_Alta_Partida: "C_Partida",
      N_Alta_Partida: "N_Partida",
      Q_Alta_Monto: "Q_Monto",
      C_Alta_CtaCon: "C_CtaCon",
      C_TipOpe: "C_TipOpe",
      M_Archivo_Anio: "M_Archivo_Anio",
      M_Archivo_Mes: "M_Archivo_Mes",
    },
    "04": {
      D_Baja: "D_Fecha",
      C_Baja_Contrib: "C_Contrib",
      N_Baja_Contrib: "N_Contrib",
      M_Baja_Anio: "M_Anio",
      C_Baja_Partida: "C_Partida",
      N_Baja_Partida: "N_Partida",
      Q_Baja_Monto: "Q_Monto",
      C_Baja_CtaCon: "C_CtaCon",
      C_TipOpe: "C_TipOpe",
      M_Archivo_Anio: "M_Archivo_Anio",
      M_Archivo_Mes: "M_Archivo_Mes",
    },
    "05": {
      D_Recaud: "D_Fecha",
      C_Recaud_Contrib: "C_Contrib",
      N_Recaud_Contrib: "N_Contrib",
      C_Recaud_Partida: "C_Partida",
      N_Reacud_Partida: "N_Partida",
      M_Recaud_Anio: "M_Anio",
      Q_Recaud_Monto: "Q_Monto",
      C_Recaud_CtaCon: "C_CtaCon",
      M_Recaud_Recibo: "M_Recibo",
      C_TipOpe: "C_TipOpe",
      M_Archivo_Anio: "M_Archivo_Anio",
      M_Archivo_Mes: "M_Archivo_Mes",
    },
    "06": {
      D_Benefi_Pago: "D_Fecha",
      C_Benefi_Contrib: "C_Contrib",
      N_Benefi_Contrib: "N_Contrib",
      C_Benefi_Partida: "C_Partida",
      N_Benefi_Partida: "N_Partida",
      M_Benefi_Anio: "M_Anio",
      Q_Benefi_Monto: "Q_Monto",
      C_Benefi_CtaCon: "C_CtaCon",
      M_Benefi_Recibo: "M_Recibo",
      N_Benefi_BasLeg: "N_BasLeg",
      C_TipOpe: "C_TipOpe",
      M_Archivo_Anio: "M_Archivo_Anio",
      M_Archivo_Mes: "M_Archivo_Mes",
    },
  }), []);

  const updatedataOpeFin = (nameColumn, value) => {
    setdataOpeFin({ ...dataOpeFin, [nameColumn]: value });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await obtenerTributoTipoOperacion();
        setListTipoTributo(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (accion === "Agregar" && show) {
      setdataOpeFin(initialValue);
    }

    if (accion === "Editar" && show) {
      let data = {};

      const tipOpe = tributo.C_TipOpe;

      Object.keys(tributo).forEach((key) => {
        if (mappingTables[tipOpe].hasOwnProperty(key)) {
          data[mappingTables[tipOpe][key]] = tributo[key];
        } else {
          data[key] = tributo[key];
        }
      });

      setdataOpeFin(data);
    }
  }, [accion, initialValue, show, mappingTables, tributo]);

  if (!show) return <></>;

  const saveTributo = async () => {
    try {
      setIsSaving(true);
      if (accion === "Agregar"){
        await agregarOpeFin(dataOpeFin);
      }
      if (accion === "Editar"){
        await actualizarOpeFin(dataOpeFin.C_OpeFin, dataOpeFin.C_Archivo, dataOpeFin);
      }
      inputContribuyente.current.value = dataOpeFin.C_Contrib;
      await buscarTributoContrib();

      Toast.fire({
        icon: "success",
        title: `Se grabo correctamente`,
        background: "#F4F6F6",
        timer: 1500,
      });

      handleClose();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error subiendo archivo",
        text: JSON.stringify(error?.response?.data?.message),
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="d-flex align-items-center">
            <FileUpload /> {accion} operación financiera
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* ************** AÑO ************** */}
          <small className="text-muted">Año</small>
          <p className="mb-2">{anioSelected}</p>

          {/* ************** TIPO DE OPERACION ************** */}
          <small className="text-muted">Tipo de tributo</small>
          <Form.Select
            aria-label="Default select example"
            className="mb-2"
            value={dataOpeFin.C_TipOpe || "01"}
            // defaultValue={dataOpeFin.C_TipOpe || "01"}
            onChange={(e) => {
              updatedataOpeFin("C_TipOpe", e.target.value);
            }}
            disabled={isSaving || accion === "Editar"}
          >
            {listTipoTributo.map((item) => (
              <option key={item.C_TipOpe} value={item.C_TipOpe}>
                {item.N_TipOpe}
              </option>
            ))}
          </Form.Select>

          {/* ************** MES ************** */}
          <small className="text-muted">Mes</small>
          <Form.Select
            aria-label="Default select example"
            className="mb-2"
            onChange={(e) => {
              updatedataOpeFin("M_Archivo_Mes", e.target.value);
            }}
            value={dataOpeFin.M_Archivo_Mes || 1}
            disabled={isSaving || accion === "Editar"}
          >
            {mes.map((item) => (
              <option key={item} value={item}>
                {obtenerNombreMes(item)}
              </option>
            ))}
          </Form.Select>

          {/* ************** CONTRIBUYENTE ************** */}
          <small className="text-muted">Contribuyente</small>
          <div className="col-4 mb-1">
            <Form.Control
              type="text"
              placeholder="Código"
              maxLength={11}
              onChange={(e) => {
                updatedataOpeFin("C_Contrib", e.target.value);
              }}
              value={dataOpeFin.C_Contrib || ""}
              disabled={isSaving}
            />
          </div>
          <Form.Control
            type="text"
            placeholder="Nombre"
            maxLength={150}
            className="mb-2"
            onChange={(e) => {
              updatedataOpeFin("N_Contrib", e.target.value);
            }}
            value={dataOpeFin.N_Contrib || ""}
            disabled={isSaving}
          />

          {/* ************** PARTIDA ************** */}
          <small className="text-muted">Partida</small>
          <div className="col-4 mb-1">
            <Form.Control
              type="text"
              placeholder="Código"
              maxLength={20}
              onChange={(e) => {
                updatedataOpeFin("C_Partida", e.target.value);
              }}
              value={dataOpeFin.C_Partida || ""}
              disabled={isSaving}
            />
          </div>
          <Form.Control
            type="text"
            placeholder="Descripción"
            maxLength={100}
            className="mb-2"
            onChange={(e) => {
              updatedataOpeFin("N_Partida", e.target.value);
            }}
            value={dataOpeFin.N_Partida || ""}
            disabled={isSaving}
          />

          {/* ************** CUENTA CONTABLE ************** */}
          <small className="text-muted">Cuenta contable</small>
          <div className="col-4 mb-1">
            <Form.Control
              type="text"
              placeholder="Código"
              maxLength={20}
              onChange={(e) => {
                updatedataOpeFin("C_CtaCon", e.target.value);
              }}
              value={dataOpeFin.C_CtaCon || ""}
              disabled={isSaving}
            />
          </div>

          {/* ************** MONTO ************** */}
          <small className="text-muted">Monto</small>
          <div className="col-4 mb-1">
            <Form.Control
              type="Number"
              placeholder="0.00"
              min={0.01}
              onChange={(e) => {
                updatedataOpeFin("Q_Monto", e.target.value);
              }}
              value={dataOpeFin.Q_Monto || ""}
              disabled={isSaving}
            />
          </div>

          {dataOpeFin.C_TipOpe !== "02" && (
            <>
              {/* ************** AÑO ************** */}
              <small className="text-muted">Año</small>
              <div className="col-4 mb-1">
                <Form.Control
                  type="number"
                  placeholder="Año"
                  maxLength={4}
                  min={2020}
                  max={new Date().getFullYear()}
                  onChange={(e) => {
                    updatedataOpeFin("M_Anio", e.target.value);
                  }}
                  value={dataOpeFin.M_Anio || ""}
                  disabled={isSaving}
                />
              </div>
            </>
          )}

          {["05", "06"].includes(dataOpeFin.C_TipOpe) && (
            <>
              {/* ************** RECIBO ************** */}
              <small className="text-muted">Recibo</small>
              <div className="col-4 mb-1">
                <Form.Control
                  type="text"
                  placeholder="Número de recibo"
                  maxLength={15}
                  onChange={(e) => {
                    updatedataOpeFin("M_Recibo", e.target.value);
                  }}
                  value={dataOpeFin.M_Recibo || ""}
                  disabled={isSaving}
                />
              </div>
            </>
          )}

          {!["01", "02"].includes(dataOpeFin.C_TipOpe) && (
            <>
              {/* ************** FECHA ************** */}
              <small className="text-muted">Fecha</small>
              <div className="col-4 mb-1">
                <Form.Control
                  type="date"
                  onChange={(e) => {
                    updatedataOpeFin(
                      "D_Fecha",
                      new Date(e.target.value).toISOString().slice(0, 10)
                    );
                  }}
                  value={dataOpeFin.D_Fecha || ""}
                  disabled={isSaving}
                />
              </div>
            </>
          )}

          {["06"].includes(dataOpeFin.C_TipOpe) && (
            <>
              {/* ************** BASE LEGAL ************** */}
              <small className="text-muted">Base legal</small>

              <Form.Control
                type="text"
                placeholder="Base legal"
                maxLength={150}
                onChange={(e) => {
                  updatedataOpeFin("N_BasLeg", e.target.value);
                }}
                value={dataOpeFin.N_BasLeg || ""}
                disabled={isSaving}
              />
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} disabled={isSaving}>
            Cancelar
          </Button>
          <Button variant="primary" disabled={isSaving} onClick={saveTributo}>
            {isSaving ? (
              <>
                <Spinner
                  animation="border"
                  role="status"
                  size="sm"
                  className="me-2"
                />
                Grabando
              </>
            ) : (
              "Guardar"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

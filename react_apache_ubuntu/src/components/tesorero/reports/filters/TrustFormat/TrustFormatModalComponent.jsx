import { useEffect, useState } from "react";
import { Modal, Button, Spinner, Form, InputGroup } from "react-bootstrap";
import FileSearchIcon from "../../../../../icons/FileSearchIcon";
// import { Dropzone, FileMosaic } from "@files-ui/react";
import Swal from "sweetalert2";
import { buscarCartaOrden } from "../../../../../services/siafService";
import { TrustFormatModalItemComponent } from "./TrustFormatModalItemComponent";

// import { ReactComponent as FileUpload } from "../../../assets/images/svg/file-upload.svg";
// import { obtenerNombreMes } from "../../../utils/varios";
// import { UploadTributoArchivo } from "../../../services/tesoreroService";
// import { Toast } from "../../tools/PopMessage";

export const TrustFormatModalComponent = ({
  show,
  handleClose,
  // anioSelected,
  // tipOpeSelected,
  // NTipOpe,
  // periodosDisponibles,
  // fetchTributoArchivo,
  // fetchTributoPeriodosDisponibles,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [cartasSearched, setCartasSearched] = useState([]);
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    if (!show) {
      setCartasSearched([]);
      setInputText("");
    }
  }, [show]);

  const searchCarta = async () => {
    try {
      if (inputText.length === 0) {
        return;
      }

      setIsLoading(true);
      const numero = inputText;
      const codigo = "118";
      const cartas = await buscarCartaOrden({ codigo, numero });
      // a cada carta se le agrega la propiedad isSelected = false y un key formado por las columnas ANO_EJE + EXPEDIENTE
      cartas.forEach((carta) => {
        carta.isSelected = false;
        carta.key = `${carta.ANO_EJE}-${carta.EXPEDIENTE}-${carta.CICLO}-${carta.FASE}-${carta.SECUENCIA}-${carta.CORRELATIVO}`;
      });     

      setCartasSearched(cartas);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error buscando carta orden",
        text: JSON.stringify(error?.response?.data?.message),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const selectCarta = (key) => {
    const cartas = cartasSearched.map((carta) => {
      if (carta.key === key) {
        carta.isSelected = !carta.isSelected;
      }
      return carta;
    });
   
    setCartasSearched(cartas);
  };

  const existeCartaSeleccionada = () => {
    return cartasSearched.some((carta) => carta.isSelected);
  };

  //     const [files, setFiles] = useState([]);
  //   const [isSaving, setIsSaving] = useState(false);
  //   const selectMes = useRef();

  //   const readFile = (incommingFiles) => {
  //     setFiles(incommingFiles);
  //   };

  //   const removeFile = (id) => {
  //     setFiles(files.filter((x) => x.id !== id));
  //   };

  //   const uploadFile = async () => {
  //     try {
  //       setIsSaving(true);
  //       if (files.length > 0) {
  //         const archivo = files[0].file;
  //         const tipo = tipOpeSelected;
  //         const anio = anioSelected;
  //         const mes = selectMes?.current?.value;

  //         await UploadTributoArchivo({ tipo, anio, mes, archivo });

  //         Toast.fire({
  //           icon: "success",
  //           title: `Archivo subido correctamente`,
  //           background: "#F4F6F6",
  //           timer: 1500,
  //         });
  //         fetchTributoArchivo();
  //         handleClose();
  //         fetchTributoPeriodosDisponibles();
  //       }
  //     } catch (error) {
  //       Swal.fire({
  //         icon: "error",
  //         title: "Error subiendo archivo",
  //         text: JSON.stringify(error?.response?.data?.message),
  //       });
  //     } finally {
  //       setIsSaving(false);
  //     }
  //   };

  //   useEffect(() => {
  //     setFiles([]);
  //   }, [show]);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="d-flex align-items-center">
            <FileSearchIcon className="me-2" />
            Buscar carta orden
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="inputCarta">
            <Form.Label className="text-muted">
              <small>Número de carta orden</small>
            </Form.Label>
            <InputGroup>
              <Form.Control
                type="text"
                aria-describedby="inputCarta"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="20250015"
              />
              <Button
                variant="primary"
                disabled={isLoading || inputText.trim().length === 0}
                onClick={searchCarta}
              >
                {isLoading ? (
                  <>
                    <Spinner
                      animation="border"
                      role="status"
                      size="sm"
                      className="me-2"
                    />
                    Buscando
                  </>
                ) : (
                  "Buscar"
                )}
              </Button>
            </InputGroup>
          </Form.Group>

          <div>
            {cartasSearched.map((item, index) => (
                    <TrustFormatModalItemComponent
                      key={index}
                      cartaOrden={item}       
                      selectCarta={selectCarta}               
                    />
                  ))}
          </div>

          

          {/* <small className="text-muted">Año</small>
          <p>{anioSelected}</p>

          

          <small className="text-muted">Tipo de operación financiera</small>
          <p>{NTipOpe}</p>

          {periodosDisponibles.length > 0 && tipOpeSelected !== "02" && (
            <>
              <small className="text-muted">Mes</small>
              <select
                className="form-select mb-3"
                aria-label="Meses disponibles"
                ref={selectMes}
                disabled={isSaving}
              >
                {periodosDisponibles.map((periodo) => (
                  <option
                    key={periodo.M_Archivo_Mes}
                    value={periodo.M_Archivo_Mes}
                  >
                    {obtenerNombreMes(periodo.M_Archivo_Mes)}
                  </option>
                ))}
              </select>
            </>
          )}
          <small className="text-muted">Archivo</small>
          <Dropzone
            onChange={readFile}
            value={files}
            maxFiles={1}
            label="Suelta el archivo aquí o haz clic para subirlo."
            accept=".xls, .xlsx"
            headerConfig={{ validFilesCount: false, deleteFiles: false }}
            footerConfig={{
              customMessage: "Solo se aceptan archivos de excel",
            }}
            localization="ES-es"
            multiple={false}
            behaviour={"replace"}
            disabled={isSaving}
          >
            {files.map((file) => (
              <FileMosaic key={file.id} {...file} onDelete={removeFile} info />
            ))}
          </Dropzone> */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} disabled={isLoading}>
            Cancelar
          </Button>
          <Button variant="primary" 
          // onClick={uploadFile} 
          disabled={isLoading || !existeCartaSeleccionada()}>
            {isLoading ? (
              <>
                <Spinner
                  animation="border"
                  role="status"
                  size="sm"
                  className="me-2"
                />
                Cargando
              </>
            ) : (
              "Agregar"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { Button, Card, Form, Modal } from "react-bootstrap";
import { v4 as uuidv4 } from 'uuid';
import Select from "react-select";


import { obtenerBBSSDisponibleOrden, obtenerBBSSDisponibleCuadro } from "../../../services/abastecService";
import { setCurrentRequerimientoAddItem } from "../../../store/slices";

export const RequeElaboraStepItemsAddComponent = ({
  show,
  handleClose,
  clasificador,
  C_biesertipo,
  C_anipre,
  f_libre = "",
}) => {

  const dispatch = useDispatch();

  // const [isLoading, setIsLoading] = useState(false);
  const [bbss, setBbss] = useState([]);
  const [bbssSelected, setBbssSelected] = useState({});
  const [bbssOptions, setBbssOptions] = useState([]);
  const [specifyBBSS, setSpecifyBBSS] = useState(false);

  const controlSelectBBSS = useRef(null);
  const controlInputPrecioUnit = useRef(null);
  const controlInputCantidad = useRef(null);
  const controlInputSubTotal = useRef(null);
  const controlCheckSpecifyBBSS = useRef(null);
  const controlInputSpecifyBBSS = useRef(null);

  const { C_clapre, C_secfun, C_depen, C_activpoi, C_objpoi, C_metapoi } =
    clasificador;

  const onChangeControlSelectBBSS = (e) => {
    if (e?.value) {
      const bbssSelectedTmp = bbss.find((bbss) => bbss.C_BIESER === e.value);

      if (bbssSelectedTmp) {
        setBbssSelected(bbssSelectedTmp);
      }
    }
  };

  const onBlurControlInputCantidad = (e) => {
    try {
      if (bbssSelected.F_unimed_decimal === true) {
        controlInputCantidad.current.value = Number(Math.round(e.target.value));
        calculaSubTotal();
      }
    } catch (error) {}
  };

  const calculaSubTotal = () => {
    try {
      if (controlInputPrecioUnit.current && controlInputCantidad.current) {
        const precioUnit = controlInputPrecioUnit.current.value;
        const cantidad = controlInputCantidad.current.value;
        const subTotal = precioUnit * cantidad;
        controlInputSubTotal.current.value = subTotal;
      } else {
        if (controlInputSubTotal.current) {
          controlInputSubTotal.current.value = 0.0;
        }
      }
    } catch (error) {
      if (controlInputSubTotal.current) {
        controlInputSubTotal.current.value = 0.0;
      }
    }
  };

  const onChangeControlCheckSpecifyBBSS = (e) => {
    setSpecifyBBSS(e.target.checked);
  };

  useEffect(() => {
    if (specifyBBSS && controlInputSpecifyBBSS.current) {
      controlInputSpecifyBBSS.current.focus();
    }
  }, [specifyBBSS]);

  useEffect(() => {
    // setIsLoading(true);
    const getBBSS = async () => {
      if (C_anipre && C_depen && C_biesertipo && C_clapre) {
        if (controlSelectBBSS.current) {
          controlSelectBBSS.current.clearValue();
        }

        if (f_libre.toString().trim().length === 0) {
          return
        }

        let data = []

        if (f_libre.toString().trim() === "1") {
          // REQUERIMIENTO LIBRE
          const file = "codigo";
            data = await obtenerBBSSDisponibleOrden(
            C_anipre,
            "",
            C_depen,
            C_biesertipo,
            file,
            C_clapre
          );
        }

        if (f_libre.toString().trim() === "0") {
          // REQUERIMIENTO DE CUADRO DE NECESIDADES
          const date = new Date();
          let currentMonth = (date.getMonth() + 1).toString();
          currentMonth = currentMonth.padStart(2, '0');
          
          const bbssCuadro = await obtenerBBSSDisponibleCuadro(
            {
              anio: C_anipre,              
              codDep: C_depen,
              bieSerTipo : C_biesertipo,
              mes: currentMonth,
              file: "descrip",
              bieser: "",
              clapre: undefined
            }
          );

          data = bbssCuadro.filter((bbss) => bbss.C_biesertipo === C_biesertipo && bbss.c_clapre.toString().trim() === C_clapre.toString().trim() && bbss.C_objpoi === C_objpoi && bbss.C_metapoi === C_metapoi && bbss.C_activpoi === C_activpoi)
        
        }

        setBbss(data || []);
      }
      // setIsLoading(false);
    };
    getBBSS();
  }, [C_anipre, C_depen, C_biesertipo, C_clapre, f_libre, C_activpoi, C_objpoi, C_metapoi]);

  useEffect(() => {
    if (bbss.length > 0) {
      const bbssTmp = bbss.map(
        ({ C_BIESER, N_BIESER_DESC, N_UNIMED_DESC, C_BIESERTIPO }) => {
          return {
            value: C_BIESER,
            label: `${
              C_BIESERTIPO === "01"
                ? `${N_BIESER_DESC} (${N_UNIMED_DESC})`
                : N_BIESER_DESC
            } `,
          };
        }
      );
      setBbssOptions(bbssTmp || []);
    } else {
      setBbssOptions([]);
    }
  }, [bbss]);

  useEffect(() => {
    if (controlInputPrecioUnit.current) {
      controlInputPrecioUnit.current.value = Number(
        bbssSelected.Q_BIESER_COSTO
      ).toFixed(2);
      if (controlInputCantidad.current) {
        controlInputCantidad.current.value = 0.0;
      }

      controlInputPrecioUnit.current.select();
    }
  }, [bbssSelected]);

  const onCloseModal = () => {
    setSpecifyBBSS(false);
    handleClose();
  }

  const onClicSave = () => {
    const C_item = uuidv4(); 
    const Q_requedet_cant = C_biesertipo === "01" ? parseFloat(parseFloat(controlInputCantidad.current.value).toFixed(6)) : 1;
    const C_bieser_unimed = bbssSelected.C_bieser_unimed;
    const C_bieser = bbssSelected.C_BIESER;
    const Q_requedet_precio = parseFloat(parseFloat(controlInputPrecioUnit.current.value).toFixed(7));
    const c_depen_aux = "";
    const N_cnespec_desc = specifyBBSS ? controlInputSpecifyBBSS.current.value : "";
    const N_bieser_desc = bbssSelected.N_BIESER_DESC || "";
    const N_unimed_desc = bbssSelected.N_UNIMED_DESC || "";

    
    dispatch(
      setCurrentRequerimientoAddItem({
        C_clapre, C_secfun, C_depen, C_activpoi, C_objpoi, C_metapoi, C_item, Q_requedet_cant, C_bieser_unimed, C_biesertipo, C_bieser, Q_requedet_precio, c_depen_aux, N_cnespec_desc, N_bieser_desc, N_unimed_desc
      })
    );   
    
    onCloseModal();
  }


  return (
    <div>
      <div>
        <Modal
          size="lg"
          show={show}
          onHide={onCloseModal}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <img
                src="/images/plus.svg"
                className="me-2 thumbnail"
                alt={`Agregar ${C_biesertipo === "01" ? "bien" : "servicio"}`}
              />
              {`Agregar ${C_biesertipo === "01" ? "bien" : "servicio"}`}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="p-3">
              <Card>
                <Card.Header>
                  <div className="d-flex flex-wrap gap-3 justify-content-between">
                    <p className="m-0 p-0">
                      <small className="text-muted">
                        Secuencia funcional:{" "}
                      </small>
                      {C_secfun}
                    </p>
                    <p className="m-0 p-0">
                      <small className="text-muted">Tarea operativa: </small>
                      {C_activpoi}
                    </p>
                    <p className="m-0 p-0">
                      <small className="text-muted">Clasificador: </small>
                      {C_clapre}
                    </p>
                    <p className="m-0 p-0">
                      <small className="text-muted">Objetivo / Meta: </small>
                      {C_objpoi} / {C_metapoi}
                    </p>
                  </div>
                </Card.Header>
                <Card.Body>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="text-muted mb-0">
                      <small>
                        {" "}
                        {C_biesertipo === "01" ? "Bien" : "Servicio"}
                      </small>
                    </Form.Label>
                    <Select
                      placeholder={`Seleccionar ${
                        C_biesertipo === "01" ? "bien" : "servicio"
                      }`}
                      ref={controlSelectBBSS}
                      noOptionsMessage={() => "Registro no encontrado"}
                      name="bbss"
                      onChange={onChangeControlSelectBBSS}
                      options={bbssOptions}
                      className="basic-multi-select"
                      classNamePrefix="select"
                    />
                  </Form.Group>

                  <Form.Group className="mb-2 col-md-3">
                    <Form.Label className="text-muted mb-0">
                      <small>
                        {C_biesertipo === "01"
                          ? "Precio unitario S/."
                          : "Importe S/."}{" "}
                      </small>
                    </Form.Label>
                    <Form.Control
                      type="number"
                      min={0}
                      step="0.01"
                      className="text-end"
                      onFocus={(event) => event.target.select()}
                      ref={controlInputPrecioUnit}
                      defaultValue={0.0}
                      onChange={calculaSubTotal}
                    />
                  </Form.Group>

                  {C_biesertipo === "01" && (
                    <>
                      <Form.Group className="mb-2 col-md-3">
                        <Form.Label className="text-muted mb-0">
                          <small>Cantidad</small>
                        </Form.Label>
                        <Form.Control
                          type="number"
                          min={0}
                          className="text-end"
                          onFocus={(event) => event.target.select()}
                          onBlur={onBlurControlInputCantidad}
                          defaultValue={0}
                          ref={controlInputCantidad}
                          onChange={calculaSubTotal}
                        />
                      </Form.Group>

                      <Form.Group className="mb-2 col-md-3">
                        <Form.Label className="text-muted mb-0">
                          <small> Sub total S/. </small>
                        </Form.Label>
                        <Form.Control
                          type="number"
                          className="text-end"
                          ref={controlInputSubTotal}
                          disabled
                        />
                      </Form.Group>
                    </>
                  )}

                  <Form.Group className="mt-3">
                    <Form.Check // prettier-ignore
                      type="checkbox"
                      label={`Especificar ${
                        C_biesertipo === "01" ? "bien" : "servicio"
                      }`}
                      ref={controlCheckSpecifyBBSS}
                      onChange={onChangeControlCheckSpecifyBBSS}
                      value={specifyBBSS}
                    />
                    {specifyBBSS && (
                      <Form.Control
                        type="textarea"
                        as="textarea"
                        rows={2}
                        name="name_specify_bbss"
                        ref={controlInputSpecifyBBSS}
                        // value={valores.observ}
                        // onChange={(e) => setField("observ", e.target.value)}
                        // isInvalid={!!errors.observ}
                      />
                    )}
                  </Form.Group>
                </Card.Body>
                <Card.Footer className="text-center">
                  <Button variant="primary" onClick={onClicSave}>{`Agregar ${C_biesertipo === "01" ? "bien" : "servicio"}`}</Button>
                </Card.Footer>
              </Card>
            </div>
            
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};
import { useState, useRef } from "react";
import { Form } from "react-bootstrap";

export const ContribAddTipoContComponent = ({
  valores,
  setField,
  tipoContribuyente,
  errors,
}) => {
  const [tipoContribyenteSelect, setTipoContribyenteSelect] = useState("PN");
  const [tipoDocumento, setTipoDocumento] = useState("01");

  const inputNroDoc = useRef();

  const MostrarTipoDocumento = (e) => {
    setTipoContribyenteSelect(e.target.value);
    if (e.target.value === "PN") {
      setTipoDocumento("01");
    } else if (e.target.value === "PJ") {
      setTipoDocumento("05");
    }
    inputNroDoc.current.select();
  };

  const TipoDocumentoChange = (e) => {
    setTipoDocumento(e.target.value);
    if (e.target.value === "06") {
      inputNroDoc.current.value = "";
    }
    inputNroDoc.current.select();
  };

  return (
    <div className="row justify-content-center">
      <div className="row col-sm-12 col-lg-4 mt-0">
        {/* TIPO DE CONTRIBUYENTE */}
        <Form.Group className="mb-2" controlId="formTipoContribuyente">
          <Form.Label className="text-muted mb-0 mt-0">
            <small className="mb-0">Tipo de contribuyente</small>
          </Form.Label>
          <Form.Check
            defaultChecked
            name="groupTipoContribuyente"
            type="radio"
            id="chkPN"
            label="Persona natural"
            value="PN"
            // ref={checkNombre}
            // onChange={MostrarTipoDocumento("PN")}
            onChange={MostrarTipoDocumento}
          />
          <Form.Check
            name="groupTipoContribuyente"
            type="radio"
            label="Persona jurídica"
            id="chkPJ"
            value="PJ"
            // ref={checkCodigo}
            onChange={MostrarTipoDocumento}
          />
        </Form.Group>

        {/* TIPO DE DOCUMENTO */}
        <Form.Group className="mb-2" controlId="formTipoDocumento">
          <Form.Label className="text-muted mb-0 mt-0">
            <small className="mb-0">
              Tipo de documento {tipoContribuyente}
            </small>
          </Form.Label>
          {tipoContribyenteSelect === "PJ" && (
            <Form.Check
              name="groupTipoDocumento"
              type="radio"
              id="chkRUC"
              label="RUC"
              value="05"
              checked={tipoDocumento === "05"}
              onChange={TipoDocumentoChange}
            />
          )}

          {tipoContribyenteSelect === "PN" && (
            <div>
              <Form.Check
                defaultChecked
                name="groupTipoDocumento"
                type="radio"
                label="DNI"
                id="chkDNI"
                value="01"
                checked={tipoDocumento === "01"}
                onChange={TipoDocumentoChange}
              />
              <Form.Check
                name="groupTipoDocumento"
                type="radio"
                label="Cód Int."
                id="chkCIN"
                value="06"
                checked={tipoDocumento === "06"}
                onChange={TipoDocumentoChange}
              />
            </div>
          )}
        </Form.Group>

        {/* NUMERO DE DOCUMENTO */}
        <Form.Group controlId="formBasicEmail">
          <Form.Label className="text-muted mb-0 mt-0">
            <small className="mb-0">Número de documento</small>
          </Form.Label>
          <Form.Control type="text" ref={inputNroDoc} autocomplete="off" readOnly = {tipoDocumento === "06"}/>
        </Form.Group>
      </div>
    </div>
  );
};

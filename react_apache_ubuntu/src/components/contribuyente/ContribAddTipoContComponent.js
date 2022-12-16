import { useRef, useEffect } from "react";
import { Form } from "react-bootstrap";

export const ContribAddTipoContComponent = ({
  valores,
  setField,
  tipoContribuyente,
  errors,
}) => {
  const inputNroDoc = useRef();

  const MostrarTipoDocumento = (e) => {
    let tipoContribDocum = { "tipoAddContrib": e.target.value };
    if (e.target.value === "PN") {
      tipoContribDocum = {
        ...tipoContribDocum,
        "tipoDocum": "01",
        "tipoContrib": "01",
        "codigoContrib" : "",
      };
    } else if (e.target.value === "PJ") {
      tipoContribDocum = {
        ...tipoContribDocum,
        "tipoDocum": "05",
        "tipoContrib": "11",
        "codigoContrib" : ""
      };
    }
    setField(tipoContribDocum, "");
    inputNroDoc.current.select();
  };

  const TipoDocumentoChange = (e) => {

    let tipoContribDocum = { "tipoDocum": e.target.value }; 

    if (e.target.value === "06") {
      tipoContribDocum = {...tipoContribDocum, "codigoContrib" : ""}      
    } 
    setField(tipoContribDocum, "");
    inputNroDoc.current.select();
  };

  const inputChangeNroDoc = (e) => {
    setField("codigoContrib", e.target.value)
  }

  useEffect(() => {
    inputNroDoc.current.select()
    inputNroDoc.current.selectionStart = inputNroDoc.current.value.length;
    inputNroDoc.current.selectionEnd = inputNroDoc.current.value.length;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div className="row justify-content-center">
      <div className="row col-sm-12 col-lg-4 mt-0">
        {/* TIPO DE CONTRIBUYENTE */}
        <Form.Group className="mb-2">
          <Form.Label className="text-muted mb-0 mt-0">
            <small className="mb-0">Tipo de contribuyente</small>
          </Form.Label>
          <Form.Check
            name="groupTipoContribuyente"
            type="radio"
            id="chkPN"
            label="Persona natural"
            value="PN"
            // ref={checkNombre}
            // onChange={MostrarTipoDocumento("PN")}
            checked={valores.tipoAddContrib === "PN"}
            onChange={MostrarTipoDocumento}
          />
          <Form.Check
            name="groupTipoContribuyente"
            type="radio"
            label="Persona jurídica"
            id="chkPJ"
            value="PJ"
            checked={valores.tipoAddContrib === "PJ"}
            // ref={checkCodigo}
            onChange={MostrarTipoDocumento}
          />
        </Form.Group>

        {/* TIPO DE DOCUMENTO */}
        <Form.Group className="mb-2">
          <Form.Label className="text-muted mb-0 mt-0">
            <small className="mb-0">
              Tipo de documento
            </small>
          </Form.Label>
          {valores.tipoAddContrib === "PJ" && (
            <Form.Check
              name="groupTipoDocumento"
              type="radio"
              id="chkRUC"
              label="RUC"
              value="05"
              checked={valores.tipoDocum === "05"}
              onChange={TipoDocumentoChange}
            />
          )}

          {valores.tipoAddContrib === "PN" && (
            <div>
              <Form.Check                
                name="groupTipoDocumento"
                type="radio"
                label="DNI"
                id="chkDNI"
                value="01"
                checked={valores.tipoDocum === "01"}
                onChange={TipoDocumentoChange}
              />
              <Form.Check
                name="groupTipoDocumento"
                type="radio"
                label="Cód Int."
                id="chkCIN"
                value="06"
                checked={valores.tipoDocum === "06"}
                onChange={TipoDocumentoChange}
              />
            </div>
          )}
        </Form.Group>

        {/* NUMERO DE DOCUMENTO */}
        <Form.Group>
          <Form.Label className="text-muted mb-0 mt-0">
            <small className="mb-0">Número de documento</small>
          </Form.Label>
          <Form.Control
            key="inpNro"
            id="inpNro"
            type="text"
            ref={inputNroDoc}
            autoComplete ="off"
            readOnly={valores.tipoDocum === "06"}
            value={valores.codigoContrib}            
            onChange={inputChangeNroDoc}
            isInvalid={!!errors.codigoContrib}
            maxLength={valores.tipoDocum === "01" ? 8 : valores.tipoDocum === "05" ? 11 : 0}
          />
          <Form.Control.Feedback type="invalid">
            {errors.codigoContrib}
          </Form.Control.Feedback>
        </Form.Group>
      </div>
    </div>
  );
};

import { useState } from "react";
import { Form, InputGroup, FormControl, Button } from "react-bootstrap";
import { BuscarLugarComponent } from "./BuscarLugarComponent";

export const ContribEditDomiciComponent = ({
  valores,
  setField,
  errors,
}) => {

  const [showBuscarLugar, setShowBuscarLugar] = useState(false);

  const handleBuscarLugarClose = () => setShowBuscarLugar(false);
  const handleBuscarLugarShow = () => setShowBuscarLugar(true);

  return (
    <div>
      {/* ------------------ LUGAR -------------------*/}
      <Form.Label className="text-muted mb-0">
        <small className="mb-0">Lugar</small>
      </Form.Label>
      <div className="row ">
        <div className="col-12 col-sm-3 me-0 pe-0">
          <Form.Group md="6" controlId="id_codigoLugar">
            <Form.Control
              type="text"
              maxLength="9"
              placeholder="Código"
              name="name_codigoLugar"
              value={valores.codigoLugar}              
              onChange={(e) => setField("codigoLugar", e.target.value)}
              isInvalid={!!errors.codigoLugar}
            />
            <Form.Control.Feedback type="invalid">
              {errors.codigoLugar}
            </Form.Control.Feedback>
          </Form.Group>
        </div>
        <div className="col-12 col-sm-9 ms-0 ps-0">
          <Form.Group className="mb-2" controlId="formBasicEmail">            
            <InputGroup>
              <FormControl
                placeholder="Denominación del lugar"
                aria-label="Denominación del lugar"
                aria-describedby="Denominación del lugar"
                value={`${valores.nombreLugar} / ${valores.direccProv} - ${valores.direccDist}` } 
                readOnly
              />
              <Button
                variant="outline-secondary"
                id="button-addon2"
                title="Buscar"
                onClick={handleBuscarLugarShow}
              >
                <i className="fas fa-search"></i>
              </Button>
            </InputGroup>
          </Form.Group>
        </div>
      </div>

      {/* ------------------ CALLE -------------------*/}
      <Form.Label className="text-muted mb-0 mt-0 pb-0">
        <small className="mb-0">Calle</small>
      </Form.Label>
      <div className="row ">
        <div className="col-12 col-sm-3 me-0 pe-0 pb-0">
          <Form.Group md="6" controlId="id_codigoCalle">
            <Form.Control
              type="text"
              maxLength="4"
              placeholder="Código"
              name="name_codigoCalle"
              value={ valores.codigoCalle } 
              onChange={(e) => setField("codigoCalle", e.target.value)}
              isInvalid={!!errors.codigoCalle}
            />
            <Form.Control.Feedback type="invalid">
              {errors.codigoCalle}
            </Form.Control.Feedback>
          </Form.Group>
        </div>
        <div className="col-12 col-sm-9 ms-0 ps-0">
          <Form.Group className="mb-2" controlId="formBasicEmail">            
            <InputGroup className="mb-0">
              <FormControl
                placeholder="Denominación de calle"
                aria-label="Denominación de calle"
                aria-describedby="Denominación de calle"
                value={valores.nombreCalle}   
                readOnly
              />
              <Button
                variant="outline-secondary"
                id="button-addon2"
                title="Buscar"
                // onClick={listarPrecalUsuEstado}
              >
                <i className="fas fa-search"></i>
              </Button>
            </InputGroup>
          </Form.Group>
        </div>
      </div>

      <div className="col-lg-3">
        {/* ------------------ NUMERO -------------------*/}
        <Form.Group md="6" controlId="id_direccNro">
          <Form.Label className="text-muted mb-0 mt-0">
            <small className="mb-0">Número</small>
          </Form.Label>
          <Form.Control
            type="text"
            maxLength="4"            
            name="name_direccNro"
            value={valores.direccNro}            
            onChange={(e) => setField("direccNro", e.target.value)}
            isInvalid={!!errors.direccNro}
          />
          <Form.Control.Feedback type="invalid">
            {errors.direccNro}
          </Form.Control.Feedback>
        </Form.Group>
      </div>

      <div className="col-lg-3 mt-2">
        {/* ------------------ PISO -------------------*/}
        <Form.Group md="6" controlId="id_direccPiso">
          <Form.Label className="text-muted mb-0 mt-0">
            <small className="mb-0">Piso</small>
          </Form.Label>
          <Form.Control
            type="text"
            maxLength="2"            
            name="name_direccPiso"
            value={valores.direccPiso}            
            onChange={(e) => setField("direccPiso", e.target.value)}
            isInvalid={!!errors.direccPiso}
          />
          <Form.Control.Feedback type="invalid">
            {errors.direccPiso}
          </Form.Control.Feedback>
        </Form.Group>
      </div>

      <div className="col-lg-3 mt-2">
        {/* ------------------ DEPARTAMENTO -------------------*/}
        <Form.Group md="6" controlId="id_direccDpto">
          <Form.Label className="text-muted mb-0 mt-0">
            <small className="mb-0">Departamento</small>
          </Form.Label>
          <Form.Control
            type="text"
            maxLength="4"            
            name="name_direccDpto"
            value={valores.direccDpto}            
            onChange={(e) => setField("direccDpto", e.target.value)}
            isInvalid={!!errors.direccDpto}
          />
          <Form.Control.Feedback type="invalid">
            {errors.direccDpto}
          </Form.Control.Feedback>
        </Form.Group>
      </div>

      <div className="col-lg-3 mt-2">
        {/* ------------------ MANZANA -------------------*/}
        <Form.Group md="6" controlId="id_direccMzna">
          <Form.Label className="text-muted mb-0 mt-0">
            <small className="mb-0">Manzana</small>
          </Form.Label>
          <Form.Control
            type="text"
            maxLength="4"            
            name="direccMzna"
            value={valores.direccMzna}            
            onChange={(e) => setField("direccMzna", e.target.value)}
            isInvalid={!!errors.direccMzna}
          />
          <Form.Control.Feedback type="invalid">
            {errors.direccMzna}
          </Form.Control.Feedback>
        </Form.Group>
      </div>

      <div className="col-lg-3 mt-2">
        {/* ------------------ LOTE -------------------*/}
        <Form.Group md="6" controlId="id_direccLote">
          <Form.Label className="text-muted mb-0 mt-0">
            <small className="mb-0">Lote</small>
          </Form.Label>
          <Form.Control
            type="text"
            maxLength="6"            
            name="direccLote"
            value={valores.direccLote}            
            onChange={(e) => setField("direccLote", e.target.value)}
            isInvalid={!!errors.direccLote}
          />
          <Form.Control.Feedback type="invalid">
            {errors.direccLote}
          </Form.Control.Feedback>
        </Form.Group>
      </div>

      <div className="mt-2">
        {/* ------------------ DIRECCION ADICIONAL -------------------*/}
        <Form.Group md="6" controlId="id_direccAdic">
          <Form.Label className="text-muted mb-0 mt-0">
            <small className="mb-0">Dirección adicional</small>
          </Form.Label>
          <Form.Control
            type="text"
            maxLength="70"            
            name="direccAdic"
            value={valores.direccAdic}            
            onChange={(e) => setField("direccAdic", e.target.value)}
            isInvalid={!!errors.direccAdic}
          />
          <Form.Control.Feedback type="invalid">
            {errors.direccAdic}
          </Form.Control.Feedback>
        </Form.Group>
      </div>
      <BuscarLugarComponent setField = { setField } show = { showBuscarLugar } handleClose = { handleBuscarLugarClose } />
    </div>
  );
};

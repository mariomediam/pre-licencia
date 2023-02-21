import React from "react";
import { Form, Container, Row, Col, Alert } from "react-bootstrap";

export const ContribEditDatPriComponent = ({
  valores,
  setField,
  tipoContribuyente,
  errors,
}) => {
  return (
    <div>
      <Container fluid="lx">
        <Row>
          <Col>
            <div>
              {/* ------------------ CODIGO DE CONTRIBUYENTE -------------------*/}
              <Form.Group md="6" controlId="id_codigoContrib" className="mt-2">
                <Form.Label className="text-muted mb-0">
                  <small className="mb-0">Código nuevo</small>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Código"
                  name="name_codigoContrib"
                  value={valores.codigoContrib}
                  readOnly
                  onChange={(e) => setField("codigoContrib", e.target.value)}
                  isInvalid={!!errors.codigoContrib}
                />

                <Form.Control.Feedback type="invalid">
                  {errors.codigoContrib}
                </Form.Control.Feedback>
              </Form.Group>
            </div>

            {/* ------------------ TIPO DE CONTRIBUYENTE -------------------*/}
            <Form.Group md="6" controlId="id_tipoContrib" className="mt-2">
              <Form.Label className="text-muted mb-0">
                <small className="mb-0">Tipo de contribuyente</small>
              </Form.Label>
              <Form.Select
                aria-label="Tipo de contribuyente"
                value={valores.tipoContrib}
                disabled={valores.tipoContrib === "01" ? true : false}
                isInvalid={!!errors.tipoContrib}
                onChange={(e) => setField("tipoContrib", e.target.value)}
              >
                {tipoContribuyente.map(({ C004Tip_Cont, C004Nombre }, i) => (
                  <React.Fragment key={i}>
                    {(valores.tipoContrib !== "01" && C004Tip_Cont !== "01") ||
                    (valores.tipoContrib === "01" && C004Tip_Cont === "01") ? (
                      <option key={C004Tip_Cont} value={C004Tip_Cont}>
                        {C004Nombre.trim()}
                      </option>
                    ) : null}
                  </React.Fragment>
                ))}
              </Form.Select>

              <Form.Control.Feedback type="invalid">
                {errors.tipoContrib}
              </Form.Control.Feedback>
            </Form.Group>

            {valores.tipoContrib === "01" && (
              <div>
                {/* ------------------ APELLIDO PATERNO -------------------*/}
                <Form.Group md="6" controlId="id_apepat" className="mt-2">
                  <Form.Label className="text-muted mb-0">
                    <small className="mb-0">Apellido paterno</small>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Apellido paterno"
                    name="name_apepat"
                    value={valores.apePat}
                    onChange={(e) => setField("apePat", e.target.value)}
                    isInvalid={!!errors.apePat}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.apePat}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* ------------------APELLIDO MATERNO -------------------*/}
                <Form.Group md="6" controlId="id_apemat" className="mt-2">
                  <Form.Label className="text-muted mb-0">
                    <small className="mb-0">Apellido materno</small>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Apellido materno"
                    name="name_apemat"
                    value={valores.apeMat}
                    onChange={(e) => setField("apeMat", e.target.value)}
                    isInvalid={!!errors.apeMat}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.apeMat}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
            )}
          </Col>

          <Col>
            {valores.tipoContrib === "01" && valores.tipoDocum === "01" && (
              <div className="d-flex justify-content-center mt-3 pt-3">
                {valores.resultReniec.coResultado === "0000" ? (
                  <img
                    
                    src={`data:image/jpeg;base64,${valores.foto}`}
                    alt=""
                  />
                ) : (
                  <Alert variant="warning">
                    {valores.resultReniec.deResultado}
                  </Alert>
                )}
              </div>
            )}
          </Col>
        </Row>
      </Container>

      {/* ------------------ NOMBRE / RAZON SOCIAL -------------------*/}
      <Form.Group md="6" controlId="id_nombre" className="mt-2">
        <Form.Label className="text-muted mb-0">
          <small className="mb-0">
            {valores.tipoContrib === "01" ? "Nombre" : "Razón social"}
          </small>
        </Form.Label>
        <Form.Control
          type="text"
          placeholder="Nombre"
          name="name_nombre"
          value={valores.nombre}
          onChange={(e) => setField("nombre", e.target.value)}
          isInvalid={!!errors.nombre}
        />

        <Form.Control.Feedback type="invalid">
          {errors.nombre}
        </Form.Control.Feedback>
      </Form.Group>

      {valores.tipoContrib === "01" && (
        <div>
          {/* ------------------ SEXO -------------------*/}
          <Form.Group md="6" controlId="id_sexo" className="mt-2 col-lg-4">
            <Form.Label className="text-muted mb-0">
              <small className="mb-0">Sexo</small>
            </Form.Label>
            <Form.Select
              aria-label="sexo"
              value={valores.sexo}
              onChange={(e) => setField("sexo", e.target.value)}
            >
              <option value="M">Masculino</option>
              <option value="F">Femenino</option>
            </Form.Select>

            <Form.Control.Feedback type="invalid">
              {errors.sexo}
            </Form.Control.Feedback>
          </Form.Group>

          {/* ------------------ FECHA DE NACIMIENTO -------------------*/}
          <Form.Group md="6" controlId="id_fecnac" className="mt-2 col-lg-4">
            <Form.Label className="text-muted mb-0">
              <small className="mb-0">Fecha nacimiento</small>
            </Form.Label>
            <Form.Control
              type="date"
              name="name_fecNac"
              value={valores.fecNac}
              onChange={(e) => setField("fecNac", e.target.value)}
              isInvalid={!!errors.fecNac}
            />

            <Form.Control.Feedback type="invalid">
              {errors.fecNac}
            </Form.Control.Feedback>
          </Form.Group>
        </div>
      )}

      {/* ------------------ OBSERVACIONES -------------------*/}
      <Form.Group md="6" controlId="id_observ" className="mt-2">
        <Form.Label className="text-muted mb-0">
          <small className="mb-0">Observaciones</small>
        </Form.Label>
        <Form.Control
          type="textarea"
          as="textarea"
          rows={3}
          name="name_observ"
          value={valores.observ}
          onChange={(e) => setField("observ", e.target.value)}
          isInvalid={!!errors.observ}
        />

        <Form.Control.Feedback type="invalid">
          {errors.observ}
        </Form.Control.Feedback>
      </Form.Group>
    </div>
  );
};

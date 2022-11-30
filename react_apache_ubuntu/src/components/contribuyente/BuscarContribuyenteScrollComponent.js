import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Table, Tabs, Tab, Button } from "react-bootstrap";

import { obtenerContribuyentePagination } from "../../services/contribuyenteService";
import { DocumentosViewComponent } from "./DocumentosViewComponent";

function DomicilioViewComponent(props) {
  return (
    <div className="ps-2">
      <p className="text-muted pb-0 mb-0 mt-0">
        <small className="mb-0">Lugar</small>
      </p>
      {props.contribuyente.C001Cod_Lug} {props.contribuyente.Lugar}{" "}
      <small>
        <small>
          {props.contribuyente.C005Provincia} -{" "}
          {props.contribuyente.C005Distrito}
        </small>
      </small>
      <p className="text-muted pb-0 mb-0 mt-2">
        <small className="mb-0">Calle</small>
      </p>
      {props.contribuyente.C001Cod_Calle} {props.contribuyente.Calle}
      {props.contribuyente.Número.trim().length > 0 && (
        <div>
          <p className="text-muted pb-0 mb-0 mt-2">
            <small className="mb-0 pb-0">Número</small>
          </p>
          {props.contribuyente.Número.trim()}
        </div>
      )}
      {props.contribuyente.Piso.trim().length > 0 && (
        <div>
          <p className="text-muted pb-0 mb-0 mt-2">
            <small className="mb-0 pb-0">Piso</small>
          </p>
          {props.contribuyente.Piso.trim()}
        </div>
      )}
      {props.contribuyente.Mza.trim().length > 0 && (
        <div>
          <p className="text-muted pb-0 mb-0 mt-2">
            <small className="mb-0 pb-0">Manzana</small>
          </p>
          {props.contribuyente.Mza.trim()}
        </div>
      )}
      {props.contribuyente.Lote.trim().length > 0 && (
        <div>
          <p className="text-muted pb-0 mb-0 mt-2">
            <small className="mb-0 pb-0">Lote</small>
          </p>
          {props.contribuyente.Lote.trim()}
        </div>
      )}
      {props.contribuyente.Dpto.trim().length > 0 && (
        <div>
          <p className="text-muted pb-0 mb-0 mt-2">
            <small className="mb-0 pb-0">Departamento</small>
          </p>
          {props.contribuyente.Dpto.trim()}
        </div>
      )}
      {props.contribuyente.C001Direc_Adic.trim().length > 0 && (
        <div>
          <p className="text-muted pb-0 mb-0 mt-2">
            <small className="mb-0 pb-0">Dirección adicional</small>
          </p>
          {props.contribuyente.C001Direc_Adic.trim()}
        </div>
      )}
    </div>
  );
}

function DatosPrincipalesViewComponent(props) {
  return (
    <div className="ps-2">
      <p className="text-muted pb-0 mb-0 mt-0">
        <small className="mb-0">Tipo de contribuyente</small>
      </p>
      {props.contribuyente.TipoCont}

      {props.contribuyente.C001Tip_Cont === "01" && (
        <div>
          <p className="text-muted pb-0 mb-0 mt-2">
            <small className="mb-0 pb-0">Sexo</small>
          </p>
          {props.contribuyente.C001Sexo.trim() === "M"
            ? "MASCULINO"
            : props.contribuyente.C001Sexo.trim() === "F"
            ? "FEMENINO"
            : "-"}
          <p className="text-muted pb-0 mb-0 mt-2">
            <small className="mb-0 pb-0">Fecha de nacimiento</small>
          </p>
          {props.contribuyente.D001FecNac.toString().substr(8, 2)}/
          {props.contribuyente.D001FecNac.toString().substr(5, 2)}/
          {props.contribuyente.D001FecNac.toString().substr(0, 4)}
          <br />
          {props.contribuyente.C001Motivo.trim().length > 0 && (
            <div>
              <p className="text-muted pb-0 mb-0 mt-2">
                <small className="mb-0 pb-0">Observaciones</small>
              </p>
              {props.contribuyente.C001Motivo.trim()}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

class BuscarContribuyenteScrollComponent extends React.Component {
  state = {
    items: this.props.filtro.items,
    hasMore: true,
    filtro: this.props.filtro,
    pageNext: "",
    countRecords: 0,
    codigoContribSelecc: "",
    setShowForm: this.props.setShowForm,
  };

 

  fetchMoreData = async () => {
    if (this.state.pageNext) {
      const URL = this.state.pageNext;
      const { next, results, count } = await obtenerContribuyentePagination(
        URL
      );

      this.setState({
        items: this.state.items.concat(results),
        hasMore: next ? true : false,
        pageNext: next,
        countRecords: count,
      });
    }
  };

  async componentDidUpdate() {
    if (this.props.filtro.reload) {
      if (!this.props.filtro.opcion) {
        return;
      }

      if (this.props.filtro.opcion.length === 0) {
        return;
      }

      if (!this.props.filtro.valor) {
        return;
      }

      if (this.props.filtro.valor.length === 0) {
        return;
      }

      let URL = encodeURI(
        `${process.env.REACT_APP_API}/contribuyente/buscar-contribuyente-p?${this.props.filtro.opcion}=${this.props.filtro.valor}`
      );

      const { next, results, count } = await obtenerContribuyentePagination(
        URL
      );

      this.setState({
        items: results,
        hasMore: next ? true : false,
        pageNext: next,
        countRecords: count,
      });
      this.props.filtro.reload = false;
    }
  }

  mostrarOtros = async (e) => {
    if (e.substr(0, 2) === "ot") {
      await this.setState({
        ...this.state,
        codigoContribSelecc: e.substr(3).trim(),
      });

      console.log(e.substr(3));
    }
  };

  render() {
    return (
      <div>
        <InfiniteScroll
          dataLength={this.state.items.length}
          next={this.fetchMoreData}
          hasMore={this.state.hasMore}
          loader={<span className="visually-hidden">Cargando...</span>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>
                {" "}
                <small>No hay más registros para mostrar</small>
              </b>
            </p>
          }
        >
          <small> {this.state.countRecords} registro(s) encontrado(s)</small>
          <div style={{ border: "1px solid lightgrey" }}>
            <Table hover className="caption-top mb-1">
              <thead>
                <tr className="color-header1 text-white">
                  <th className="text-center align-middle m-0 p-0">Código</th>
                  <th className="text-center align-middle m-0 p-0">
                    Nombre / Razón social
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.state.items.map((contribuyente, i) => (
                  <tr key={contribuyente.Código}>
                    <td>{contribuyente.Código}</td>
                    <td>
                      <div
                        className="p-0 m-0 accordion accordion-flush"
                        id={"accordion" + contribuyente.Código.trim()}
                      >
                        <div className="p-0 m-0 accordion-item">
                          <h2
                            className="p-0 m-0 accordion-header"
                            id={"header_" + contribuyente.Código.trim()}
                          >
                            <button
                              className="accordion-button collapsed py-0"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target={
                                "#button_" + contribuyente.Código.trim()
                              }
                              aria-expanded="true"
                              aria-controls={
                                "button_" + contribuyente.Código.trim()
                              }
                            >
                              <div className="row">
                                {contribuyente.Identificación.trim()}
                                <br />
                                <small className="p-0">
                                  <small>{contribuyente.Dirección}</small>
                                </small>
                              </div>
                            </button>
                          </h2>
                          <div
                            id={"button_" + contribuyente.Código.trim()}
                            className="accordion-collapse collapse"
                            data-bs-parent={
                              "#accordion" + contribuyente.Código.trim()
                            }
                          >
                            <div className="accordion-body pt-1">
                              <Tabs
                                defaultActiveKey={
                                  "dp_" + contribuyente.Código.trim()
                                }
                                id={"tabs_" + contribuyente.Código.trim()}
                                className="mb-3"
                                fill
                                onSelect={this.mostrarOtros}
                              >
                                <Tab
                                  eventKey={"dp_" + contribuyente.Código.trim()}
                                  title="Datos principales"
                                >
                                  <DatosPrincipalesViewComponent
                                    contribuyente={contribuyente}
                                  ></DatosPrincipalesViewComponent>
                                </Tab>
                                <Tab
                                  eventKey={"do_" + contribuyente.Código.trim()}
                                  title="Domicilio"
                                >
                                  <DomicilioViewComponent
                                    contribuyente={contribuyente}
                                  ></DomicilioViewComponent>
                                </Tab>
                                <Tab
                                  eventKey={"ot_" + contribuyente.Código.trim()}
                                  title="Otros"
                                  id={"tab_" + contribuyente.Código.trim()}
                                >
                                  <DocumentosViewComponent
                                    codigoContrib={contribuyente.Código.trim()}
                                    codigoContribSelecc={
                                      this.state.codigoContribSelecc
                                    }
                                  />
                                </Tab>
                              </Tabs>
                              <hr className="m-0" />
                              <div className="d-flex justify-content-end">
                                <Button
                                  variant="light"
                                  size="sm"
                                  className="mt-0"
                                  onClick={ () => this.state.setShowForm(3)}
                                >
                                  <i className="far fa-save me-2"></i>Editar
                                </Button>{" "}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </InfiniteScroll>
      </div>
    );
  }
}

export default BuscarContribuyenteScrollComponent;

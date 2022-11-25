import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Table, Tabs, Tab } from "react-bootstrap";

import { obtenerContribuyentePagination } from "../../services/contribuyenteService";

class BuscarContribuyenteScrollComponent extends React.Component {
  state = {
    items: this.props.filtro.items,
    hasMore: true,
    filtro: this.props.filtro,
    pageNext: "",
    countRecords: 0,
  };

  fetchMoreData = async () => {
    if (this.state.pageNext) {
      const URL = this.state.pageNext;
      const { next, results, count } = await obtenerContribuyentePagination(URL);

      this.setState({
        items: this.state.items.concat(results),
        hasMore: next ? true : false,
        pageNext: next,
        countRecords: count
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

      let URL = encodeURI(`${process.env.REACT_APP_API}/contribuyente/buscar-contribuyente-p?${this.props.filtro.opcion}=${this.props.filtro.valor}`);

      const { next, results, count } = await obtenerContribuyentePagination(URL);

      this.setState({
        items: results,
        hasMore: next ? true : false,
        pageNext: next,
        countRecords: count
      });
      this.props.filtro.reload = false;
    }
  }

  mostrarOtros = async () => {
    console.log("se ejecuto")
    alert("Se disparo...")
  };

  render() {
    return (
      <div>

        <InfiniteScroll
          dataLength={this.state.items.length}
          next={this.fetchMoreData}
          hasMore={this.state.hasMore}
          loader={

            <span className="visually-hidden">Cargando...</span>

          }
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>
                {" "}
                <small>No hay más registros para mostrar</small>
              </b>
            </p>
          }
        >
          {/* <caption className="py-0">
        {" "}
        {this.state.countRecords} registro(s) encontrado(s)
      </caption> */}
          <small> {this.state.countRecords} registro(s) encontrado(s)</small>
          <div style={{ border: '1px solid lightgrey' }}>
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
                    <td>
                      {contribuyente.Código}
                    </td>
                    <td>
                      {/* {contribuyente.Identificación} <br /><small><small>{contribuyente.Dirección}</small></small> */}
                      <div className="p-0 m-0 accordion accordion-flush" id={"accordion" + contribuyente.Código.trim()} >
                        <div className="p-0 m-0 accordion-item">
                          <h2 className="p-0 m-0 accordion-header" id={"header_" + contribuyente.Código.trim()}>
                            <button className="accordion-button collapsed py-0" type="button" data-bs-toggle="collapse" data-bs-target={'#button_' + contribuyente.Código.trim()} aria-expanded="true" aria-controls={'button_' + contribuyente.Código.trim()}>
                              <div className="row">{contribuyente.Identificación.trim()}<br /><small className="p-0"><small>{contribuyente.Dirección}</small></small>
                              </div>
                            </button>
                          </h2>
                          <div id={'button_' + contribuyente.Código.trim()} className="accordion-collapse collapse" data-bs-parent={"#accordion" + contribuyente.Código.trim()}>
                            <div className="accordion-body">
                              {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. */}
                              <Tabs
                                defaultActiveKey="datos_principales"
                                id={'tabs_' + contribuyente.Código.trim()}
                                className="mb-3"
                                fill
                                onSelect={() => this.mostrarOtros()}
                              >
                                <Tab eventKey="datos_principales" title="Datos principales" >
                                  {/* <small className="ps-2 text-red">Tipo de contribuyente</small> */}

                                  <div className="ps-2">
                                    <p className="text-muted pb-0 mb-0 mt-0">
                                      <small className="mb-0">Tipo de contribuyente</small>
                                    </p>
                                    {contribuyente.TipoCont}

                                    {contribuyente.C001Tip_Cont === "01" && (
                                      <div>
                                        <p className="text-muted pb-0 mb-0 mt-2">
                                          <small className="mb-0 pb-0">Sexo</small>
                                        </p>
                                        {contribuyente.C001Sexo.trim() === "M" ? "MASCULINO" : contribuyente.C001Sexo.trim() === "F" ? "FEMENINO" : "-"}

                                        <p className="text-muted pb-0 mb-0 mt-2">
                                          <small className="mb-0 pb-0">Fecha de nacimiento</small>
                                        </p>
                                        {contribuyente.D001FecNac.toString().substr(8, 2)}/{contribuyente.D001FecNac.toString().substr(5, 2)}/{contribuyente.D001FecNac.toString().substr(0, 4)}<br />
                                      </div>

                                    )}


                                  </div>

                                </Tab>
                                <Tab eventKey="domicilio" title="Domicilio">
                                  <div className="ps-2">
                                    <p className="text-muted pb-0 mb-0 mt-0">
                                      <small className="mb-0">Lugar</small>
                                    </p>
                                    {contribuyente.C001Cod_Lug} {contribuyente.Lugar} <small><small>{contribuyente.C005Provincia} - {contribuyente.C005Distrito}</small></small>

                                    <p className="text-muted pb-0 mb-0 mt-2">
                                      <small className="mb-0">Calle</small>
                                    </p>
                                    {contribuyente.C001Cod_Calle} {contribuyente.Calle}

                                    {contribuyente.Número.trim().length > 0 && (
                                      <div>
                                        <p className="text-muted pb-0 mb-0 mt-2">
                                          <small className="mb-0 pb-0">Número</small>
                                        </p>
                                        {contribuyente.Número.trim()}
                                      </div>
                                    )}

                                    {contribuyente.Piso.trim().length > 0 && (
                                      <div>
                                        <p className="text-muted pb-0 mb-0 mt-2">
                                          <small className="mb-0 pb-0">Piso</small>
                                        </p>
                                        {contribuyente.Piso.trim()}
                                      </div>
                                    )}

                                    {contribuyente.Mza.trim().length > 0 && (
                                      <div>
                                        <p className="text-muted pb-0 mb-0 mt-2">
                                          <small className="mb-0 pb-0">Manzana</small>
                                        </p>
                                        {contribuyente.Mza.trim()}
                                      </div>
                                    )}

                                    {contribuyente.Lote.trim().length > 0 && (
                                      <div>
                                        <p className="text-muted pb-0 mb-0 mt-2">
                                          <small className="mb-0 pb-0">Lote</small>
                                        </p>
                                        {contribuyente.Lote.trim()}
                                      </div>
                                    )}

                                    {contribuyente.Dpto.trim().length > 0 && (
                                      <div>
                                        <p className="text-muted pb-0 mb-0 mt-2">
                                          <small className="mb-0 pb-0">Departamento</small>
                                        </p>
                                        {contribuyente.Dpto.trim()}
                                      </div>
                                    )}

                                    {contribuyente.C001Direc_Adic.trim().length > 0 && (
                                      <div>
                                        <p className="text-muted pb-0 mb-0 mt-2">
                                          <small className="mb-0 pb-0">Dirección adicional</small>
                                        </p>
                                        {contribuyente.C001Direc_Adic.trim()}
                                      </div>
                                    )}


                                  </div>
                                </Tab>
                                <Tab eventKey="otros" title="Otros" >
                                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                </Tab>
                              </Tabs>
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
          {/* {this.state.items.map((i, index) => (
            <div style={style} key={index}>
              div - #{index} {i ? i.webContribNomCompleto : "Vacio"}
            </div>
            
          ))} */}
        </InfiniteScroll>
      </div>
    );
  }
}

export default BuscarContribuyenteScrollComponent;

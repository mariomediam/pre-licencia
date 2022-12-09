import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Card, Table } from "react-bootstrap";
import { obtenerCallePagination } from "../../services/contribuyenteService";

export default class BuscarCalleScrollComponent extends Component {
  state = {
    setField: this.props.setField,
    handleClose: this.props.handleClose,
    items: this.props.filtro.items,
    hasMore: true,
    filtro: this.props.filtro,
    pageNext: "",
    countRecords: 0,
  };

  seleccionarCalle = (e) => {
    const { C007Cod_Calle, C007Nombre } = this.state.items
      .filter((item) => item.C007Cod_Calle === e.target.id)
      .shift();

    const calleSelecc = {
      codigoCalle: C007Cod_Calle,
      nombreCalle: C007Nombre ? C007Nombre.trim() : "",
    };
    this.state.setField(calleSelecc, "");
    this.state.handleClose();
  };

  fetchMoreData = async () => {
    if (this.state.pageNext) {
      const URL = this.state.pageNext;
      const { next, results, count } = await obtenerCallePagination(URL);

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
        `${process.env.REACT_APP_API}/contribuyente/consultar-calle-general-p?${this.props.filtro.opcion}=${this.props.filtro.valor}`
      );

      const { next, results, count } = await obtenerCallePagination(URL);

      this.setState({
        items: results,
        hasMore: next ? true : false,
        pageNext: next,
        countRecords: count,
      });
      this.props.filtro.reload = false;
    }
  }

  render() {
    return (
      <div
        id="scrollableDiv"
        style={{
          height: "500px",
          overflow: "auto",
          marginLeft: "30px",
          marginRight: "30px",
        }}
      >
        <InfiniteScroll
          dataLength={this.state.items.length}
          next={this.fetchMoreData}
          hasMore={this.state.hasMore}
          loader={<span className="visually-hidden">Cargando...</span>}
          scrollableTarget="scrollableDiv"
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
                  <th className="text-center align-middle m-0 p-0">Nombre</th>                 
                </tr>
              </thead>
              <tbody>
                {this.state.items.map((calle, i) => (
                  <tr key={calle.C007Cod_Calle}>
                    <td>
                      <Card.Link
                        href="#"
                        id={calle.C007Cod_Calle}
                        onClick={this.seleccionarCalle}
                      >
                        {calle.C007Cod_Calle}
                      </Card.Link>
                    </td>
                    <td>{calle.C007Nombre}</td>
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

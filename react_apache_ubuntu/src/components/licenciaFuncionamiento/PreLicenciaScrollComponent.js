import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Table, Button, ProgressBar } from "react-bootstrap";

import { obtenerPrecalUsuEstadoPagination } from "../../services/licFuncService";

class PreLicenciaScrollComponent extends React.Component {
  state = {
    items: this.props.filtro.items,
    hasMore: true,
    filtro: this.props.filtro,
    pageNext: "",
  };

  fetchMoreData = async () => {
    if (this.state.pageNext) {
      const URL = this.state.pageNext;
      const { next, results } = await obtenerPrecalUsuEstadoPagination(URL);

      this.setState({
        items: this.state.items.concat(results),
        hasMore: next ? true : false,
        pageNext: next,
      });
    }
  };

  async componentDidUpdate() {
    if (this.props.filtro.reload) {
      if (!this.props.filtro.usuario) {
        return;
      }

      if (this.props.filtro.usuario.length === 0) {
        return;
      }

      let URL = `${process.env.REACT_APP_API}/licfunc/precal-usu-estado-p?p=1&page_size=20&login=${this.props.filtro.usuario}`;

      if (this.props.filtro.estado) {
        URL += `&estado=${this.props.filtro.estado}`;
      }

      if (this.props.filtro.textoFiltro && this.props.filtro.textoFiltro.length > 0)  {
        URL += `&filtro=${this.props.filtro.textoFiltro}`;
      }

      const { next, results } = await obtenerPrecalUsuEstadoPagination(URL);

      this.setState({
        items: results,
        hasMore: next ? true : false,
        pageNext: next,
      });
      this.props.filtro.reload = false;
    }
  }

  render() {
    return (
      <div>
        
        <InfiniteScroll
          dataLength={this.state.items.length}
          next={this.fetchMoreData}
          hasMore={this.state.hasMore}
          loader={
            // <Spinner animation="border" variant="primary" role="status">
              <span className="visually-hidden">Cargando...</span>
            // </Spinner>
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
          <div>
            <Table bordered hover className="caption-top mb-1">
            {/* <Table className="caption-top mb-1"> */}
              <caption className="py-0">
                {" "}
                {this.state.items.length} registro(s) encontrado(s)
              </caption>
              <thead>
                <tr className="color-header1 text-white">
                  <th className="text-center align-middle m-0 p-0">Id</th>
                  <th className="text-center align-middle m-0 p-0">
                    Solicitante
                  </th>
                  <th className="text-center align-middle m-0 p-0">Estado</th>
                  <th className="text-center align-middle m-0 p-0">Ver</th>
                </tr>
              </thead>
              <tbody>
              {this.state.items.map((soliciPrecalif, i) => (
                        <tr key={soliciPrecalif.precalId}>
                          <td>
                            {soliciPrecalif.precalId
                              .toString()
                              .padStart(4, "0")}
                          </td>
                          <td>{soliciPrecalif.webContribNomCompleto}</td>
                          <td>
                            {/* {soliciPrecalif.webContribNomCompleto} */}
                            <ProgressBar
                              now={soliciPrecalif.porc_evaluacion}
                              label={`${soliciPrecalif.porc_evaluacion}%`}
                              variant={soliciPrecalif.rechazado ? "danger" : ""}
                            />
                            <div>
                              <small>{soliciPrecalif.ofic_pendiente}</small>
                            </div>
                          </td>
                          <td className="text-center px-1 mx-0">
                            <Button
                              href={`/pre_licencia_ver/${soliciPrecalif.precalId}`}
                              variant="success"
                              size="sm"
                              title="Ver solicitud"
                            >
                              <i className="fas fa-eye"></i>
                            </Button>
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

export default PreLicenciaScrollComponent;

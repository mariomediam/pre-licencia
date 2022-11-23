import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Table } from "react-bootstrap";

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
          <div style={{border: '1px solid lightgrey'}}>
            <Table hover className="caption-top mb-1">
            {/* <Table className="caption-top mb-1"> */}
              
              <thead>
                <tr className="color-header1 text-white">
                  <th className="text-center align-middle m-0 p-0">Código</th>
                  <th className="text-center align-middle m-0 p-0">
                    Nombre / Razón social
                  </th>
                  {/* <th className="text-center align-middle m-0 p-0">Domicilio</th>                   */}
                </tr>
              </thead>
              <tbody>
              {this.state.items.map((contribuyente, i) => (
                        <tr key={contribuyente.Código}>
                          <td>
                            {contribuyente.Código}
                          </td>
                          <td>{contribuyente.Identificación} <br/><small><small>{contribuyente.Dirección}</small></small></td>
                          {/* <td>{contribuyente.Dirección}</td> */}
                          
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

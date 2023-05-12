import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Table } from "react-bootstrap";
import { obtenerTrabajadorCorreoPagination } from "../../../../services/rrhhService";
import { TrabajadorCorreoListaItemComponent } from "./TrabajadorCorreoListaItemComponent";

export default class TrabajadorCorreoListaComponent extends Component {
  state = {
    setField: this.props.setField,
    handleClose: this.props.handleClose,
    items: this.props.filtro.items,
    hasMore: true,
    filtro: this.props.filtro,
    pageNext: "",
    countRecords: 0,
  };

  //   seleccionarLugar = (e) => {
  //     const { C005Cod_Lug, C005Nombre, C005Provincia, C005Distrito } =
  //       this.state.items
  //         .filter((item) => item.C005Cod_Lug === e.target.id)
  //         .shift();

  //     const lugarSelecc = {"codigoLugar" : C005Cod_Lug, "nombreLugar" : C005Nombre ? C005Nombre.trim() : "", "direccProv" : C005Provincia ? C005Provincia.trim() : "", "direccDist" : C005Distrito ? C005Distrito.trim() : ""}
  //     this.state.setField(lugarSelecc, "");
  //     this.state.handleClose();
  //   };

  fetchMoreData = async () => {
    if (this.state.pageNext) {
      const URL = this.state.pageNext;
      const { next, results, count } = await obtenerTrabajadorCorreoPagination(
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
    console.log({ reload: this.props.filtro.reload})
    if (this.props.filtro.reload) {
      //   if (!this.props.filtro.opcion) {
      //     return;
      //   }

      //   if (this.props.filtro.opcion.length === 0) {
      //     return;
      //   }

      if (!this.props.filtro.valor) {
        return;
      }

      if (this.props.filtro.valor.length === 0) {
        return;
      }

      let URL = encodeURI(
        `${process.env.REACT_APP_API}/rrhh/lista-trabajador-correo-p?valor=${this.props.filtro.valor}`
      );

      console.log({ URL });
      const { next, results, count } = await obtenerTrabajadorCorreoPagination(
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
                  <th className="text-center align-middle m-0 p-0">
                    DNI / Nombre
                  </th>
                  <th className="text-center align-middle m-0 p-0">Correo</th>
                  <th className="text-center align-middle m-0 p-0">
                    Responsable
                  </th>
                  <th className="text-center align-middle m-0 p-0"></th>
                  <th className="text-center align-middle m-0 p-0"></th>
                </tr>
              </thead>
              <tbody>
                {this.state.items.map((trabajadorCorreo, i) => (
                    <TrabajadorCorreoListaItemComponent key={trabajadorCorreo.c_trana_dni} {...trabajadorCorreo} />
                ))}
              </tbody>
            </Table>
          </div>
        </InfiniteScroll>
      </div>
    );
  }
}

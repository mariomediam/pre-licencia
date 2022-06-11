import React from "react";
import { render } from "react-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import {
  obtenerGiroNegocio,
  obtenerGiroNegocioURL,
} from "../../services/licFuncService";

const style = {
  height: 30,
  border: "1px solid green",
  margin: 6,
  padding: 8,
};

class PreLicenciaScrollComponent extends React.Component {
  //   state = {
  //     items: Array.from({ length: 20 }),
  //     hasMore: true,
  //     filtro: this.filtro
  //   };

  state = {
    items: this.props.filtro.items,
    hasMore: true,
    filtro: this.props.filtro,
    pageNext: "",
  };

  // verPrecalificacion = async () => {
  //   const { count, next, previous, results } = await obtenerGiroNegocio(
  //     this.state.page_nro
  //   );
  // };

  fetchMoreData = async () => {

    if (this.state.pageNext){
      const URL = this.state.pageNext
      const {     
        next,        
        results,      
      } = await obtenerGiroNegocioURL(URL);

      this.setState({
        items: this.state.items.concat(results),
        hasMore: next ? true : false,
        pageNext: next,
      });

    }


    // if (this.state.items.length >= this.state.filtro.count) {
    //   this.setState({ hasMore: false });
    //   return;
    // }
    // // a fake async api call like which sends
    // // 20 more records in .5 secs
    // setTimeout(() => {
    //   this.setState({
    //     items: this.state.items.concat(Array.from({ length: 20 })),
    //   });
    // }, 500);
  };

  componentDidMount() {
    console.log("componentDidMount");
  }
  async componentDidUpdate() {
    console.log("componentDidUpdate");

    if (this.props.filtro.reload) {
      const URL = `${process.env.REACT_APP_API}/licfunc/giro-negocio-p?p=1&page_size=20`;     
      const {     
        next,        
        results,      
      } = await obtenerGiroNegocioURL(URL);
     
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
        <h1>Giro de Negocio</h1>
        <hr />
        <InfiniteScroll
          dataLength={this.state.items.length}
          next={this.fetchMoreData}
          hasMore={this.state.hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {this.state.items.map((i, index) => (
            <div style={style} key={index}>
              div - #{index} {i ? i.giroNegNombre : 'Vacio'}
            </div>
          ))}
        </InfiniteScroll>
      </div>
    );
  }
}

export default PreLicenciaScrollComponent;

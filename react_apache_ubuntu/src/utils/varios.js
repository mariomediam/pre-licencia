
export const obtenerNombreMes = (numeroMes) => {
    const nombresMeses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    return nombresMeses[numeroMes - 1];
  }

  export const transformarFecha = (fecha) => {
    
    if (typeof(fecha) === "string" && fecha.length === 10) {
      fecha += " 00:00:00";
    }

    const  fechaObjeto = new Date(fecha);
    const dia = fechaObjeto.getDate().toString().padStart(2, "0");
    const mes = (fechaObjeto.getMonth() + 1).toString().padStart(2, "0");
    const anio = fechaObjeto.getFullYear().toString();
    const horas = fechaObjeto.getHours().toString().padStart(2, "0");
    const minutos = fechaObjeto.getMinutes().toString().padStart(2, "0");
    const segundos = fechaObjeto.getSeconds().toString().padStart(2, "0");
    const fechaTransformada = `${dia}/${mes}/${anio} ${horas}:${minutos}:${segundos}`;
    return fechaTransformada;
  }

  export const validarEmail = (emailField) => {
                    
    // const validEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    const validEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
  
    if( validEmail.test(emailField) ){
      return true;
    }else{
      return false;
    }
  } 
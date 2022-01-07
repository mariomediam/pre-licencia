// import axios from "axios"
import UseAxios from '../utils/useAxios'

const URL = `${process.env.REACT_APP_API}/licfunc`

const obtenerPrecalUsuEstado = async(login, estado) => {
    try {
        
        let api = UseAxios()

        let URLPrecalUsuEstado = `${URL}/precal-usu-estado?login=${login}`
                      
        // let { data : { content} } = await api.get(`${URL}/precal-usu-estado?login=${login}&estado=${estado}`)                

        if (estado){
            URLPrecalUsuEstado = `${URLPrecalUsuEstado}&estado=${estado}`
        }

        console.log(URLPrecalUsuEstado)

        let { data : { content} } = await api.get(`${URLPrecalUsuEstado}`)                
        
        return content //ya tenemos los datos
        
    } catch (error) {
        throw error
    }
}

export{
    obtenerPrecalUsuEstado
}
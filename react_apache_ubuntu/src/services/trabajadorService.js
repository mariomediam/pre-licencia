// import axios from "axios"
import UseAxios from '../utils/useAxios'

const URL = `${process.env.REACT_APP_API}/buscar-trabajador`

const obtenerTrabajador = async(field, valor) => {
    try {
        
        let api = UseAxios()
        
        // let { data: {data} } = await axios.get(`${URL}?field=${field}&valor=${valor}`)        
        let { data: {data} } = await api.get(`${URL}?field=${field}&valor=${valor}`)

        
        
        return data //ya tenemos los datos
    } catch (error) {
        throw error
    }
}

export{
    obtenerTrabajador
}
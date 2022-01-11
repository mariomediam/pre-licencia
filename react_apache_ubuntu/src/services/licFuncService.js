import UseAxios from '../utils/useAxios'

const URL = `${process.env.REACT_APP_API}/licfunc`

const obtenerPrecalUsuEstado = async(login, estado) => {
    try {
        
        let api = UseAxios()

        let URLPrecalUsuEstado = `${URL}/precal-usu-estado?login=${login}`
                      
        if (estado){
            URLPrecalUsuEstado = `${URLPrecalUsuEstado}&estado=${estado}`
        }

        let { data : { content} } = await api.get(`${URLPrecalUsuEstado}`)                
        
        return content 
        
    } catch (error) {
        throw error
    }
}

const obtenerPrecalificacionPorId = async(precalId) => {
    try {
        
        let api = UseAxios()

        let URLPrecalificacion = `${URL}/precalificacion/${precalId}`
                              
        let { data : { content} } = await api.get(`${URLPrecalificacion}`)                
        
        return content 
        
    } catch (error) {
        throw error
    }
}

const obtenerGirosPorPrecalId = async(precalId) => {
    try {
        
        let api = UseAxios()

        let URLPrecalificacion = `${URL}/precal-giro-neg/${precalId}`
                              
        let { data : { content} } = await api.get(`${URLPrecalificacion}`)                
        
        return content 
        
    } catch (error) {
        throw error
    }
}


const obtenerCuestionarioPorPrecalId = async(precalId) => {
    try {
        
        let api = UseAxios()

        let URLPrecalificacion = `${URL}/precal-cuestionario/${precalId}`
                              
        let { data : { content} } = await api.get(`${URLPrecalificacion}`)                
        
        return content 
        
    } catch (error) {
        throw error
    }
}

const obtenerEvaluacionPorPrecalIdTipoEval = async(precalId, tipoEvalId) => {
    try {
        
        let api = UseAxios()

        let URLPrecalificacion = `${URL}/precal-eval/${precalId}/${tipoEvalId}`
                              
        let { data : { content} } = await api.get(`${URLPrecalificacion}`)                
        
        return content 
        
    } catch (error) {
        throw error
    }
}

export{
    obtenerPrecalUsuEstado,
    obtenerPrecalificacionPorId,
    obtenerGirosPorPrecalId,
    obtenerCuestionarioPorPrecalId,
    obtenerEvaluacionPorPrecalIdTipoEval
}
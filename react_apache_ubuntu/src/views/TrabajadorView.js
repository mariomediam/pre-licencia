import { useState, useRef } from 'react'
import { useForm } from "react-hook-form";
import { obtenerTrabajador } from '../services/trabajadorService'
import SelectTrabajador from '../components/TrabajadorComponent'
// import AuthContext from '../context/AuthContext'

import Header from '../components/Header';

export default function TrabajadorView(){

    //const {userName, setUserName, user} = useContext(AuthContext)

    const [trabajador, setTrabajador] = useState([])

    const inputBusqueda = useRef()

    

    const {		
		handleSubmit
	} = useForm();

    const ejecutarBusqueda = async () => {
        
        let nroDNI = inputBusqueda.current.value
        const trabajadorTmp = await obtenerTrabajador("DNI", nroDNI)
        setTrabajador(trabajadorTmp)
        
    }

  
    return (

        <div>
            <Header />
            <div className="d-flex justify-content-center">
                <div className="col-sm-12 col-md-4">                   
                    <h5>Buscar trabajador</h5>               
                    <form onSubmit={handleSubmit(ejecutarBusqueda)}>
                        <div className="d-flex">
                            <input 
                                type="text" 
                                className="form-control"
                                placeholder="Ingrese DNI del trabajador"  
                                ref={inputBusqueda}            
                            />
                            <button type="submit" className="btn btn-dark">
                                    Buscar
                            </button>
                        
                        </div>
                        <SelectTrabajador list_trabajador={trabajador} />

                    </form>
                
                </div>
            </div>
        </div>
    )

}
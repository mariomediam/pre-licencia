export default function SelectTrabajador ({list_trabajador}) { 
    return (
        <div>
            <ul>
                {list_trabajador.map((trabajador, i) => (                        
                    <li key={i}>Nombre: {trabajador.n_nombre_completo}</li>
                ))} 
            </ul>           
        </div>
    )
}

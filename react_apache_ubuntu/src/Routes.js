import {Route} from 'react-router-dom'
import TrabajadorView from './views/TrabajadorView'

export default function Routes() {
    return (
        <div>
            {/* <Route path="/trabajador" exact component={TrabajadorView} /> */}
            <Route path='/trabajador' element={<TrabajadorView/>} />
        </div>
    )
}
import { createContext, useState, useEffect} from 'react'
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext()

export default AuthContext;


export const AuthProvider = ({children}) => {

    let [userName, setUserName] = useState("")
    let [authTokens, setAuthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(()=> localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    let [loading, setLoading] = useState(false)
    
    const navigate = useNavigate();

    
    // setLoading(false)

    useEffect(() => {
        let userNameTmp = null
        if (localStorage.getItem('authTokens')){
            userNameTmp = jwt_decode(JSON.parse(localStorage.getItem('authTokens')).access).user_id
        }
        setUserName(userNameTmp)        
    }, [])

    let tokenEsValido = () => {
        let valido = false

        if (localStorage.getItem("authTokens")){
            let authTokens = JSON.parse(localStorage.getItem("authTokens"));
            let authTokensDecode = jwt_decode(authTokens.access);
            const isExpired = dayjs.unix(authTokensDecode.exp).diff(dayjs()) - authTokens.diffTime  < 1;
            if (!isExpired){
                valido = true
            }
        }   

        return valido
    }

    let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        navigate('/');
    }


    let contextData = {
        userName:userName,
        setUserName:setUserName,
        authTokens:authTokens,
        setAuthTokens:setAuthTokens,
        user:user,
        setUser:setUser,
        loading:loading,
        setLoading:setLoading,
        tokenEsValido:tokenEsValido,
        logoutUser: logoutUser,
    }

    


    
    return(
        <AuthContext.Provider value={contextData} >
            {loading ? null : children}
        </AuthContext.Provider>
    )
}
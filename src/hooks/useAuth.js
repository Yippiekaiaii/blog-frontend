import { useSelector } from "react-redux"
import { selectCurrentToken } from "../features/auth/authSlice"
import jwtDecode from 'jwt-decode'


const useAuth = () => {

        //Get current auth token
        const token = useSelector(selectCurrentToken)   

        let isLoggedIn = false

        if (token) {

            //Decode the access token
            const decoded = jwtDecode(token)

            //Destructure username & role
            const {username,role} = decoded.UserInfo

            isLoggedIn = true

            return {username, role, isLoggedIn}

        }

        //Return this if no tolen present
        return {username: '', role: 'none'}


}

export default useAuth



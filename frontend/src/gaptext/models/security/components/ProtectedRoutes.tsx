import {useContext} from "react";
import {AuthContext} from "../common/AuthContext";
import {Navigate, Outlet} from "react-router-dom";
import {urlLogin} from "../../../../components/navigation/PageModel";

export default function ProtectedRoutes() {
    const {isAuthenticated} = useContext(AuthContext)

    return (
        isAuthenticated ? <Outlet/> : <Navigate to={urlLogin}/>
    )
}
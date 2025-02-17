import { Outlet, Navigate } from "react-router-dom";
import { useStateContext } from "../contexts/contextProvider";
import '../index.css';

export default function guestLayout(){
    const {token} = useStateContext();
    if(token){
        return <Navigate to='/admin/users' />
    }
    return (
        <div>
            <Outlet />
        </div>
    )
}
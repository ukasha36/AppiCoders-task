import { Outlet, Navigate } from "react-router-dom";
import { useStateContext } from "../contexts/contextProvider";
import '../index.css';

export default function AgentGuestLayout(){
    // const {token} = useStateContext();
    // if(token){
        // return <Navigate to='/agent/users' />
    // }
    return (
        <div>
            <Outlet />
        </div>
    )
}
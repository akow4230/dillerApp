import React from 'react';
import './style.css'
import {useNavigate} from "react-router-dom";

function Index(props) {
    const navigate = useNavigate()
    return (
        <div className={"dashboardLeftMenu d-flex flex-column justify-content-center align-items-center text-center gap-3"}>
            <div className="box"><i style={{
                color: "white", fontSize: 35,
            }} className="fa-solid fa-rocket"></i>
                <p style={{color: "white"}}>Plans</p>
            </div>
            <div className="box"><i style={{
                color: "white", fontSize: 35,
            }} className="fa-solid fa-cart-shopping"></i>
                <p style={{color: "white"}}>Applications</p>
            </div>
            <div className="box"><i style={{
                color: "white", fontSize: 35,
            }} className="fa-solid fa-server"></i>
                <p style={{color: "white"}}>Stock</p>
            </div>
            <div onClick={()=>navigate("/dashboard/clients")} className="box"><i style={{
                color: "white", fontSize: 35,
            }} className="fa-solid fa-users"></i>
                <p style={{color: "white"}}>Clients</p>
            </div>
            <div className="box"><i style={{
                color: "white", fontSize: 35,
            }} className="fa-solid fa-user-secret"></i>
                <p style={{color: "white"}}>Agents</p>
            </div>
            <div className="box"><i style={{
                color: "white", fontSize: 35,
            }} className="fa-solid fa-signal"></i>
                <p style={{color: "white"}}>Reports</p>
            </div>
            <div onClick={()=>navigate("/dashboard/settings")} className="box"><i style={{
                color: "white", fontSize: 35,
            }} className="fa-solid fa-gears"></i>
                <p style={{color: "white"}}>Settings</p>
            </div>
        </div>
    );
}

export default Index;
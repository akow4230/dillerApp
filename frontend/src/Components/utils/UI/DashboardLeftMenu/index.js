import React from 'react';
import './style.css'
import {useNavigate} from "react-router-dom";

function Index(props) {
    const navigate = useNavigate()
    return (
        <div className={"dashboardLeftMenu"}>
            <div className="box"><i style={{
                color: "white", fontSize: 50,
                marginLeft: 23,
                marginTop: 10
            }} className="fa-solid fa-rocket"></i>
                <p style={{marginLeft: 30, color: "white"}}>Plans</p>
            </div>
            <div className="box"><i style={{
                color: "white", fontSize: 50,
                marginLeft: 18,
                marginTop: 10
            }} className="fa-solid fa-cart-shopping"></i>
                <p style={{marginLeft: 3, color: "white"}}>Applications</p>
            </div>
            <div className="box"><i style={{
                color: "white", fontSize: 50,
                marginLeft: 23,
                marginTop: 10
            }} className="fa-solid fa-server"></i>
                <p style={{marginLeft: 25, color: "white"}}>Stock</p>
            </div>
            <div onClick={()=>navigate("/clients")} className="box"><i style={{
                color: "white", fontSize: 50,
                marginLeft: 18,
                marginTop: 10
            }} className="fa-solid fa-users"></i>
                <p style={{marginLeft: 25, color: "white"}}>Clients</p>
            </div>
            <div className="box"><i style={{
                color: "white", fontSize: 50,
                marginLeft: 24,
                marginTop: 10
            }} className="fa-solid fa-user-secret"></i>
                <p style={{marginLeft: 20, color: "white"}}>Agents</p>
            </div>
            <div className="box"><i style={{
                color: "white", fontSize: 50,
                marginLeft: 16,
                marginTop: 10
            }} className="fa-solid fa-signal"></i>
                <p style={{marginLeft: 18, color: "white"}}>Reports</p>
            </div>
            <div onClick={()=>navigate("/dashboard/settings")} className="box"><i style={{
                color: "white", fontSize: 50,
                marginLeft: 18,
                marginTop: 10
            }} className="fa-solid fa-gears"></i>
                <p style={{marginLeft: 18, color: "white"}}>Settings</p>
            </div>
        </div>
    );
}

export default Index;
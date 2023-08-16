import React, {useState} from 'react';
import './style.css';
import {Link, useNavigate} from 'react-router-dom';
import {Button, Dropdown} from 'react-bootstrap';

function Index(props) {
    const [clients, setClients] = useState(false);
    const navigate = useNavigate();


    return (
        <div
            className={"dashboardLeftMenu d-flex flex-column justify-content-center align-items-center text-center gap-3"}>
            <div style={{
                minHeight: "100%",
                width: "100%",
                gap: "5%",
                display: "flex",
                flexDirection: 'column',
                paddingTop: "30px"
            }}>
                <div className="box"><i style={{
                    color: "white", fontSize: "1.5vw",
                }} className="fa-solid fa-rocket"></i>
                    <p style={{color: "white"}}>Plans</p>
                </div>
                <div className="box"><i style={{
                    color: "white", fontSize: "1.5vw",
                }} className="fa-solid fa-cart-shopping"></i>
                    <p style={{color: "white"}}>Applications</p>
                </div>
                <div className="box"><i style={{
                    color: "white", fontSize: "1.5vw",
                }} className="fa-solid fa-server"></i>
                    <p style={{color: "white"}}>Stock</p>
                </div>
                <div
                    className="box client-box"><i style={{
                    color: "white", fontSize: "1.5vw"
                }} className="fa-solid fa-users"></i>
                    <p style={{color: "white"}}>Clients</p>
                    <div
                        className={"client-dropdown"}
                    >
                        <div style={{
                            display:"flex",
                            flexDirection:"column",
                        }}>
                            <Link className={"clientLink"} style={{textDecoration:"none",padding:"10px", color:"white", fontSize:'12pt'}} to={"/dashboard/clients"}>Clients</Link>
                            <hr style={{color:"white", margin:"0"}}/>
                            <Link className={"clientLink"} style={{textDecoration:"none",padding:"10px", color:"white", fontSize:"12pt"}} to={"/dashboard/clients/map"}>Clients on the map</Link>
                        </div>
                    </div>
                </div>
                <div className="box"><i style={{
                    color: "white", fontSize: "1.5vw",
                }} className="fa-solid fa-user-secret"></i>
                    <p style={{color: "white"}}>Agents</p>
                </div>
                <div className="box"><i style={{
                    color: "white", fontSize: "1.5vw",
                }} className="fa-solid fa-signal"></i>
                    <p style={{color: "white"}}>Reports</p>
                </div>
                <div onClick={() => navigate("/dashboard/settings")} className="box"><i style={{
                    color: "white", fontSize: "1.5vw",
                }} className="fa-solid fa-gears"></i>
                    <p style={{color: "white"}}>Settings</p>
                </div>

            </div>

        </div>
    );
}

export default Index;
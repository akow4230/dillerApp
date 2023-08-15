import React, { useState } from 'react';
import './style.css';
import { Link, useNavigate } from 'react-router-dom';

function Index(props) {
    const [clients, setClients] = useState(false);
    const navigate = useNavigate();

    const handleClientMouseEnter = () => {
        setClients(true);
    };

    const handleClientMouseLeave = () => {
        setClients(false);
    };

    return (
        <div className={'dashboardLeftMenu d-flex flex-column justify-content-center align-items-center text-center'} style={{ maxHeight: '1400px', gap:"2%"}}>
            <div className="box">
                <i  className="fa-solid fa-rocket icon-style"></i>
                <p style={{ color: 'white' }}>Plans</p>
            </div>
            <div className="box">
                <i  className="fa-solid fa-cart-shopping icon-style"></i>
                <p style={{ color: 'white' }}>Applications</p>
            </div>
            <div className="box">
                <i  className="fa-solid fa-server icon-style"></i>
                <p style={{ color: 'white' }}>Stock</p>
            </div>
            <div
                onMouseEnter={handleClientMouseEnter}
                onMouseLeave={handleClientMouseLeave}
                className="box"
            >

                <div
                    onMouseEnter={() => setClients(true)}
                    onMouseLeave={() => setClients(false)}
                    className="box"><i style={{
                    color: "white", fontSize: 35
                }} className="fa-solid fa-users"></i>
                    <p style={{color: "white"}}>Clients</p>
                    {
                        clients ? <div
                            style={{
                                position: "absolute",
                                left: 95,
                                width: 200,
                                background: "#415a77",
                                color: "white",
                                border: "1px solid",
                                zIndex:"99"
                            }}
                        >
                            <div
                                onClick={() => navigate("/dashboard/clients")}
                                style={{
                                    width: "100%",
                                    height: 50,
                                    border: "1px solid",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}
                            >
                                <b>Client</b>
                            </div>
                            <div
                                onClick={() => navigate("/dashboard/clients/map")}
                                style={{
                                    width: "100%",
                                    height: 50,
                                    border: "1px solid",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}

                            >
                                <b>Client on map</b>
                            </div>
                        </div> : ""
                    }
                </div>
            </div>
            <div className="box">
                <i  className="fa-solid fa-user-secret icon-style"></i>
                <p style={{ color: 'white' }}>Agents</p>
            </div>
            <div className="box">
                <i  className="fa-solid fa-signal icon-style"></i>
                <p style={{ color: 'white' }}>Reports</p>
            </div>
            <div onClick={() => navigate('/dashboard/settings')} className="box">
                <i  className="fa-solid fa-gears icon-style"></i>
                <p style={{ color: 'white' }}>Settings</p>
            </div>
        </div>
    );
}

export default Index;

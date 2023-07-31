import React from 'react';
import {Outlet} from "react-router-dom";

function Settings(props) {
    return (
        <div className={"d-flex bg-white gap-3 p-4 h-100"}>
            <div className={"left-side"} style={{width:"30%"}}>
                <div style={{background:"#f89367", height:"50px", color:"white", width:"100%", display:"flex", alignItems:"center", justifyContent:"center"}}>Settings</div>
            </div>
            <Outlet />
        </div>
    );
}

export default Settings;
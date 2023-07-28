import React from 'react';
import './style.css'
import DashboardTopBar from "../utils/UI/DashboardTopBar";
import DashboardLeftMenu from "../utils/UI/DashboardLeftMenu";

function Index(props) {
    return (
        <div className={"dashboard"}>
            <div className="top-bar">
                <DashboardTopBar/>
            </div>
            <div className="bottom-bar">
                <div className="left-menu">
                    <DashboardLeftMenu/>
                </div>
            </div>
        </div>
    );
}

export default Index;
import React, {useEffect} from 'react';
import './style.css';
import DashboardTopBar from "./DashboardTopBar/index";
import DashboardLeftMenu from "./DashboardLeftMenu/index";
import {useDispatch, useSelector} from 'react-redux';
import {navigateTo} from "../../redux/reducers/DashboardSlice";
import {Outlet} from "react-router-dom";

// import {useNavigate} from "react-router-dom"; // Import the navigateTo action creator

function Index(props) {
    const dispatch = useDispatch();
    const response = useSelector((state) => state.dashboard);
    // const navigate = useNavigate();
    useEffect(() => {
        dispatch({type: 'dashboard/getDashboardData'});
    }, [dispatch]);
    useEffect(() => {
        if (response?.error) {
            dispatch(navigateTo("/404"));
        }
    }, [response, dispatch]);
    return (
        <div className={"dashboard"}>
            <div className="top-bar">
                <DashboardTopBar data={response?.data}/>
            </div>
            <div className="bottom-bar d-flex">
                <div className="left-menu">
                    <DashboardLeftMenu/>
                </div>
                <div className={"right-menu w-100 p-4"} style={{background: "#c2c5d5", overflowY: "auto"}}>
                    <Outlet/>
                </div>
            </div>
        </div>
    );
}

export default Index;

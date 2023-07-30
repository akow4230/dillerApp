// Index.js
import React, { useEffect } from 'react';
import './style.css';
import DashboardTopBar from "../utils/UI/DashboardTopBar";
import DashboardLeftMenu from "../utils/UI/DashboardLeftMenu";
import { useSelector, useDispatch } from 'react-redux';
import { navigateTo } from "../../redux/reducers/DashboardSlice";
// import {useNavigate} from "react-router-dom"; // Import the navigateTo action creator

function Index(props) {
    const dispatch = useDispatch();
    const response = useSelector((state) => state.dashboard);
    // const navigate = useNavigate();
    useEffect(() => {
        dispatch({ type: 'dashboard/getDashboardData' });
    }, [dispatch]);

    useEffect(() => {
        console.log(response);
        // Check if there's an error in the response
        console.log(response)
        if (response?.error) {
            console.log("Hello")

            console.log(response)
            console.log("Hello")
            dispatch(navigateTo("/"));
        }
    }, [response, dispatch]);

    return (
        <div className={"dashboard"}>
            <div className="top-bar">
                <DashboardTopBar data={response?.data} />
            </div>
            <div className="bottom-bar">
                <div className="left-menu">
                    <DashboardLeftMenu />
                </div>
            </div>
        </div>
    );
}

export default Index;

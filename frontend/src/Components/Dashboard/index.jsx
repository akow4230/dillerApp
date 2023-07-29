// Index.js
import React, { useEffect } from 'react';
import './style.css';
import DashboardTopBar from "../utils/UI/DashboardTopBar";
import DashboardLeftMenu from "../utils/UI/DashboardLeftMenu";
import { useSelector, useDispatch } from 'react-redux';
import { navigateTo } from "../../redux/reducers/DashboardSlice"; // Import the navigateTo action creator

function Index(props) {
    const dispatch = useDispatch();
    const response = useSelector((state) => state.dashboard);

    async function getDashboardData() {
        // Call the getDashboardData action and return the promise
        return dispatch({ type: 'dashboard/getDashboardData' });
    }

    useEffect(() => {
        getDashboardData()
            .then((res) => {
                // Check if there's an error in the response
                if (res?.error) {
                    dispatch(navigateTo("/login"));
                }
            })
            .catch((err) => {
                dispatch(navigateTo("/login"));
            });
    }, [dispatch]);

    useEffect(() => {
        console.log(response);
    }, [response]);

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

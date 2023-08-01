// Index.js
import React, { useEffect } from 'react';
import './style.css';
import DashboardTopBar from "./DashboardTopBar/index";
import DashboardLeftMenu from "./DashboardLeftMenu/index";
import { useSelector, useDispatch } from 'react-redux';
import { navigateTo } from "../../redux/reducers/DashboardSlice";
import {Outlet} from "react-router-dom";
import Table from "../UniversalUI/Table/Table";
// import {useNavigate} from "react-router-dom"; // Import the navigateTo action creator

function Index(props) {
    const columns = [
        {
            id: 1,
            title: "Id",
            key: "id",
            type: "int",
            show: true,
        },
        {
            id: 2,
            title: "Title",
            key: "title",
            type: "string",
            show: true,
        },
        {
            id: 3,
            title: "Url",
            key: "url",
            type: "string",
            show: true
        }]
    const dispatch = useDispatch();
    const response = useSelector((state) => state.dashboard);
    // const navigate = useNavigate();
    useEffect(() => {
        dispatch({ type: 'dashboard/getDashboardData' });
    }, [dispatch]);

    useEffect(() => {
        if (response?.error) {
            dispatch(navigateTo("/"));
        }
    }, [response, dispatch]);

    return (
        <div className={"dashboard"}>
            <div className="top-bar">
                <DashboardTopBar data={response?.data} />
            </div>
            <div className="bottom-bar d-flex">
                <div className="left-menu">
                    <DashboardLeftMenu />
                </div>
                <div className={"right-menu w-100 p-4"} style={{background:"#c2c5d5"}}>
                    <Table
                        isDark={false}
                        requestApi={"/api/v1/test?page={page}&size={limit}"}
                        columns={columns}
                    />
                    {/*<Outlet />*/}
                </div>
            </div>
        </div>
    );
}

export default Index;

// Index.js
import React, {useEffect} from 'react';
import './style.css';
import {useDispatch, useSelector} from 'react-redux';
import {navigateTo} from "../../redux/reducers/DashboardSlice";
import {Outlet, useNavigate} from "react-router-dom";
import Table from "../UniversalUI/Table/Table";
import DashboardTopBar from "./DashboardTopBar";
import DashboardLeftMenu from "./DashboardLeftMenu";

function Index(props) {
    const dispatch = useDispatch();
    const response = useSelector((state) => state.dashboard);
    const navigate = useNavigate();
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

    async function getDashboardData() {
        return dispatch({type: 'dashboard/getDashboardData', navigate});
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


    return (
        <div className={"dashboard"}>
            <div className="top-bar">
                <DashboardTopBar data={response?.data}/>
            </div>
            <div className="bottom-bar">
                <div className="left-menu">
                    <DashboardLeftMenu/>
                </div>
                <div className="right-menu">
                    <Table
                        isPageNation={true}
                        isDark={false}
                        requestApi={"/api/v1/test?page={page}&size={limit}"}
                        columns={columns}
                    />
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default Index;

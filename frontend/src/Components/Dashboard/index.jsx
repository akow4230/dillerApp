import React, {useEffect} from 'react';
import './style.css'
import DashboardTopBar from "../utils/UI/DashboardTopBar";
import DashboardLeftMenu from "../utils/UI/DashboardLeftMenu";
import {useSelector, useDispatch} from 'react-redux';

function Index(props) {
    const dispatch = useDispatch();
    const response = useSelector((state) => state.dashboard);

    async function getDashboardData() {
        dispatch({type: 'dashboard/getDashboardData'})
        console.log(response)
    }

    useEffect(() => {
        getDashboardData()
    }, [])
    return (
        <div className={"dashboard"}>
            <div className="top-bar">
                <DashboardTopBar data={response?.data}/>
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
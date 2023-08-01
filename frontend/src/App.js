import React, {useEffect} from "react";
import Login from "./Components/Login/index";
import {Route, Routes, useLocation} from "react-router-dom"; // Removed unused imports
import "./Components/Login/index.css";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./Components/Dashboard/index";
import Territory from "./Components/Territory/Territory";
import Settings from "./Components/Settings/Settings";
import {useNavigate} from "react-router";
import axios from "axios";
import instance from "./Components/utils/config/instance";
import ErrorPage from "./Components/404/ErrorPage";

function App() {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const blockedPages = [
        "/dashboard",
        "/admin"
    ];
    const navigate = useNavigate();
    const location = useLocation();
    useEffect( () => {
        async function checkSecurity(){
            if (blockedPages.some((blockedPage) => location.pathname.startsWith(blockedPage))) {
                let accessToken = localStorage.getItem("access_token");
                if (accessToken !== null) {
                    const res = await instance("/api/v1/security", "GET")
                    if (res.data[0].name!=="ROLE_SUPER_ADMIN"){
                        navigate("/404")
                    }
                } else {
                    navigate("/login");
                }
            }
        }
        checkSecurity()
    }, [blockedPages, location.pathname, navigate])
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/404" element={<ErrorPage />} />
                <Route path="/dashboard" element={<Dashboard />} >
                    <Route path="/dashboard/settings" element={<Settings />} >
                        <Route path={"/dashboard/settings/territory"} element={<Territory />}/>
                    </Route>
                </Route>
            </Routes>
        </div>
    );
}

export default App;

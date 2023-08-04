import React, { useEffect } from "react";
import Login from "./Components/Login/index";
import { Route, Routes, useLocation } from "react-router-dom";
import "./Components/Login/index.css";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./Components/Dashboard/index";
import Territory from "./Components/Territory/Territory";
import Settings from "./Components/Settings/Settings";
import { useNavigate } from "react-router-dom";
import instance from "./Components/utils/config/instance";
import ErrorPage from "./Components/404/ErrorPage";

function App() {
    const blockedPages = ["/dashboard"];
    const navigate = useNavigate();
    const location = useLocation();

    const checkSecurity = async () => {
        if (blockedPages.some((blockedPage) => location.pathname.startsWith(blockedPage))) {
            let accessToken = localStorage.getItem("access_token");
            if (accessToken !== null) {
                try {
                    const res = await instance("/api/v1/security", "GET");
                    if (res?.data !== 401 && res?.error) {
                        if (res?.data[0].name !== "ROLE_SUPER_ADMIN") {
                            navigate("/404");
                        }
                    }
                } catch (error) {
                    navigate("/");
                }
            } else {
                navigate("/");
            }
        }
    };

    useEffect(() => {
        checkSecurity();
        const handleStorageChange = (event) => {
            if (!localStorage.getItem("access_token")) {
                navigate("/");
            } else {
                checkSecurity();
            }
        };
        window.addEventListener("storage", handleStorageChange);
        const handleBeforeUnload = () => {
            handleStorageChange();
        };

        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => {
            window.removeEventListener("storage", handleStorageChange);
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, []);

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard/" element={<Dashboard />}>
                    <Route path="/dashboard/settings/" element={<Settings />}>
                        <Route path={"/dashboard/settings/territory"} element={<Territory />} />
                    </Route>
                </Route>
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </div>
    );
}

export default App;

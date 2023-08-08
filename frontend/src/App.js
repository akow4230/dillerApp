import React, { useEffect, useCallback } from "react";
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
import CompanyProfile from "./Components/CompanyProfile/CompanyProfile";
import TestKeraksiz from "./Components/UniversalUI/filter/TestKeraksiz";
import Clients from "./Components/Clients/Clients";
import CustomerCategory from "./Components/CustomerCategory/CustomerCategory";

function App() {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const blockedPages = ["/dashboard"];
    const navigate = useNavigate();
    const location = useLocation();

    const checkSecurity = useCallback(async () => {
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
    }, [blockedPages, location.pathname, navigate]);

    useEffect(() => {
        checkSecurity();

        const handleStorageChange = (event) => {
            if (!localStorage.getItem("access_token")) {
                navigate("/");
                console.log("Hello")
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
    }, [checkSecurity, navigate]);

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/keraksiz" element={<TestKeraksiz />} />

                <Route path="/dashboard/" element={<Dashboard />}>
                <Route path="/dashboard/clients" element={<Clients />} />
                    <Route path="/dashboard/settings/" element={<Settings />}>
                        <Route path={"/dashboard/settings/territory"} element={<Territory />} />
                        <Route path={"/dashboard/settings/company-profile"} element={<CompanyProfile />} />
                        <Route path={"/dashboard/settings/customer-category"} element={<CustomerCategory />} />
                    </Route>
                </Route>
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </div>
    );
}

export default App;

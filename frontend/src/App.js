import React from "react";
import Login from "./Components/Login/index";
import { Route, Routes } from "react-router-dom"; // Removed unused imports
import "./Components/Login/index.css";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./Components/Dashboard/index";
import Territory from "./Components/Territory/Territory";
import Settings from "./Components/Settings/Settings";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Login />} />
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

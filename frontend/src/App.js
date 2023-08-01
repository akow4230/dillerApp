import React from "react";
import Login from "./Components/Login/index";
import { Route, Routes } from "react-router-dom"; // Removed unused imports
import "./Components/Login/index.css";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./Components/Dashboard/index";
import Filter from "./Components/UniversalUI/filter/Filter";

function App() {
    return (
        <div className="App">
            <Routes>
                {/* Each Route element represents a specific route */}
                {/* The `element` prop defines the component to render when the route matches */}
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/filter" element={<Filter />} />
            </Routes>
        </div>
    );
}

export default App;

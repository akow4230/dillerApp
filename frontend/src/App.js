import Login from "./Components/Login";
import {Route, Routes} from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import {useEffect} from "react";
import axios from "axios";


function App() {

    return (
        <div className="App">
            <Routes>
                <Route path={"/"} element={<Login/>}/>
                <Route path={"/dashboard"} element={<Dashboard/>}/>
            </Routes>
        </div>
    );
}

export default App;
import Login from "./Components/Login";
import {Route, Routes} from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import {useEffect} from "react";
import axios from "axios";


function App() {
    useEffect(()=>{
        axios({url:"http://localhost:8080/api/v1/company/dashboard", method:"GET", headers:{
                Authorization:localStorage.getItem("access_token")
            }}).then(res=>{
            console.log(res.data)
        })
    },[])
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
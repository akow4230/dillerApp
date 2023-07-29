import Login from "./Components/Login";
import {Route, Routes} from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import {useEffect} from "react";
import axios from "axios";


function App() {
    useEffect(()=>{
        axios({url:"http://localhost:8080/api/v1/company/dashboard", method:"GET", headers:{
                    Authorization:"eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2OTA2MjEwODAsImlhdCI6MTY5MDYxMzg4MCwic3ViIjoiYmYzMWVkOWMtNjljMi00NjVlLTk5NTItZjA4YzJjZDU2NTY0In0.3zhef2MqR1wjaUE8UC2OnbOuQ0qOdrW5LdW-XpyNai8"
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
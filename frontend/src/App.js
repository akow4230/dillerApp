import Login from "./Components/Login";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./Components/Login/index.css";
import Dashboard from "./Components/Dashboard/index";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={"/"} element={<Login />} />
        <Route path={"/dashboard"} element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;

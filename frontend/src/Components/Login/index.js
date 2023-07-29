import React from "react";
import { useDispatch, useSelector } from "react-redux";
import shiftLogo from "../images/shiftLogo.jpg";
import { UserLogIn, setFormData } from "../../redux/reducers/LoginSlice";
import { useNavigate } from "react-router";

function Index() {
  const { formData, isLoading, error } = useSelector(state => state.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleInputChange = e => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    dispatch(setFormData({ ...formData, [name]: newValue }));
  };
  function loginUser() {
    if (formData.phone === "" && formData.password === "") {
      alert("Please fill all dates");
      return;
    }
    if (formData.password === "") {
      alert("Please fill password");
    }
    if (formData.phone === "") {
      alert("Please fill phone");
    }
    dispatch(UserLogIn({ formData, navigate }));
  }
  return (
    <div className="Father-Login">
      <div className="Login-box">
        <div>
          <img
            className="shiftLogo"
            src={shiftLogo}
            width={100}
            height={100}
            alt=""
          />
        </div>
        <div className="body">
          <div>
            <p className="information">
              We improve the process-your disturbition
            </p>
          </div>
          <div>
            <input
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Phone Number"
              name="phone"
              type="number"
              required={true}
              className="form-control my-2"
            />
            <input
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
              name="password"
              type="password"
              required={true}
              className="form-control my-2"
            />
            <div>
              <p className="information">Shift Academy</p>
            </div>
            <div className="d-flex justify-content-start align-items-center">
              <label className="ml-2">
                <input
                  name="rememberMe"
                  value={formData.rememberMe}
                  onChange={handleInputChange}
                  type="checkbox"
                />
                Remember me
              </label>
            </div>
            <button
              className="w-100 btn btn-lg btn btn-success mt-2"
              disabled={isLoading}
              onClick={loginUser}
              type="submit"
            >
              {isLoading ? "Loading..." : "Login"}
            </button>
            <hr />
            <div className="Support-service">
              <p>Support service: +998 94 121-00-41</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;

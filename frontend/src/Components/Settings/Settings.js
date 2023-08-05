import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, Outlet, useLocation} from "react-router-dom";
import {
    getSettings
} from "../../redux/reducers/SettingsSlice";

function Settings() {
    const dispatch = useDispatch();
    const {settingsArray, isLoading} = useSelector(
        state => state.settings
    );
    const location = useLocation();
    useEffect(() => {
        dispatch(getSettings());
    }, [dispatch]);

    return (
        <div className={"d-flex bg-white gap-3 p-4 h-100"}>
            <div
                className={"left-side"}
                style={{
                    width: "20%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "3px"
                }}
            >
                <div
                    style={{
                        background: "#f89367",
                        height: "50px",
                        color: "white",
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "7px"
                    }}
                >
                    Settings Panel
                </div>
                {isLoading ? (
                    <div>Loading...</div>
                ) : (
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "5px"
                        }}
                    >
                        {Array.isArray(settingsArray) ? (
                            settingsArray.map((item, index) => (
                                <Link
                                    to={item.url}
                                    key={item.id}
                                    style={{
                                        background: location.pathname === item.url ? "#2b76bd" : "#7ec8f2",
                                        height: "50px",
                                        color: "white",
                                        width: "100%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "start",
                                        padding: "5px",
                                        borderRadius: "7px",
                                        transition: " 0.3s ease",
                                        textDecoration: "none",
                                        scale: location.pathname === item.url ? "1.1" : "1"
                                    }}
                                >
                                    {index + 1}. {item.name}
                                </Link>
                            ))
                        ) : (
                            <div>No settings available.</div>
                        )}
                    </div>
                )}
            </div>
            <Outlet/>
        </div>
    );
}

export default Settings;
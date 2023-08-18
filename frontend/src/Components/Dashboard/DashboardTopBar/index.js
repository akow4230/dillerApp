import React, {useEffect, useRef, useState} from 'react';
import './style.css'
import logo from '../../images/img.png'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {useNavigate} from "react-router-dom";

function Index({data}) {
    const navigate = useNavigate()
    const [userBox, setUserBox] = useState(false);

    function logOut() {
        localStorage.clear()
        navigate("/")
    }

    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleOutsideClick(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setUserBox(false);
            }
        }

        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);
    return (
        <div className={"dashboardTopBar d-flex align-items-center"}>
            <div className={"d-flex justify-content-center"} style={{width: "4%"}}>
                <img onClick={() => navigate("/dashboard")} src={logo} alt="Image Not Found" width={"100%"} height={"70%"}
                     style={{borderRadius: "50%", cursor: "pointer"}}/>
            </div>
            <div className={"top"}>
                <div className="box mt-3">
                    <p>Supervisor</p>
                </div>
                <div className="box mt-3">
                    <p>Sales</p>
                </div>
                <div className="box">
                    <FormControl sx={{m: 1, maxWidth: 120, minWidth:100}} size="small">
                        <InputLabel style={{color: "white"}} id="demo-select-small-label">Cash register</InputLabel>
                        <Select
                            style={{zIndex:100000}}
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            label="Cash register"
                        >
                            <MenuItem  value="">
                                <em style={{zIndex: 10}}>None</em>
                            </MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div className="box">
                    <FormControl sx={{m: 1, mmaxWidth: 120, minWidth:100}} size="small">
                        <InputLabel style={{color: "white"}} id="demo-select-small-label"><i
                            className="fa-solid fa-location-dot"></i> GPS</InputLabel>
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            // value={}
                            label="Cash register"
                            // onChange={}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div className="d-flex gap-5">
                    <div style={{background: "#8ac926", width: '150px'}}
                         className="box d-flex align-items-center justify-content-center gap-2">
                        <i className="fa-solid fa-circle-question"></i><p className={"my-3"}>Online Help</p>
                    </div>
                </div>
            </div>
            <div style={{padding: 10}} className={"top"}>
                <div style={{background: "#219ebc", maxWidth: 120, minWidth:100}}
                     className="box d-flex align-items-center justify-content-center gap-2">
                    <i className="fa-solid fa-calendar-days"></i><p
                    className={"my-3"}>{data?.currentDateAndTime ? data.currentDateAndTime : ""}</p>
                </div>
                <div style={{
                    marginLeft: 15,
                    width: 300,
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <b style={{fontSize: 20, color: "white"}}>{data?.supportPhone} </b>
                </div>
                <div style={{
                    cursor: "pointer",
                    marginLeft: 35,
                    width: 50,
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <b style={{fontSize: 20, color: "white"}}><i className="fa-solid fa-bell"></i> </b>
                </div>
                <div onClick={() => setUserBox(!userBox)} style={{
                    cursor: "pointer",
                    marginLeft: 45,
                    width: 50,
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#1b263b",
                    borderRadius: 10,
                    position: "relative"
                }} ref={dropdownRef}>
                    <b style={{fontSize: 20, color: "white"}}><i className="fa-solid fa-user-large"></i> </b>
                    {userBox ? <div className={"scale-up-ver-top"} style={{
                        position: "absolute",
                        right: -25,
                        borderRadius: 10,
                        width: 250,
                        padding: 5,
                        bottom: -125,
                        background: "#1b263b"
                    }}>
                        <div style={{
                            width: "100%",
                            height: 40,
                            display: "flex",
                            alignItems: "center",
                            paddingLeft: 10
                        }}>
                            <b style={{color: "white"}}><i className="fa-solid fa-key"></i> Change login and
                                password</b>
                        </div>
                        <div style={{
                            width: "100%",
                            height: 40,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "left",
                            paddingLeft: 10
                        }}>
                            <b style={{color: "white"}}><i className="fa-solid fa-calculator"></i> Billing</b>
                        </div>
                        <div style={{
                            width: "100%",
                            height: 40,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "left",
                            paddingLeft: 10
                        }} onClick={logOut}>
                            <b style={{color: "white"}}><i className="fa-solid fa-power-off"></i> Exit</b>
                        </div>
                    </div> : ""}
                </div>
            </div>
        </div>
    );
}

export default Index;
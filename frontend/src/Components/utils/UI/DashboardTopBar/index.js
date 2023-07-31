import React, {useEffect, useRef, useState} from 'react';
import './style.css'
import logo from '../../../images/img.png'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function Index({data}) {
    console.log(data)
    const [userBox, setUserBox] = useState(false);
    const userBoxRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (userBoxRef.current && !userBoxRef.current.contains(event.target)) {
                setUserBox(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className={"dashboardTopBar"}>
            <img src={logo} alt="Image Not Found" width={70} height={70} style={{borderRadius: "50%"}}/>
            <div className={"top"}>
                <div className="box">
                    <p>Supervisor</p>
                </div>
                <div className="box">
                    <p>Sales</p>
                </div>
                <div className="box">
                    <FormControl sx={{m: 1, minWidth: 120}} size="small">
                        <InputLabel style={{color: "white"}} id="demo-select-small-label">Cash register</InputLabel>
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
                <div className="box">
                    <FormControl sx={{m: 1, minWidth: 120}} size="small">
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
                <div style={{background: "#8ac926"}} className="box">
                    <p><i className="fa-solid fa-circle-question"></i> Online Help</p>
                </div>
            </div>
            <div style={{padding: 10}} className={"top"}>
                <div style={{
                    cursor: "pointer",
                    width: 150,
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#219ebc"
                }}>
                    <b style={{fontSize: "16pt", gap:"10px", color: "white", display:"flex", justifyContent:"center", alignItems:"center"}}><i className="fa-solid fa-calendar-days"></i><p style={{marginTop:"20px"}}>{data?.currentDateAndTime?(data?.currentDateAndTime[2]+"-"+data?.currentDateAndTime[1]+"-"+data?.currentDateAndTime[0]):""}</p> </b>

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
                <div ref={userBoxRef} onClick={() => setUserBox(!userBox)} style={{
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
                }}>
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
                        }}>
                            <b style={{color: "white"}}><i className="fa-solid fa-power-off"></i> Exit</b>
                        </div>
                    </div> : ""}
                </div>
            </div>
        </div>
    );
}

export default Index;
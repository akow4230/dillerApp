import React, {useEffect, useState} from 'react';
import Select from 'react-select';
import {connect, useDispatch} from 'react-redux';
import {changeCurrentPage, changeLoader, changeSearchParams} from "../../../redux/reducers/TableSlice";
import {useLocation} from "react-router-dom";

function Filter(props) {
    let param = props.param
    const dispatch = useDispatch();
    const searchParams = props.table.searchParams
    const location = useLocation();
    const customStyles = {
        control: (provided) => ({
            ...provided,
            marginTop:5,
            borderRadius: 8,
            minHeight: 15,
            border: '1px solid #d1d1d1',
            // zIndex:100
        }),
    };


    const handleCityChange = (obj) => {
        const {name, value} = obj;
        if(name!=='quickSearch'){
            dispatch(changeLoader());
            setTimeout(() => {
                dispatch(changeLoader());
            }, 1000);
        }
        // set searchParams
        dispatch(changeSearchParams({
            ...searchParams,
            [name]: value,
        }))
        // sent request
        dispatch(changeCurrentPage());
        props.func({
            ...searchParams,
            [name]: value,
        }, true)

    };


    const quickSearch = (
        <div className="">
            <label className="d-flex">
                <p className="my-1">Quick search:</p>
                <input
                    value={searchParams.quickSearch}
                    onChange={(e) => handleCityChange({name: 'quickSearch', value: e.target.value})}
                    name="quickSearch"
                    type="search"
                    style={{width: 180, height: 30}}
                    className="my-1 mx-1 form-control"
                    placeholder=""
                    defaultValue=''
                />
            </label>
        </div>
    );


    return (
        <div className="">
            <div className="row">
                {param?.map(item =>
                    <div key={item.name} className={" position-relative " + item.multi ? "col-3" : "col-2"}
                         style={item.multi ? {width: 320} : {width: 180}}>
                        <Select
                            name={item.name}
                            options={item.options}
                            value={searchParams[item.name]}
                            onChange={(e) => handleCityChange({name: item.name, value: e})}
                            style={{width: 70, top: -1, position: "sticky", zIndex: 11}}
                            styles={customStyles}
                            placeholder={item.placeholder}
                            isMulti={item.multi}
                            defaultValue={item.defaultValue}

                        />

                    </div>
                )}

                <div className="d-flex justify-content-end text-end">
                    {quickSearch}
                </div>
                <div>

                </div>
            </div>

        </div>
    );
}


export default connect(state => state)(Filter);

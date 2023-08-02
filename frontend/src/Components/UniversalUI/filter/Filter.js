import React, {useState} from 'react';
import Select from 'react-select';
import {connect, useDispatch} from 'react-redux';
import {changeSearchParams} from "../../../redux/reducers/TableSlice";

function Filter(props) {
    const object=props.obj
    const {obj} = props;
    const dispatch = useDispatch();
    const [options] = useState([
        {value: '10', label: 'Option 1️⃣'},
        {value: '20', label: 'Option 2️⃣'},
        {value: '30', label: 'Option 1️3'},
        {value: '40', label: 'Option 2️⃣4'},
    ]);
    const [act] = useState([
        {value: '', label: 'All'},
        {value: 'true', label: 'Active'},
        {value: 'false', label: 'NoActive'}
    ])
    const searchParams = props.table.searchParams
    const customStyles = {
        control: (provided) => ({
            ...provided,
            borderRadius: 8,
            minHeight: 15,
            border: '1px solid #d1d1d1',
        }),
    };

    const handleCityChange = (obj) => {
        const {name, value} = obj;
        dispatch(changeSearchParams({
            ...searchParams,
            [name]: value,
        }))
        if(name==='quickSearch' || name==='active'){
            props.func({
                ...searchParams,
                [name]: value,
            })

        }
    };


    const active = (
        <div className="my-1 mx-1" style={{width: 300}}>
            <Select
                name="tin"
                options={act}
                value={searchParams.active}
                onChange={(e) => handleCityChange({name: 'active', value: e})}
                style={{width: 70}}
                styles={customStyles}
                placeholder="Active.."
            />
        </div>
    );

    const tin = (
        <div className="my-1 mx-1" style={{width: 300}}>
            <Select
                name="tin"
                options={options}
                value={searchParams.tin}
                onChange={(e) => handleCityChange({name: 'tin', value: e})}
                style={{width: 70}}
                styles={customStyles}
                placeholder="Tin.."
            />
        </div>
    );

    const city = (
        <div className="my-1 mx-1" style={{width: 450}}>
            <Select
                name="city"
                options={options}
                value={searchParams.city}
                onChange={(e) => handleCityChange({name: 'city', value: e})}

                style={{width: 70}}
                styles={customStyles}
                placeholder="City.."
                isMulti
            />
        </div>
    );

    const weekDays = (
        <div className="my-1 mx-1" style={{width: 400}}>
            <Select
                name="weekDays"
                options={options}
                value={searchParams.weekDays}
                onChange={(e) => handleCityChange({name: 'weekDays', value: e})}
                style={{width: 70}}
                styles={customStyles}
                placeholder="Week days.."
                isMulti
            />
        </div>
    );

    const week = (
        <div className="my-1 mx-1" style={{width: 300}}>
            <Select
                name="week"
                options={options}
                value={searchParams.week}
                onChange={(e) => handleCityChange({name: 'week', value: e})}
                style={{width: 70}}
                styles={customStyles}
                placeholder="week.."
            />
        </div>
    );

    const customerCategories = (
        <div className="my-1 mx-1" style={{width: 400}}>
            <Select
                name="customerCategories"
                options={options}
                value={searchParams.customerCategories}
                onChange={(e) => handleCityChange({name: 'customerCategories', value: e})}
                style={{width: 70}}
                styles={customStyles}
                placeholder="Costumer Categories.."
                isMulti
            />
        </div>
    );


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
                />
            </label>
        </div>
    );

    const myFilters = {
        city,
        active,
        weekDays,
        tin,
        week,
        customerCategories,
    };

    return (
        <div className="">
            <div className="row">
                {obj.map((item) => myFilters[item])}
                {/*  button  */}
                {obj.length !== 0 && (obj.length === 1 && obj[0] !== 'active') ? (
                    <button onClick={()=>props.func(searchParams)}  style={{width: '90px'}} className="my-1 h-20 btn btn-primary">
                        Filter
                    </button>
                ) : (
                    ''
                )}
            </div>
            <div className="d-flex justify-content-end">
                {/* quickSearch */}
                {quickSearch}
            </div>
        </div>
    );
}


export default connect(state => state)(Filter);

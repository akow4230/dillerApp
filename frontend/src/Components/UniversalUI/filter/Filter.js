import React, {useEffect, useState} from 'react';
import Select from 'react-select';
import {connect, useDispatch} from 'react-redux';
import {changeSearchParams} from "../../../redux/reducers/TableSlice";

function Filter(props) {
    let param=props.param
    const dispatch = useDispatch();
    const searchParams = props.table.searchParams
    const customStyles = {
        control: (provided) => ({
            ...provided,
            borderRadius: 8,
            minHeight: 15,
            border: '1px solid #d1d1d1',
        }),
    };
useEffect(()=>{
   if(!searchParams.active ){
       props.func({active:' ', quickSearch:searchParams.quickSearch})
   }
},[])

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
            // console.log({
            //     ...searchParams,
            //     [name]: value,
            // })
        }
    };
   // const param=[
   //     {
   //      id:1,
   //      name:'active',
   //      multi:false,
   //      options:[
   //          {value: '', label: 'All'},
   //          {value: 'true', label: 'Active'},
   //          {value: 'false', label: 'NoActive'}
   //      ],
   //      defaultValue:{value: '', label: 'All'},
   //         placeholder:''
   //     },
   //     {
   //         id:2,
   //         name:'week',
   //         multi:true,
   //         options:[
   //             {value: 'MONDAY', label: 'Monday'},
   //             {value: 'TUESDAY', label: 'Tuesday'},
   //             {value: 'WEDNESDAY', label: 'Wednesday'},
   //             {value: 'THURSDAY', label: 'Thursday'},
   //             {value: 'FRIDAY', label: 'Friday'},
   //             {value: 'SATURDAY', label: 'Saturday'},
   //         ],
   //         defaultValue:[],
   //         placeholder:'week days'
   //
   //     },
   //
   //  ]



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
                {param.map(item=>
                    <div key={item.name} className="my-1 mx-1" style={item.multi?{width: 320}:{width: 180}}>
                    <Select
                        name={item.name}
                        options={item.options}
                        value={searchParams[item.name]}
                        onChange={(e) => handleCityChange({name: item.name, value: e})}
                        style={{width: 70}}
                        styles={customStyles}
                        placeholder={item.placeholder}
                        isMulti={item.multi}
                        defaultValue={item.defaultValue}

                    />
                    </div>
                )}
            </div>
            <div className="d-flex justify-content-end">

                {quickSearch}
            </div>
        </div>
    );
}


export default connect(state => state)(Filter);

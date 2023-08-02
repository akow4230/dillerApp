import React, { useState } from 'react';
import Filter from './Filter'
import Select from "react-select";
function TestKeraksiz(props) {
const selects=[

]

    // const active = (
    //     <div className="my-1 mx-1" style={{width: 300}}>
    //         <Select
    //             name="tin"
    //             options={act}
    //             value={searchParams.active}
    //             onChange={(e) => handleCityChange({name: 'active', value: e})}
    //             style={{width: 70}}
    //             styles={customStyles}
    //             defaultValue={(e) => handleCityChange({name: 'active', value: {value: '', label: 'All'}})}
    //         />
    //     </div>
    // );
    //
    // const tin = (
    //     <div className="my-1 mx-1" style={{width: 300}}>
    //         <Select
    //             name="tin"
    //             options={options}
    //             value={searchParams.tin}
    //             onChange={(e) => handleCityChange({name: 'tin', value: e})}
    //             style={{width: 70}}
    //             styles={customStyles}
    //             placeholder="Tin.."
    //         />
    //     </div>
    // );
    //
    // const city = (
    //     <div className="my-1 mx-1" style={{width: 450}}>
    //         <Select
    //             name="city"
    //             options={options}
    //             value={searchParams.city}
    //             onChange={(e) => handleCityChange({name: 'city', value: e})}
    //             style={{width: 70}}
    //             styles={customStyles}
    //             placeholder="City.."
    //             isMulti
    //         />
    //     </div>
    // );
    //
    // const weekDays = (
    //     <div className="my-1 mx-1" style={{width: 400}}>
    //         <Select
    //             name="weekDays"
    //             options={options}
    //             value={searchParams.weekDays}
    //             onChange={(e) => handleCityChange({name: 'weekDays', value: e})}
    //             style={{width: 70}}
    //             styles={customStyles}
    //             placeholder="Week days.."
    //             isMulti
    //         />
    //     </div>
    // );
    //
    // const week = (
    //     <div className="my-1 mx-1" style={{width: 300}}>
    //         <Select
    //             name="week"
    //             options={options}
    //             value={searchParams.week}
    //             onChange={(e) => handleCityChange({name: 'week', value: e})}
    //             style={{width: 70}}
    //             styles={customStyles}
    //             placeholder="week.."
    //         />
    //     </div>
    // );
    //
    // const customerCategories = (
    //     <div className="my-1 mx-1" style={{width: 400}}>
    //         <Select
    //             name="customerCategories"
    //             options={options}
    //             value={searchParams.customerCategories}
    //             onChange={(e) => handleCityChange({name: 'customerCategories', value: e})}
    //             style={{width: 70}}
    //             styles={customStyles}
    //             placeholder="Costumer Categories.."
    //             isMulti
    //         />
    //     </div>
    // );
    return (
        <div className='container'>
            <h1>Filter </h1>
            <div className=''>
                <Filter obj={['active', 'city', 'weekDays','customerCategories', 'tin','week', 'quickSearch']}/>
            </div>
        </div>
    );
}

export default TestKeraksiz;

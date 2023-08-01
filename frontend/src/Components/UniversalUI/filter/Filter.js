import React, { useState } from 'react';
import Select from 'react-select';
import {changeTableDataSize} from "../../../redux/reducers/TableSlice";

function Filter(props) {
    const [options] = useState([
        { value: '10', label: 'Option 1️⃣' },
        { value: '20', label: 'Option 2️⃣' },
        { value: '30', label: 'Option 1️3' },
        { value: '40', label: 'Option 2️⃣4' },

    ]);
    const [optionsDay] = useState([
        { value: '1', label: 'Mon' },
        { value: '2', label: 'Tue' },
        { value: '3', label: 'Wen' },

    ]);

    const customStyles = {
        control: (provided) => ({
            ...provided,
            borderRadius: 8,
            minHeight: 34,
            border: '1px solid #d1d1d1',
        }),
    };
    const [selectedValues, setSelectedValues] = useState([]);

    const handleSelectChange = (selectedOptions) => {
        setSelectedValues(selectedOptions);
    };
    const ClearIndicator = (props) => {
        return (
            <div>
                <button
                    className="btn-clear"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleClearSelection();
                    }}
                >
                    X
                </button>
            </div>
        );
    };

    const handleClearSelection = () => {
        setSelectedValues([]);
    };

    const active=(
            <div className="my-2" style={{ width: 300 }}>
                <Select
                    options={options}
                    style={{width: 70}}
                    styles={customStyles}
                    placeholder="Active.."
                />
            </div>)
    const city=(
        <div className="my-2" style={{ width: 450 }}>
            <Select
                options={options}
                isMulti
                styles={customStyles}
                placeholder="City.."
            />
        </div>)
    const weekDays=(
        <div className="my-2" style={{ width: 350 }}>
            <Select
                options={optionsDay}
                styles={customStyles}
                isMulti
                placeholder="day week.."
            />
        </div>
    )
    const tin=(
        <div className="my-2" style={{ width: 300 }}>
            <Select
                options={options}
                value={selectedValues}
                onChange={handleSelectChange}
                styles={customStyles}
                placeholder="Tin.."
                 components={{ ClearIndicator }}
            />
        </div>)
    const customerCategories=(
        <div className="my-2" style={{ width: 400 }}>
            <Select
                options={optionsDay}
                styles={customStyles}
                isMulti
                placeholder="Costumer Categories.."
            />
        </div>)

    const quickSearch=(
        <label className='' style={{height:30}}>Quick search:
            <input type='search' style={{width:180, height:30 }} className='my-1' placeholder=''/>
        </label>
    )
    return (
        <div className='container'>
            <div className='row'>
                {/*active*/}
                {active}
                {/* city multi select */}
                {city}
                {/*  Day   */}
                {weekDays}
                {/*  tin  */}
                {tin}
               {/*  customer Categories  */}
                {customerCategories}

               {/*  button  */}
                <button style={{width: '90px'}} className='my-2 h-50 btn btn-primary'>Filter</button>
                {/* quick search   */}
                {quickSearch}
            </div>
        </div>
    );
}

export default Filter;

import React, {useEffect, useState} from 'react';
import Table from "../Table/Table";
import TerritoryUpdateButton from "../../Territory/TerritoryUpdateButton";
import {changeSearchParams} from "../../../redux/reducers/TableSlice";
import {fetchCategoriesStart} from '../../../redux/reducers/CustomerCategorySlice'
import {useDispatch, useSelector} from "react-redux";
function TestKeraksiz(props) {
    const dispatch = useDispatch();
    const {  categories} = useSelector((state) => state.category);
    useEffect(()=>{
        dispatch(changeSearchParams({active:""}))
        dispatch(fetchCategoriesStart())
    },[])

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
    const columns = [
        {
            id: 1,
            title: "Name",
            key: "name",
            type: "uuid",
            show: true,
            order: 1,

        },
        {
            id: 2,
            title: "Company Name",
            key: "company.name",
            type: "str",
            show: true,
            order: 2,
            render:(item)=>{
                // console.log(item.territory)
                return <p>{item.company.name}</p>
            }

        },
        {
            id: 3,
            title: "territory",
            key: "territory.region",
            type: "str",
            show: true,
            order: 3,
            render:(item)=>{
                // console.log(item.territory)
                return <p>{item.territory.region}</p>
            }
        },
        {
            id: 4,
            title: "address",
            key: "address",
            type: "str",
            show: true,
            order: 4
        },{
            id: 6,
            title: "phone",
            key: "phone",
            type: "str",
            show: true,
            order: 6
        },{
            id: 7,
            title: "referencePoint",
            key: "referencePoint",
            type: "str",
            show: true,
            order: 7
        },{
            id: 8,
            title: "category",
            key: "category.name",
            type: "str",
            show: true,
            order: 8,
            render:(item)=>{
                // console.log(item.territory)
                return <p>{item.category.name}</p>
            }
        },{
            id: 9,
            title: "dateOfRegistration",
            key: "dateOfRegistration",
            type: "str",
            show: true,
            order: 9
        },
        {id:10,
            title:"Update",
            key:"update",
            type:"jsx",
            show:true,
            order:10,
            data:<TerritoryUpdateButton />}
    ]
    const filterParam = [
        {
            id: 1,
            name: 'active',
            multi: false,
            options: [
                {value: '', label: 'All'},
                {value: 'true', label: 'Active'},
                {value: 'false', label: 'NoActive'}
            ],
            defaultValue: {value: '', label: 'All'},
            placeholder: 'All'
        },{
            id: 1,
            name: 'category',
            multi: true,
            options:  categories.map(item => ({
                value: item.id,
                label: item.region,
            })),
            // defaultValue: {value: '', label: ''},
            placeholder: 'Customer Category'
        },
    ]
    return (
        <div className='container'>
            <h1>Filter </h1>
            <div className=''>
                {/*<Filter obj={['active', 'city', 'weekDays','customerCategories', 'tin','week', 'quickSearch']}/>*/}
                <Table
                    isDark={false}
                    requestApi={"/api/v1/client?page={page}&size={limit}"}
                    columns={columns}
                    filterParam={filterParam}
                />
            </div>
        </div>
    );
}

export default TestKeraksiz;

import React, {useEffect} from 'react';
import ClientsModal from "./ClientsModal";
import {useDispatch, useSelector} from "react-redux";
import { setEditModalVisible, setModalVisible, fetchTerritoryStart} from "../../redux/reducers/TerritorySlice";

import TerritoryUpdateButton from "../Territory/TerritoryUpdateButton";
import Table from "../UniversalUI/Table/Table";

import {changeSearchParams} from "../../redux/reducers/TableSlice";
import {fetchCategoriesStart} from '../../redux/reducers/CustomerCategorySlice'
import {fetchWeekdaysStart} from '../../redux/reducers/WeekDaySlice'
function Clients(props) {
    const { modalVisible, editModalVisible, defValueOfMap, mapState, editData } = useSelector((state) => state.clients);
    const dispatch = useDispatch();
    const closeModal = () => {
        dispatch({ type: 'clients/handleMapClear', payload: { mapState: mapState, defValueOfMap: defValueOfMap } });
        dispatch(setModalVisible(false));
    };
    const closeEditModal = () =>{
        dispatch({ type: 'clients/handleMapClear', payload: { mapState: mapState, defValueOfMap: defValueOfMap } });
        dispatch(setEditModalVisible(false))
    }
    const {  categories} = useSelector((state) => state.category);
    const {  weekdays } = useSelector((state) => state.weekday);
    const {territory } = useSelector((state)=>state.territory)
    useEffect(()=>{
        dispatch(changeSearchParams({active:""}))
        dispatch(fetchCategoriesStart())
        dispatch(fetchWeekdaysStart())
        dispatch(fetchTerritoryStart())
    },[])

    // table columns
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
                return <p>{item?.company.name}</p>
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
                return <p>{item?.territory.region}</p>
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
                return <p>{item?.category.name}</p>
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
            id: 2,
            name: 'category',
            multi: true,
            options:  categories?.map(item => ({
                value: item.id,
                label: item.region,
            })),
            // defaultValue: {value: '', label: ''},
            placeholder: 'Customer Category'
        },{
            id: 3,
            name: 'weekDay',
            multi: true,
            options:  weekdays?.map(item => ({
                value: item.id,
                label: item.name,
            })),
            // defaultValue: {value: '', label: ''},
            placeholder: 'Week day'
        },{
            id: 4,
            name: 'territory',
            multi: true,
            options:  territory?.map(item => ({
                value: item.id,
                label: item.region,
            })),
            // defaultValue: {value: '', label: ''},
            placeholder: 'City'
        },{
            id: 5,
            name: 'tin',
            multi: false,
            options: [
                {value: '', label: 'TIN'},
                {value: 'true', label: 'With TIN'},
                {value: 'false', label: 'Without TIN'}
            ],
            defaultValue: {value: '', label: 'TIN'},
            placeholder: 'TIN'
        }
    ]
    return (
        <div>
            <div>
                <button className="btn btn-success">Add client</button>
                <ClientsModal action={"Add territory"} visible={modalVisible} onClose={closeModal} />
                <ClientsModal action={"Edit territory"} data={editData} isEditing={true} visible={editModalVisible} onClose={closeEditModal}  />

            </div>
           <div className='container'>
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
        </div>
    );
}

export default Clients;
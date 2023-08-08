import React, {useEffect} from 'react';
import ClientsModal from "./ClientsModal";
import {useDispatch, useSelector} from "react-redux";
import {fetchClientsStart, setEditModalVisible, setModalVisible} from "../../redux/reducers/ClientsSlice";
import {ToastContainer} from "react-toastify";
import Table from "../UniversalUI/Table/Table";
import {changeSearchParams} from "../../redux/reducers/TableSlice";
import {fetchCategoriesStart} from '../../redux/reducers/CustomerCategorySlice'
import {fetchWeekdaysStart} from '../../redux/reducers/WeekDaySlice'
import {fetchTerritoryStart} from "../../redux/reducers/TerritorySlice";
import ClientUpdateButton from "./ClientUpdateButton";

function Clients(props) {
    const dispatch = useDispatch();
    const {modalVisible, editModalVisible, defValueOfMap, mapState, editData} = useSelector((state) => state.clients);
    const closeModal = () => {
        dispatch({type: 'clients/handleMapClear', payload: {mapState: mapState, defValueOfMap: defValueOfMap}});
        dispatch(setModalVisible(false));
    };
    const closeEditModal = () => {
        dispatch({type: 'clients/handleMapClear', payload: {mapState: mapState, defValueOfMap: defValueOfMap}});
        dispatch(setEditModalVisible(false))
    }
    const {categories} = useSelector((state) => state.category);
    const {weekdays} = useSelector((state) => state.weekday);
    const {territory} = useSelector((state) => state.territory)
    useEffect(() => {
        dispatch(changeSearchParams({active: ""}))
        dispatch(fetchCategoriesStart())
        dispatch(fetchWeekdaysStart())
        dispatch(fetchTerritoryStart())
        dispatch(fetchClientsStart())
    }, [])

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
            key: "company",
            type: "str",
            show: true,
            order: 2,
        },
        {
            id: 3,
            title: "territory",
            key: "territory.title",
            type: "str",
            show: true,
            order: 3,
            render: (item) => {
                // console.log(item.territory)
                return <p>{item?.territory.title}</p>
            }
        },
        {
            id: 4,
            title: "address",
            key: "address",
            type: "str",
            show: true,
            order: 4
        }, {
            id: 6,
            title: "phone",
            key: "phone",
            type: "str",
            show: true,
            order: 6
        }, {
            id: 7,
            title: "referencePoint",
            key: "referencePoint",
            type: "str",
            show: true,
            order: 7
        }, {
            id: 8,
            title: "category",
            key: "category.region",
            type: "str",
            show: true,
            order: 8,
            render: (item) => {
                // console.log(item?.category.region)
                return <p>{item?.category?.region}</p>
            }
        }, {
            id: 9,
            title: "dateOfRegistration",
            key: "dateOfRegistration",
            type: "str",
            show: true,
            order: 9
        },
        {
            id: 10,
            title: "Update",
            key: "update",
            type: "jsx",
            show: true,
            order: 10,
            data: <ClientUpdateButton/>
        }
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
        }, {
            id: 2,
            name: 'category',
            multi: true,
            options: categories?.map(item => ({
                value: item.id,
                label: item.name,
            })),
            // defaultValue: {value: '', label: ''},
            placeholder: 'Customer Category'
        }, {
            id: 3,
            name: 'weekDay',
            multi: true,
            options: weekdays?.map(item => ({
                value: item.id,
                label: item.name,
            })),
            // defaultValue: {value: '', label: ''},
            placeholder: 'Week day'
        }, {
            id: 4,
            name: 'territory',
            multi: true,
            options: territory?.map(item => ({
                value: item.id,
                label: item.region,
            })),
            // defaultValue: {value: '', label: ''},
            placeholder: 'City'
        }, {
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
            <div style={{
                background: "#eeeeee",
                borderRadius: "15px",
                padding: "20px",
                width: "100%",
                overflowY: "auto",
                height: '100%'

            }}>
                <ToastContainer/>
                <div className={"d-flex gap-3 align-items-center"}>
                    <p style={{fontSize: "25pt"}}>Clients</p>
                    <button className="btn btn-success h-50" onClick={() => dispatch(setModalVisible(true))}>+ Add
                        Client
                    </button>
                </div>
                <hr/>

                <ClientsModal action={"Add client"} visible={modalVisible} onClose={closeModal}/>
                <ClientsModal action={"Edit client"} data={editData} isEditing={true} visible={editModalVisible}
                              onClose={closeEditModal}/>
                <div>
                    <div>

                        <Table
                            isDark={false}
                            requestApi={"/api/v1/client?page={page}&size={limit}"}
                            columns={columns}
                            filterParam={filterParam}
                        />
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Clients;
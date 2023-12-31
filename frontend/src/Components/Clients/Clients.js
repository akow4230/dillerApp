import React, {useEffect} from 'react';
import ClientsModal from "./ClientsModal";
import {useDispatch, useSelector} from "react-redux";
import {
    fetchClientsStart,
    closeModals,
    setModalVisible,
    setPreClose, changeLoader, setLoading
} from "../../redux/reducers/ClientsSlice";
import {ToastContainer} from "react-toastify";
import Table from "../UniversalUI/Table/Table";
import {changeSearchParams, changeTableDataSize} from "../../redux/reducers/TableSlice";
import {fetchCategoriesStart} from '../../redux/reducers/CustomerCategorySlice'
import {fetchWeekdaysStart} from '../../redux/reducers/WeekDaySlice'
import {fetchTerritoryStart} from "../../redux/reducers/TerritorySlice";
import ClientUpdateButton from "./ClientUpdateButton";
import {useLocation} from "react-router-dom";
import PreClose from "../UniversalUI/preClose/PreClose";
import {CgSpinner} from "react-icons/cg";


function Clients(props) {
    const dispatch = useDispatch();
    const {
        modalVisible,
        editModalVisible,
        defValueOfMap,
        mapState,
        editData,
        preCloseShow,
        isLoading
    } = useSelector((state) => state.clients);
    const closeModal = () => {
        dispatch({type: 'clients/handleMapClear', payload: {mapState: mapState, defValueOfMap: defValueOfMap}});
        dispatch(closeModals());
        dispatch(setLoading(false))
        dispatch(changeSearchParams({active: '', quickSearch: ""}))
    };
    const {categories} = useSelector((state) => state.category);
    const {weekdays} = useSelector((state) => state.weekday);
    const {territory} = useSelector((state) => state.territory)
    useEffect(() => {
        dispatch(fetchCategoriesStart())
        dispatch(fetchWeekdaysStart())
        dispatch(fetchTerritoryStart())
        dispatch(fetchClientsStart())
    }, [])
    const location = useLocation();
    useEffect(() => {
        dispatch(changeTableDataSize(5))
        dispatch(changeSearchParams({active: '', quickSearch: ""}))
    }, [location.pathname])
    // table columns
    const columns = [
        {
            id: 0,
            title: "Name",
            key: "name",
            type: "uuid",
            show: true,
            order: 1,

        },
        {
            id: 1,
            title: "Company",
            key: "company",
            type: "str",
            show: true,
            order: 2,
        },
        {
            id: 2,
            title: "Territory",
            key: "territory.title",
            type: "str",
            show: true,
            order: 3,
            render: (item) => {
                return <p>{item?.territory?.title}</p>
            }
        },
        {
            id: 3,
            title: "Address",
            key: "address",
            type: "str",
            show: true,
            order: 4
        }, {
            id: 4,
            title: "Phone",
            key: "phone",
            type: "str",
            show: true,
            order: 6
        }, {
            id: 5,
            title: "ReferencePoint",
            key: "referencePoint",
            type: "str",
            show: true,
            order: 7
        }, {
            id: 6,
            title: "Category",
            key: "category.title",
            type: "str",
            show: true,
            order: 8,
        }, {
            id: 7,
            title: "Date",
            key: "dateOfRegistration",
            type: "date",
            show: true,
            order: 9,
            render: (item) => {
                const dateOfRegistration = item?.dateOfRegistration;
                if (dateOfRegistration) {
                    const formattedDate = new Date(dateOfRegistration).toLocaleString('en-GB', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',

                    });
                    return <p>{formattedDate}</p>;
                }

                return null;
            }


        }, {
            id: 8,
            title: "TIN",
            key: "tin",
            type: "str",
            show: true,
            order: 10
        },
        {
            id: 9,
            title: "Update",
            key: "update",
            type: "jsx",
            show: true,
            order: 11,
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
                label: item.title,
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
                label: item.title,
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
            <PreClose closeMainModal={closeModal} closePreClose={() => dispatch(setPreClose(false))}
                      show={preCloseShow}/>
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
                    <button className="btn btn-success h-50" onClick={() => {
                        dispatch(setLoading(false));
                        dispatch(setModalVisible(true))
                    }}>+ Add
                        Client
                    </button>

                </div>
                <hr/>

                <ClientsModal action={"Add client"} visible={modalVisible} onClose={closeModal}/>
                <ClientsModal action={"Edit client"} data={editData} isEditing={true} visible={editModalVisible}
                              onClose={closeModal}/>
                <div>
                    <div>

                        <Table
                            localstoragePath={"clients"}
                            isDark={false}
                            requestApi={"/api/v1/client?page={page}&size={limit}"}
                            columns={columns}
                            filterParam={filterParam}
                            path={"client"}
                        />
                    </div>
                </div>

            </div>

        </div>
    );
}

export default Clients;
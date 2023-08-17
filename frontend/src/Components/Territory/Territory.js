import React, {useEffect} from 'react';
import {ToastContainer} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {
    setModalVisible,
    setEditModalVisible, setCloseModal, setPreClose,
} from "../../redux/reducers/TerritorySlice";
import TerritoryModal from "./TerritoryModal";
import Table from "../UniversalUI/Table/Table";
import TerritoryUpdateButton from "./TerritoryUpdateButton";
import {changeSearchParams, changeTableDataSize, toggleModal} from "../../redux/reducers/TableSlice";
import {useLocation} from "react-router-dom";
import PreClose from "../UniversalUI/preClose/PreClose";

function Territory(props) {
    const dispatch = useDispatch();
    const {modalVisible, editModalVisible, defValueOfMap, mapState, editData, preCloseShow} = useSelector((state) => state.territory);
    const location= useLocation();
    useEffect(()=>{
        dispatch(changeSearchParams({active:'', quickSearch: ""}))
        dispatch(changeTableDataSize(5))
    },[location.pathname])
    const columns = [
        {
            id: 1,
            title: "Region",
            key: "region",
            type: "str",
            show: true,
            order: 1
        },
        {
            id: 2,
            title: "Title",
            key: "title",
            type: "str",
            show: true,
            order: 2
        },
        {
            id: 3,
            title: "Code",
            key: "code",
            type: "str",
            show: true,
            order: 3
        },
        {
            id: 4,
            title: "CreatedAt",
            key: "CreatedAt",
            type: "date",
            show: true,
            order: 4,
            render: (item) => {
                const createdAt = item?.createdAt;
                if (createdAt) {
                    const formattedDate = new Date(createdAt).toLocaleString('en-GB', {
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
        },
        {
            id: 5,
            title: "Update",
            key: "update",
            type: "jsx",
            show: true,
            order: 5,
            data: <TerritoryUpdateButton/>
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
        },
    ]
    const closeModal = () => {
        dispatch({type: 'territory/handleMapClear', payload: {mapState: mapState, defValueOfMap: defValueOfMap}});
        dispatch(setCloseModal(false));
        dispatch(changeSearchParams({active:'', quickSearch: ""}))
    };
    return (
        <div style={{background: "#eeeeee", borderRadius: "15px", padding: "20px", width: "100%", overflowY: "auto"}}>
            <ToastContainer/>
            <PreClose closeMainModal={closeModal} closePreClose={()=>dispatch(setPreClose(false))} show={preCloseShow}/>
            <div className={"d-flex gap-3 align-items-center"}>
                <p style={{fontSize: "25pt"}}>Territory</p>
                <button className="btn btn-success h-50" onClick={() => dispatch(setModalVisible(true))}>+ Add
                    Territory
                </button>
            </div>
            <hr/>
            <Table
                isDark={false}
                requestApi={"/api/v1/territory?page={page}&size={limit}"}
                columns={columns}
                filterParam={filterParam}
                path={"territory"}
            />
            <TerritoryModal action={"Add territory"} visible={modalVisible} onClose={closeModal}/>
            <TerritoryModal action={"Edit territory"} data={editData} isEditing={true} visible={editModalVisible}
                            onClose={closeModal}/>
        </div>
    );
}

export default Territory;

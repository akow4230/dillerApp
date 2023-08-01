import React from 'react';
import {ToastContainer} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {setModalVisible, setEditModalVisible} from "../../redux/reducers/TerritorySlice";
import TerritoryModal from "./TerritoryModal";
import Table from "../UniversalUI/Table/Table";

function Territory(props) {
    const dispatch = useDispatch();
    const {modalVisible, editModalVisible} = useSelector((state) => state.territory);
    const closeModal = () => {
        dispatch(setModalVisible(false));
    };
    const closeEditModal = () => {
        dispatch(setEditModalVisible(false))
    }
    const columns = [
        {
            id: 1,
            title: "Id",
            key: "id",
            type: "int",
            show: true,
            order: 1
        },
        {
            id: 2,
            title: "Region",
            key: "region",
            type: "str",
            show: true,
            order: 2
        },
        {
            id: 3,
            title: "Title",
            key: "title",
            type: "str",
            show: true,
            order: 3
        },
        {
            id: 4,
            title: "Code",
            key: "code",
            type: "str",
            show: true,
            order: 4
        }
    ]
    return (
        <div style={{background: "#eeeeee", borderRadius: "15px", padding: "20px", width: "100%"}}>
            <ToastContainer/>
            <p style={{fontSize: "25pt"}}>Territory</p>
            <hr/>
            <button className="btn btn-success" onClick={() => dispatch(setModalVisible(true))}>+ Add Territory</button>
            <button className="btn btn-success" onClick={() => {
                console.log(editModalVisible)
                dispatch(setEditModalVisible(true))
            }}> Edit Territory
            </button>
            <TerritoryModal action={"Add territory"} visible={modalVisible} onClose={closeModal}/>
            <TerritoryModal action={"Edit territory"} data={{
                id: 1,
                title: "Nimadir",
                code: "123",
                active: false,
                longitude: 64.2337375,
                latitude: 41.747159671564035
            }} isEditing={true} visible={editModalVisible} visibleEdit={editModalVisible} onClose={closeEditModal}/>
            <Table isDark={false} requestApi={"/api/v1/territory?page={page}&size={limit}"} columns={columns}/>
        </div>
    );
}

export default Territory;

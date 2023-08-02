import React from 'react';
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
    setModalVisible,
    setEditModalVisible,
    setLongitude,
    setLatitude,
    setMapState
} from "../../redux/reducers/TerritorySlice";
import TerritoryModal from "./TerritoryModal";
import Table from "../UniversalUI/Table/Table";

function Territory(props) {
    const dispatch = useDispatch();
    const { modalVisible, editModalVisible, defValueOfMap, mapState } = useSelector((state) => state.territory);
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
    const closeModal = () => {
        dispatch({ type: 'territory/handleMapClear', payload: { mapState: mapState, defValueOfMap: defValueOfMap } });
        dispatch(setModalVisible(false));
    };
    const closeEditModal = () =>{
        dispatch({ type: 'territory/handleMapClear', payload: { mapState: mapState, defValueOfMap: defValueOfMap } });
        dispatch(setEditModalVisible(false))
    }
    return (
        <div style={{ background: "#eeeeee", borderRadius: "15px", padding: "20px", width: "100%" }}>
            <ToastContainer />
            <p style={{ fontSize: "25pt" }}>Territory</p>
            <hr />
            <button className="btn btn-success" onClick={() => dispatch(setModalVisible(true))}>+ Add Territory</button>
            <button className="btn btn-success" onClick={() => {
                console.log(editModalVisible)
                dispatch(setEditModalVisible(true))
            }}> Edit Territory</button>
            <Table
                isDark={false}
                requestApi={"/api/v1/territory?page={page}&size={limit}"}
                columns={columns}
            />
            <TerritoryModal action={"Add territory"} visible={modalVisible} onClose={closeModal} />
            <TerritoryModal action={"Edit territory"} data={{
                id:"a03c748d-551b-4bd9-9dc4-bc372143cc09",
                title:"Shift Academy",
                region:"Buxoro2",
                code:"1111111",
                active:true,
                longitude:64.45346406250006,
                latitude:39.7420392241709
            }} isEditing={true} visible={editModalVisible} onClose={closeEditModal} />
        </div>
    );
}

export default Territory;

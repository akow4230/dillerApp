import React from 'react';
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setModalVisible, setEditModalVisible } from "../../redux/reducers/TerritorySlice";
import TerritoryModal from "./TerritoryModal";

function Territory(props) {
    const dispatch = useDispatch();
    const { modalVisible, editModalVisible } = useSelector((state) => state.territory);
    const closeModal = () => {
        dispatch(setModalVisible(false));
    };
    const closeEditModal = () =>{
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
            <TerritoryModal action={"Add territory"} visible={modalVisible} onClose={closeModal} />
            <TerritoryModal action={"Edit territory"} data={{
                id:1,
                title:"Nimadir",
                code:"123",
                active:false,
                longitude:64.2337375,
                latitude:41.747159671564035
            }} isEditing={true} visible={editModalVisible} onClose={closeEditModal} />
        </div>
    );
}

export default Territory;

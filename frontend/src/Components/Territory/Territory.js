import React from 'react';
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setModalVisible } from "../../redux/reducers/TerritorySlice";
import TerritoryModal from "./TerritoryModal";

function Territory(props) {
    const dispatch = useDispatch();
    const { modalVisible } = useSelector((state) => state.territory);
    const closeModal = () => {
        dispatch(setModalVisible(false));
    };

    return (
        <div style={{ background: "#eeeeee", borderRadius: "15px", padding: "20px", width: "100%" }}>
            <ToastContainer />
            <p style={{ fontSize: "25pt" }}>Territory</p>
            <hr />
            <button className="btn btn-success" onClick={() => dispatch(setModalVisible(true))}>+ Add Territory</button>
            <TerritoryModal action={"Add territory"} visible={modalVisible} onClose={closeModal} />
            <TerritoryModal action={"Edit territory"} visible={modalVisible} onClose={closeModal} />
        </div>
    );
}

export default Territory;

import React, {useEffect} from 'react';
import ClientsModal from "./ClientsModal";
import {useDispatch, useSelector} from "react-redux";
import {setEditModalVisible, setModalVisible} from "../../redux/reducers/ClientsSlice";
import {ToastContainer} from "react-toastify";
import {fetchWeekdaysStart} from "../../redux/reducers/WeekDaySlice";

function Clients(props) {
    const dispatch = useDispatch();
    const { modalVisible, editModalVisible, defValueOfMap, mapState, editData } = useSelector((state) => state.clients);
    const closeModal = () => {
        dispatch({ type: 'clients/handleMapClear', payload: { mapState: mapState, defValueOfMap: defValueOfMap } });
        dispatch(setModalVisible(false));
    };
    const closeEditModal = () =>{
        dispatch({ type: 'clients/handleMapClear', payload: { mapState: mapState, defValueOfMap: defValueOfMap } });
        dispatch(setEditModalVisible(false))
    }
    return (
        <div style={{ background: "#eeeeee", borderRadius: "15px", padding: "20px", width: "100%", overflowY:"auto" }}>
            <ToastContainer />
            <div className={"d-flex gap-3 align-items-center"}>
                <p style={{ fontSize: "25pt" }}>Clients</p>
                <button className="btn btn-success h-50" onClick={() => dispatch(setModalVisible(true))}>+ Add Client</button>
            </div>
            <hr />
            {/*<Table*/}
            {/*    isDark={false}*/}
            {/*    requestApi={"/api/v1/territory?page={page}&size={limit}"}*/}
            {/*    columns={columns}*/}
            {/*    filterParam={filterParam}*/}
            {/*    path={"territory"}*/}
            {/*/>*/}
            <ClientsModal action={"Add client"} visible={modalVisible} onClose={closeModal} />
            <ClientsModal action={"Edit client"} data={editData} isEditing={true} visible={editModalVisible} onClose={closeEditModal} />
        </div>
    );
}

export default Clients;
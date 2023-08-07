import React from 'react';
import ClientsModal from "./ClientsModal";
import {useDispatch, useSelector} from "react-redux";
import {setEditModalVisible, setModalVisible} from "../../redux/reducers/TerritorySlice";

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
    return (
        <div>
            <button className="btn btn-success">Add client</button>
            <ClientsModal action={"Add territory"} visible={modalVisible} onClose={closeModal} />
            <ClientsModal action={"Edit territory"} data={editData} isEditing={true} visible={editModalVisible} onClose={closeEditModal}  />
        </div>
    );
}

export default Clients;
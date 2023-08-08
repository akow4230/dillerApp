import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import {Button} from "antd";
import {useDispatch} from "react-redux";
import {setEditData, setEditModalVisible} from "../../redux/reducers/ClientsSlice";

function ClientUpdateButton(props) {
    const dispatch = useDispatch();

    function editClientData() {
        console.log(props.data)
        dispatch(setEditData(props.data))
        dispatch(setEditModalVisible(true))
    }

    return (
        <div>
            <Button
                style={{height: "40px", width: "40px", display: "flex", justifyContent: "center", alignItems: "center"}}
                onClick={editClientData}><EditIcon/></Button>
        </div>
    );
}

export default ClientUpdateButton
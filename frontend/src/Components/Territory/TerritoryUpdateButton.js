import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import {Button} from "antd";
import {useDispatch} from "react-redux";
import {setEditData, setEditModalVisible} from "../../redux/reducers/TerritorySlice";
function TerritoryUpdateButton(props) {
    const dispatch = useDispatch();

    function editTerritoryData() {
        dispatch(setEditData(props.data))
        dispatch(setEditModalVisible(true))
    }

    return (
        <div>
            <Button style={{height:"40px", width:"40px", display:"flex", justifyContent:"center", alignItems:"center"}} onClick={editTerritoryData}><EditIcon /></Button>
        </div>
    );
}

export default TerritoryUpdateButton;
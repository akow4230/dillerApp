import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
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
            <button className={"btn"} style={{height:"40px", width:"40px", display:"flex", justifyContent:"center", alignItems:"center"}} onClick={editTerritoryData}><EditIcon /></button>
        </div>
    );
}

export default TerritoryUpdateButton;
import React, {useEffect} from 'react';
import EditIcon from '@mui/icons-material/Edit';
import {useDispatch} from "react-redux";
import {setEditData, setEditDataUrl, setEditModalVisible} from "../../redux/reducers/CustomerCategorySlice";
function CategoryUpdateButton(props) {
    const dispatch = useDispatch();
useEffect(()=>{

},[])
    function editTerritoryData() {
        dispatch(setEditData(props.data))
        console.log(props.data)
        dispatch(setEditDataUrl("/api/v1/customercategory/"+props.data.id))
        dispatch(setEditModalVisible(true))
    }

    return (
        <div>
            <button className={"btn"} style={{height:"40px", width:"40px", display:"flex", justifyContent:"center", alignItems:"center"}} onClick={editTerritoryData}><EditIcon /></button>
        </div>
    );
}

export default CategoryUpdateButton;
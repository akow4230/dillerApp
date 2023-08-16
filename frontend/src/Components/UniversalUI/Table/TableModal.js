import React from 'react';
import {changeOrder, setCurrentDragingColumn} from "../../../redux/reducers/TableSlice";
import {useDispatch, useSelector} from "react-redux";
import "./style.css"
function TableModal(props) {
    const dispatch = useDispatch()
    const {modalColumns} = useSelector((state) => state.table);
    return (
        <div style={{maxHeight:"500px", overflowY:"scroll"}} className="scrollbar" id="style-1">
            {
                modalColumns.map((item, index) => <div
                    onDragStart={(e) => dispatch(setCurrentDragingColumn(index))}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => dispatch(changeOrder(index))}
                    draggable={true} key={item?.id} className="card mb-3 p-3">
                    {item?.title}
                </div>)
            }
        </div>
    );
}

export default TableModal;
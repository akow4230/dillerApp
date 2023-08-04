import React from 'react';
import {changeOrder, setCurrentDragingColumn} from "../../../redux/reducers/TableSlice";
import {useDispatch, useSelector} from "react-redux";

function TableModal(props) {
    const dispatch = useDispatch()
    const {modalColumns} = useSelector((state)=>state.table);
    return (
        <div>
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
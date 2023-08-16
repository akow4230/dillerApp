import React from 'react';
import {changeOrder, changeTableColumns, setCurrentDragingColumn} from "../../../redux/reducers/TableSlice";
import {useDispatch, useSelector} from "react-redux";
import "./style.css"
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd"
function TableModal(props) {
    const dispatch = useDispatch()
    const {modalColumns} = useSelector((state) => state.table);
    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const sourceIndex = result.source.index;
        const destinationIndex = result.destination.index;
        dispatch(changeTableColumns({ sourceIndex, destinationIndex }));
    };
    return (
        <div style={{maxHeight:"500px", overflowY:"scroll"}} className="scrollbar" id="style-1">
            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="columnList" direction="vertical">
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef}>
                            {modalColumns.map((item, index) => (
                                <Draggable
                                    key={item.id.toString()}
                                    draggableId={item.id.toString()}
                                    index={index}
                                >
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            className="card mb-3 p-3"
                                            style={{
                                                ...provided.draggableProps.style,
                                                left: 0,
                                                top: 0,
                                                position: "relative",
                                            }}
                                        >
                                            {item.title}
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
}

export default TableModal;
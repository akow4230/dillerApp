import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeOrder, setModalColumns } from '../../../redux/reducers/TableSlice';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import './style.css';

function TableModal(props) {
    const dispatch = useDispatch();
    const { modalColumns, data } = useSelector((state) => state.table);

    const handleDragEnd = (result) => {
        if (!result.destination) return;
        const sourceIndex = result.source.index;
        const destinationIndex = result.destination.index;
        const visibleColumns = modalColumns.filter(item => item.show);
        const sourceColumnId = visibleColumns[sourceIndex].id;
        const destinationColumnId = visibleColumns[destinationIndex].id;
        const sourceModalIndex = modalColumns.findIndex(column => column.id === sourceColumnId);
        const destinationModalIndex = modalColumns.findIndex(column => column.id === destinationColumnId);
        dispatch(changeOrder({ sourceIndex: sourceModalIndex, destinationIndex: destinationModalIndex }));
    };


    useEffect(() => {
        dispatch(setModalColumns(data.columns)); // Update modalColumns from data.columns
    }, [dispatch, data.columns]);

    return (
        <div style={{ maxHeight: '500px', overflowY: 'scroll' }} className="scrollbar" id="style-1">
            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="columnList" direction="vertical">
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef}>
                            {modalColumns.filter(item => item.show).map((item, index) => (
                                <Draggable key={item.id.toString()} draggableId={item.id.toString()} index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            className="card mb-3 p-3"
                                            style={{
                                                ...provided.draggableProps.style,
                                                backgroundColor: snapshot.isDragging ? 'yellow' : 'white', // Change background color
                                                left: 0,
                                                top: 0,
                                                position: 'relative',
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

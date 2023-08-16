import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setShow } from '../../../redux/reducers/PreCloseSlice';

function PreClose(props) {
    const { show } = useSelector((state) => state.preclose);
    const dispatch = useDispatch();

    function closeModal() {
        props.closeMainModal();
        dispatch(setShow(false));
    }

    const modalStyle = {
        zIndex: 100000,
        margin: 'auto',          // Center the modal horizontally
        width: '300px',
        left:"50%",
        transform: "translateX(-50%)"
    };

    return (
        <Modal show={show} centered style={modalStyle} backdrop={false}>
            <Modal.Body className={"d-flex gap-3 align-items-center flex-column justify-content-center"}>
                Do you really want to leave?
                <div className="d-flex gap-2 ">
                    <button className="btn btn-success" onClick={closeModal}>Yes</button>
                    <button className="btn btn-danger" onClick={() => dispatch(setShow(false))}>No</button>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default PreClose;

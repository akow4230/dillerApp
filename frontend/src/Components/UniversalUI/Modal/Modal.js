import React, {useEffect, useState} from 'react';
import {Modal} from "react-bootstrap";
import {useForm} from "react-hook-form";

function UModal(props) {
    const [show,setShow] = useState(true);
    const { handleSubmit, register, control, formState: { errors }, reset } = useForm();
    function handleClose() {
        setShow(false)
    }
    return (
        <div>
            <Modal show={show} onHide={handleClose} centered={true}>
                <Modal.Header closeButton>
                    <Modal.Title>{props?.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form id={"product"} className="d-flex flex-column gap-3">
                        {props?.elements?.map(item=>
                            item?.data?item?.data:
                                <label className={"d-flex gap-2 fs-4"}>
                                    {item?.name}
                                    <input className={"form-control"} type="text" {...register(item?.key, {required: item?.name + " is required"})}/>
                                </label>
                        )}
                    </form>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default UModal;
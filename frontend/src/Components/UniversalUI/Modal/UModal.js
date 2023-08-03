import React from 'react';
import { useForm } from 'react-hook-form';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {hideModal} from "../../../redux/reducers/ModalSlice";
import "./index.css"
function UModal(props) {
    const dispatch = useDispatch();
    const { handleSubmit, register, control, formState: { errors }, reset } = useForm();
    const { show, data } = useSelector((state) => state.modal);

    function handleClose() {
        dispatch(hideModal());
    }

    async function saveValues(data) {
        dispatch({ type: 'modal/saveValuesAsync', payload: { url: data.url, data } });
        reset();
    }

    return (
        <div>
            <div className={'umodal'}>
                <Modal show={props.visible} onHide={props.toggle} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>{props?.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {props.isSaving?<form id={'modal'} className="d-flex flex-column gap-3" onSubmit={handleSubmit(saveValues)}>
                            {props?.elements?.map((item, index) => (
                                <div key={index}>
                                    <label className="d-flex gap-2 fs-5">
                                        {item?.name + ':'}
                                        <input
                                            className="form-control"
                                            type={item.type}
                                            {...register(item?.key, { required: item?.name + ' is required' })}
                                        />
                                    </label>
                                    {errors[item?.key]?.message && <span className="error-message">{errors[item?.key].message}</span>}
                                </div>
                            ))}
                        </form>:<form id={'modal'} className="d-flex flex-column gap-3">
                            {props?.elements?.map((item, index) => (
                                <div key={index}>
                                    <label className="d-flex gap-2 fs-5">
                                        {item?.name + ':'}
                                        <input
                                            className="form-control"
                                            type={item.type}
                                            {...register(item?.key, { required: item?.name + ' is required' })}
                                        />
                                    </label>
                                    {errors[item?.key]?.message && <span className="error-message">{errors[item?.key].message}</span>}
                                </div>
                            ))}
                        </form>}
                    </Modal.Body>
                    <Modal.Footer style={{ display: 'flex', justifyContent: 'center' }}>
                        {props.isSaving && props.hasSaveButton?<button className="blob-btn" type="submit" form={"modal"}>
                            Save
                            <span className="blob-btn__inner">
                                <span className="blob-btn__blobs">
                                    <span className="blob-btn__blob"></span>
                                    <span className="blob-btn__blob"></span>
                                    <span className="blob-btn__blob"></span>
                                    <span className="blob-btn__blob"></span>
                                </span>
                            </span>
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style={{ position: "absolute" }}>
                                <defs>
                                    <filter id="goo">
                                        <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10"></feGaussianBlur>
                                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 21 -7" result="goo"></feColorMatrix>
                                        <feBlend in2="goo" in="SourceGraphic" result="mix"></feBlend>
                                    </filter>
                                </defs>
                            </svg>
                        </button>:props.hasSaveButton?<button className="blob-btn">
                            Save
                            <span className="blob-btn__inner">
                                <span className="blob-btn__blobs">
                                    <span className="blob-btn__blob"></span>
                                    <span className="blob-btn__blob"></span>
                                    <span className="blob-btn__blob"></span>
                                    <span className="blob-btn__blob"></span>
                                </span>
                            </span>
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style={{ position: "absolute" }}>
                                <defs>
                                    <filter id="goo">
                                        <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10"></feGaussianBlur>
                                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 21 -7" result="goo"></feColorMatrix>
                                        <feBlend in2="goo" in="SourceGraphic" result="mix"></feBlend>
                                    </filter>
                                </defs>
                            </svg>
                        </button>:""}
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
}

export default UModal;


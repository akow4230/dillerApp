import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {Modal} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import "./index.css"
function UModal(props) {
    const dispatch = useDispatch();
    const {handleSubmit, register, control, formState: {errors}, reset} = useForm();
    const {loading} = useSelector((state)=>state.modal)
    useEffect(()=>{
        reset(
            props.data
        )
    },[props.isOpen])
    function saveValues(data) {
        dispatch({type:"modal/saveValuesAsync", payload:{url:props.url, data:data, hideModal:props.toggle(), reset:reset(), isEditing:props.isEditing, title:props?.title}})
        console.log(data)
    }
    return (
        <div>
            <div className={'umodal'}>
                <Modal show={props.isOpen} onHide={()=>{
                    props.openPreClose();
                }} centered style={props.showPreClose?{zIndex: 1000, overflowY:"hidden"}:{zIndex: 10000, overflowY:"hidden"}} backdrop={!props.showPreClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{props?.action}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {!props.onSave ?
                            <form id={'modal'} className="d-flex flex-column gap-3" onSubmit={handleSubmit(saveValues)}>
                                {props?.elements?.map((item, index) => (
                                    <div key={index}>
                                        {item.data ? React.cloneElement(item.data, {data: item}) :
                                            <div>
                                                    <label className={`m-0 w-100 ${item.type==="checkbox"&&"d-flex gap-2"}`}>
                                                        <p style={{margin:"0"}}>{item?.name + ':'}</p>
                                                        <input
                                                            className={item.type==="checkbox"?"form-check":"form-control"}
                                                            type={item.type}
                                                            {...register(item?.key, item.required&&{required: item?.name + ' is required'})}
                                                        />
                                                    </label>
                                                {errors[item?.key]?.message &&
                                                    <span className="error-message">{errors[item?.key].message}</span>}
                                            </div>}
                                    </div>
                                ))}
                            </form> : <form id={'modal'} className="d-flex flex-column gap-3">
                                {props?.elements?.map((item, index) => (
                                    <div key={index}>
                                        {item.data ? React.cloneElement(item.data, {data: item}) :
                                            <div>
                                                <label className="fs-5">
                                                    {item?.name + ':'} <br/>
                                                    <input
                                                        className="form-control"
                                                        type={item.type}
                                                        {...register(item?.key, {required: item?.name + ' is required'})}
                                                    />
                                                </label>
                                                {errors[item?.key]?.message &&
                                                    <span className="error-message">{errors[item?.key].message}</span>}
                                            </div>}
                                    </div>
                                ))}
                            </form>}
                    </Modal.Body>
                    {!props?.isNotSaving&&
                        <Modal.Footer style={{display: 'flex', justifyContent: 'center'}}>
                            {!props.onSave ? <button className="blob-btn" type="submit" form={"modal"} disabled={loading}>
                                Save
                                <span className="blob-btn__inner">
                                <span className="blob-btn__blobs">
                                    <span className="blob-btn__blob"></span>
                                    <span className="blob-btn__blob"></span>
                                    <span className="blob-btn__blob"></span>
                                    <span className="blob-btn__blob"></span>
                                </span>
                            </span>
                                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style={{position: "absolute"}}>
                                    <defs>
                                        <filter id="goo">
                                            <feGaussianBlur in="SourceGraphic" result="blur"
                                                            stdDeviation="10"></feGaussianBlur>
                                            <feColorMatrix in="blur" mode="matrix"
                                                           values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 21 -7"
                                                           result="goo"></feColorMatrix>
                                            <feBlend in2="goo" in="SourceGraphic" result="mix"></feBlend>
                                        </filter>
                                    </defs>
                                </svg>
                            </button> : props.onSave ? <button className="blob-btn" onClick={props.onSave} disabled={loading}>
                                Save
                                <span className="blob-btn__inner">
                                <span className="blob-btn__blobs">
                                    <span className="blob-btn__blob"></span>
                                    <span className="blob-btn__blob"></span>
                                    <span className="blob-btn__blob"></span>
                                    <span className="blob-btn__blob"></span>
                                </span>
                            </span>
                                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style={{position: "absolute"}}>
                                    <defs>
                                        <filter id="goo">
                                            <feGaussianBlur in="SourceGraphic" result="blur"
                                                            stdDeviation="10"></feGaussianBlur>
                                            <feColorMatrix in="blur" mode="matrix"
                                                           values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 21 -7"
                                                           result="goo"></feColorMatrix>
                                            <feBlend in2="goo" in="SourceGraphic" result="mix"></feBlend>
                                        </filter>
                                    </defs>
                                </svg>
                            </button> : ""}
                        </Modal.Footer>
                    }
                </Modal>
            </div>
        </div>
    );
}

export default UModal;


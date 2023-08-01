import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Map, Placemark, SearchControl } from 'react-yandex-maps';
import { useForm } from 'react-hook-form';
import {setLatitude, setLongitude, resetTerritory, setModalVisible} from '../../redux/reducers/TerritorySlice'; // Update the import path to the correct location of the territorySlice
import "./styles.css"
import {ToastContainer, toast} from "react-toastify";

function TerritoryModal(props) {
    const dispatch = useDispatch();
    const territory = useSelector((state) => state.territory);
    const defValues = [41.3775, 64.5853];
    const [template, setTemplate] = useState(null);
    const { handleSubmit, register, control, formState: { errors }, reset } = useForm();
    const [mapState, setMapState] = useState({center: defValues, zoom: 5});
    useEffect(()=>{
        if (props.isEditing){
            reset({
                title:props.data.title,
                code:props.data.code,
                active:props.data.active
            })
            dispatch(setLatitude(props.data.latitude))
            dispatch(setLongitude(props.data.longitude))
            setTemplate([props.data.latitude, props.data.longitude])
            setMapState({ center: [props.data.latitude, props.data.longitude], zoom: 5 });
            console.log(props.data.longitude)
        }
    },[props.visible])
    useEffect(() => {
        function handleClickOutside(event) {
            if (props.visible && !event.target.closest(".modal-content")) {
                props.onClose();
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [props]);
    if (!props.visible) {
        return null;
    }

    function handleSearchResult(event) {
        const searchResultCoords = event.get('result').geometry.getCoordinates();
        setMapState({ center: searchResultCoords, zoom: 15 });
    }

    function handleMapClick(event) {
        const coords = event.get('coords');
        const latitude = coords[0];
        const longitude = coords[1];
        setTemplate([latitude, longitude])
        dispatch(setLatitude(latitude));
        dispatch(setLongitude(longitude));
        setMapState({ center: [latitude, longitude], zoom: 5 });
    }

    function handleMapClear(event) {
        setMapState({ ...mapState, center: defValues });
        dispatch(setLongitude(""));
        dispatch(setLatitude(""));
    }

    function saveTerritory(data) {
        if (territory.longitude && territory.longitude){
            if (props.isEditing){
                const newData = {...data, longitude:territory.longitude, latitude:territory.latitude, id:props.data.id}
                dispatch({ type: 'territory/editTerritory', payload: newData });
                dispatch(setModalVisible(false))
                toast.success("Territory edited successfully")
            }else {
                const newData = {...data, longitude:territory.longitude, latitude:territory.latitude}
                dispatch({ type: 'territory/saveTerritory', payload: newData });
                dispatch(setModalVisible(false))
                toast.success("Territory saved successfully")
            }
            reset({
                title:"",
                code:"",
                active:false
            })
        }else {
            toast.error("You must select territory")
        }

    }

    return (
        <div>
            <ToastContainer style={{zIndex:"10000"}}/>
            <div className="modal-overlay">
                <div className="modal-content" style={{ background: "#eeeeee" }}>
                    <header style={{ background: "#6690a7", color: "white", display: "flex", alignItems: "center", paddingLeft: "20px", paddingTop: "10px" }}>
                        <p>{props.action}</p>
                    </header>
                    <div style={{ display: "flex" }}>
                        <div className="left-side w-50 p-5">
                            <form onSubmit={handleSubmit(saveTerritory)}>
                                <label className={"d-flex gap-4"}>
                                    Title*
                                    <input type="text" className={"form-control my-2"} {...register("title", { required: "Title is required" })} />
                                </label>
                                {errors.title && <span className="error-message">{errors.title.message}</span>}
                                <label className={"d-flex gap-4"}>
                                    Region
                                    <input type="text" className={"form-control my-2"} {...register("region", { required: "Region is required" })} />
                                </label>
                                {errors.region && <span className="error-message">{errors.region.message}</span>}
                                <label className={"d-flex gap-4"}>
                                    Code
                                    <input type="text" className={"form-control my-2"} {...register("code", { required: "Code is required" })} />
                                </label>
                                {errors.code && <span className="error-message">{errors.code.message}</span>}
                                <label className={"d-flex gap-2"}>
                                    Active
                                    <input type="checkbox" className={"form-check"} {...register("active", { required: "Active is required" })} />
                                </label>
                                {errors.active && <span className="error-message">{errors.active.message}</span>}
                                <div style={{ marginTop: "auto", display: "flex", justifyContent: "center" }}>
                                    <button className="btn btn-primary" style={{ position: "absolute", bottom: "30px" }}>Add</button>
                                </div>
                            </form>
                        </div>
                        <div className="right-side p-5">
                            <Map
                                onLoad={(e) => {
                                    console.log(e);
                                }}
                                width={500}
                                height={400}
                                onClick={handleMapClick}
                                state={mapState}
                                modules={['templateLayoutFactory']}
                            >
                                <SearchControl onResultSelect={handleSearchResult} />
                                {template && territory.longitude !== "" && territory.latitude !== "" && (
                                    <Placemark
                                        geometry={mapState.center}
                                        modules={['geoObject.addon.balloon']}
                                    />
                                )}
                            </Map>
                            <div>
                                <label>
                                    Long <br />
                                    <input className='form-control' type="text" disabled={true} value={territory.longitude} />
                                </label>
                                <label className={"mx-4 my-2"}>
                                    Lat <br />
                                    <input className='form-control' type="text" disabled={true} value={territory.latitude} />
                                </label> <br />
                                <button className="btn btn-danger" onClick={handleMapClear}>clear</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TerritoryModal;

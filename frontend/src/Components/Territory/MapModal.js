import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
    FullscreenControl,
    GeolocationControl,
    Map,
    Placemark,
    SearchControl,
    TrafficControl, TypeSelector,
    ZoomControl
} from 'react-yandex-maps';
import {useForm} from 'react-hook-form';
import {
    setLatitude,
    setLongitude,
    resetTerritory,
    setModalVisible,
    setTemplate,
    setMapState,
    saveTerritoryAction,
    editTerritoryAction
} from '../../redux/reducers/TerritorySlice';
import "./styles.css"
import {ToastContainer, toast} from "react-toastify";

function MapModal(props) {
    const dispatch = useDispatch();
    const territory = useSelector((state) => state.territory);
    const {handleSubmit, register, control, formState: {errors}, reset} = useForm();
    useEffect(() => {
        if (props.isEditing && props.visible) {
            reset({
                title: props.data.title,
                region: props.data.region,
                code: props.data.code,
                active: props.data.active
            })
            dispatch(setMapState({center: [props.data.latitude, props.data.longitude], zoom: 5}))
            dispatch(setLatitude(props.data.latitude))
            dispatch(setLongitude(props.data.longitude))
            dispatch(setTemplate([props.data.latitude, props.data.longitude]))
        }
    }, [props.visible])
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
        const searchResultCoords = event.get('result')?.geometry?.getCoordinates(); // Use optional chaining here
        if (searchResultCoords) {
            dispatch(setMapState({center: searchResultCoords, zoom: 15}));
        }
    }

    function handleMapClick(event) {
        const coords = event.get('coords');
        dispatch({type: "territory/handleMapClick", payload: coords});
    }


    function handleMapClear() {
        dispatch({
            type: 'territory/handleMapClear',
            payload: {mapState: territory.mapState, defValueOfMap: territory.defValueOfMap}
        });
    }

    function saveTerritory(data) {
        dispatch(
            props.isEditing
                ? editTerritoryAction({
                    territory: {
                        ...data,
                        longitude: territory?.longitude,
                        latitude: territory?.latitude,
                        id: props.data.id
                    }, isEditing: true
                })
                : saveTerritoryAction({
                    territory: {...data, longitude: territory?.longitude, latitude: territory?.latitude},
                    isEditing: false,
                    reset:reset({
                        title: "",
                        region: "",
                        code: "",
                        active: ""
                    })
                })
        );

    }

    return (
        <div>
            <ToastContainer style={{zIndex: "10000"}}/>
            <div className="modal-overlay">
                <div className="modal-content" style={{background: "#eeeeee"}}>
                    <header style={{
                        background: "#6690a7",
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                        paddingLeft: "20px",
                        paddingTop: "10px"
                    }}>
                        <p>{props.action}</p>
                    </header>
                    <div style={{display: "flex"}}>
                        <div className="left-side w-50 p-5">
                            <form onSubmit={handleSubmit(saveTerritory)}>
                                <label className={"d-flex gap-4"}>
                                    Title*
                                    <input type="text"
                                           className={"form-control my-2"} {...register("title", {required: "Title is required"})} />
                                </label>
                                {errors.title && <span className="error-message">{errors.title.message}</span>}
                                <label className={"d-flex gap-4"}>
                                    Region
                                    <input type="text"
                                           className={"form-control my-2"} {...register("region", {required: "Region is required"})} />
                                </label>
                                {errors.region && <span className="error-message">{errors.region.message}</span>}
                                <label className={"d-flex gap-4"}>
                                    Code
                                    <input type="text"
                                           className={"form-control my-2"} {...register("code", {required: "Code is required"})} />
                                </label>
                                {errors.code && <span className="error-message">{errors.code.message}</span>}
                                <label className={"d-flex gap-2"}>
                                    Active
                                    <input type="checkbox" className={"form-check"} {...register("active")} />
                                </label>
                                <div style={{marginTop: "auto", display: "flex", justifyContent: "center"}}>
                                    <button className="btn btn-primary"
                                            style={{position: "absolute", bottom: "30px"}}>Add
                                    </button>
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
                                state={territory.mapState}
                                modules={['templateLayoutFactory']}
                            >
                                <FullscreenControl options={{float: "left"}}/>
                                <GeolocationControl options={{float: "right"}}/>
                                <TrafficControl options={{float: "right"}}/>
                                <ZoomControl options={{float: "left"}}/>
                                <TypeSelector options={{float: "right"}}/>
                                <SearchControl options={{float: "left"}}/>
                                {territory.template && territory.longitude !== "" && territory.latitude !== "" && (
                                    <Placemark
                                        geometry={territory.mapState.center}
                                        modules={['geoObject.addon.balloon']}
                                    />

                                )}
                            </Map>
                            <div>
                                <label>
                                    Long <br/>
                                    <input type="text" disabled={true} value={territory.longitude}/>
                                </label>
                                <label className={"mx-4 my-2"}>
                                    Lat <br/>
                                    <input type="text" disabled={true} value={territory.latitude}/>
                                </label> <br/>
                                <button className="btn btn-danger" onClick={handleMapClear}>clear</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MapModal;

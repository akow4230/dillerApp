import React, {useEffect} from 'react';
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
import {Controller, useForm} from 'react-hook-form';
import {
    setLatitude,
    setLongitude,
    setTemplate,
    setMapState,
    saveClientsAction,
    editClientsAction, pushWeekday, deleteWeekday, setSelectedWeekdays
} from '../../redux/reducers/ClientsSlice';
import "../Territory/styles.css"
import {ToastContainer} from "react-toastify";
import {fetchWeekdaysStart} from "../../redux/reducers/WeekDaySlice";
import Select from "react-select";
import CancelIcon from '@mui/icons-material/Cancel';
function ClientsModal(props) {
    const dispatch = useDispatch();
    const clients = useSelector((state) => state.clients);
    const {handleSubmit, register, control, formState: {errors}, reset} = useForm();
    const {weekdays} = useSelector((state) => state.weekday);
    const {territory} = useSelector(state => state.territory)
    const {categories} = useSelector((state) => state.category);

    useEffect(() => {
        dispatch(fetchWeekdaysStart())
    }, [])
    const defaultValues = {
        territory: null,
        name: "",
        address: "",
        phone: "",
        tin: "",
        companyName: "",
        referencePoint: "",
        category: null,
    };
    useEffect(() => {
        if (props.isEditing && props.visible) {
            reset({
                territory: {value: props.data?.territory?.id, label: props.data?.territory?.title},
                name: props.data?.name,
                address: props.data?.address,
                phone: props.data?.phone,
                tin: props.data?.tin,
                companyName: props.data?.company,
                referencePoint: props.data?.referencePoint,
                category: {value: props.data?.category?.id, label: props.data?.category?.title}
            });
            dispatch(setSelectedWeekdays(props.data?.weekDay));
            dispatch(setMapState({center: [props.data?.latitude, props.data?.longitude], zoom: 15}));
            dispatch(setLatitude(props.data?.latitude));
            dispatch(setLongitude(props.data?.longitude));
            dispatch(setTemplate([props.data?.latitude, props.data?.longitude]));
        } else {
            reset(defaultValues);
            dispatch(setSelectedWeekdays([]));
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

    function handleMapClick(event) {
        const coords = event.get('coords');
        dispatch({type: "clients/handleMapClick", payload: coords});
    }

    function handleMapClear() {
        dispatch({
            type: 'clients/handleMapClear',
            payload: {mapState: clients.mapState, defValueOfMap: clients.defValueOfMap}
        });
    }

    function saveClients(data) {
        console.log(data)
        dispatch(
            props.isEditing
                ? editClientsAction({
                    clients: {
                        data: {...data, weekdays: clients.selectedWeekdays},
                        longitude: clients?.longitude,
                        latitude: clients?.latitude,
                        id: props.data.id
                    }, isEditing: true
                })
                : saveClientsAction({
                    clients: {
                        data: {...data, weekdays: clients.selectedWeekdays},
                        longitude: clients?.longitude,
                        latitude: clients?.latitude
                    },
                    isEditing: false,
                    reset: reset({
                        title: "",
                        region: "",
                        code: "",
                        active: ""
                    })
                })
        );

    }
    function selectWeekday(item, selected) {
        if (!clients.selectedWeekdays.includes(item)) {
            dispatch(pushWeekday(item))
        } else if (!selected) {
            dispatch(deleteWeekday(item))
        }
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
                        justifyContent:"space-between",
                        alignItems: "center",
                        paddingLeft: "20px",
                        paddingRight: "20px",
                        paddingTop: "10px"
                    }}>
                        <p>{props.action}</p>
                        <button style={{background:"none", border:"none"}} onClick={()=>props.onClose()}><CancelIcon /></button>
                    </header>
                    <div style={{display: "flex"}}>
                        <div className="left-side w-75 py-4" style={{paddingLeft: "50px"}}>
                            <form onSubmit={handleSubmit(saveClients)} className={"d-flex gap-5"}>
                                <div>
                                    <label style={{width: "300px"}}>
                                        Territory*
                                        <Controller
                                            name='territory'
                                            control={control}
                                            render={({field}) => (
                                                <>
                                                    <Select
                                                        {...field}
                                                        options={territory?.filter(item => item.active).map(item => ({
                                                            value: item.id,
                                                            label: item.title,
                                                        }))}
                                                        style={{ width: 70 }}
                                                        placeholder={'territory'}
                                                    />

                                                </>
                                            )}
                                        />

                                    </label>
                                    {errors.clients && <span className="error-message">{errors.clients.message}</span>}
                                    <br/>
                                    <label style={{width: "300px"}}>
                                        Name*
                                        <input type="text"
                                               className={"form-control my-2"} {...register("name", {required: "Name is required"})} />
                                    </label>
                                    {errors.name && <span className="error-message">{errors.name.message}</span>}
                                    <br/>
                                    <label style={{width: "300px"}}>
                                        Address
                                        <input type="text"
                                               className={"form-control my-2"} {...register("address", {required: "Address is required"})} />
                                    </label>
                                    {errors.address && <span className="error-message">{errors.address.message}</span>}
                                    <br/>
                                    <label style={{width: "300px"}}>
                                        Telephone
                                        <input type="text"
                                               className={"form-control my-2"} {...register("phone", {required: "Phone number is required"})} />
                                    </label>
                                    {errors.phone &&
                                        <span className="error-message">{errors.phone.message}</span>}
                                    <br/>
                                    <label style={{width: "300px"}}>
                                        TIN
                                        <input type="text"
                                               className={"form-control my-2"} {...register("tin")} />
                                    </label>
                                    <br/>
                                    <label style={{width: "300px", display:"flex", alignItems:"center", gap:"10px"}}>
                                        Active
                                        <input type="checkbox"
                                               className={"form-check my-2"} {...register("active")} />
                                    </label>
                                    <br/>
                                </div>
                                <div>
                                    <label style={{width: "300px"}}>
                                        Company name
                                        <input type="text"
                                               className={"form-control my-2"} {...register("companyName", {required: "Company name is required"})} />
                                    </label>
                                    {errors.companyName &&
                                        <span className="error-message">{errors.companyName.message}</span>}
                                    <br/>
                                    <label style={{width: "300px"}}>
                                        Reference point
                                        <input type="text"
                                               className={"form-control my-2"} {...register("referencePoint", {required: "Reference point is required"})} />
                                    </label>
                                    {errors.referencePoint &&
                                        <span className="error-message">{errors.referencePoint.message}</span>}
                                    <br/>
                                    <label style={{width: "300px"}}>
                                        Category*
                                        <Controller
                                            name='category'
                                            control={control}
                                            render={({field}) => (
                                                <>
                                                    <Select
                                                        {...field}
                                                        options={categories?.filter(item => item.active).map(item => ({
                                                            value: item.id,
                                                            label: item.title,
                                                        }))}
                                                        style={{ width: 70 }}
                                                        placeholder={'category'}
                                                    />
                                                </>
                                            )}
                                        />

                                    </label>
                                    {errors.category &&
                                        <span className="error-message">{errors.category.message}</span>}
                                    <br/>
                                    <label style={{width: "300px"}}>
                                        Visiting days
                                        <br/>
                                        <br/>
                                        <span className="d-flex justify-content-center gap-3 flex-wrap">
                                              {weekdays.map(item =>
                                                  <label className={"d-flex gap-2 align-items-center"}
                                                         style={{fontSize: "10pt"}}>
                                                      <p style={item.name === "SATURDAY" || item.name === "SUNDAY" ? {color: "red"} : {color: "black"}}
                                                         className={"my-1"}>{item.name.substring(0, 3)}</p>
                                                      <input type="checkbox" className={"form-check"}
                                                             checked={clients.selectedWeekdays?.some(selectedItem => selectedItem.id === item.id)}
                                                             onChange={(e) => selectWeekday(item, e.target.checked)}/>
                                                  </label>
                                              )}
                                        </span>
                                    </label>
                                </div>
                                <div style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: "100%"
                                }}>
                                    <button className="btn btn-primary"
                                            style={{position: "absolute", bottom: "30px", left: "50px"}}>Save
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="right-side p-5">
                            <Map
                                onLoad={(e) => {
                                    console.log(e);
                                }}
                                width={400}
                                height={400}
                                onClick={handleMapClick}
                                state={clients.mapState}
                                modules={['templateLayoutFactory']}
                            >
                                <FullscreenControl options={{float: "left"}}/>
                                <GeolocationControl options={{float: "right"}}/>
                                <TrafficControl options={{float: "right"}}/>
                                <ZoomControl options={{float: "left"}}/>
                                <TypeSelector options={{float: "right"}}/>
                                <SearchControl options={{float: "left"}}/>
                                {clients.template && clients.longitude !== "" && clients.latitude !== "" && (
                                    <Placemark
                                        geometry={clients.mapState.center}
                                        modules={['geoObject.addon.balloon']}
                                    />

                                )}
                            </Map>
                            <div>
                                <div className="inputs d-flex align-items-center">
                                    <label>
                                        Long <br/>
                                        <input type="text" className={"w-75"} disabled={true}
                                               value={clients.longitude}/>
                                    </label>
                                    <label className={"mx-4 my-2"}>
                                        Lat <br/>
                                        <input type="text" className={"w-75"} disabled={true} value={clients.latitude}/>
                                    </label> <br/>
                                </div>
                                <button className="btn btn-danger" onClick={handleMapClear}>clear</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ClientsModal;

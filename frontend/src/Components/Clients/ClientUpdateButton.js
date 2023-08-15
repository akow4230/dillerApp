import React, {useState, useEffect} from 'react';
import EditIcon from '@mui/icons-material/Edit';
import {FullscreenControl, GeolocationControl, Map, Placemark, SearchControl, TrafficControl, TypeSelector, YMaps, ZoomControl } from "react-yandex-maps";
import {useDispatch, useSelector} from "react-redux";
import {setOneClientMapModal, setEditData, setEditModalVisible} from "../../redux/reducers/ClientsSlice";
import {changeLoader, saveColumnsOrders, toggleModal} from "../../redux/reducers/TableSlice";
import {Button, Dropdown} from 'react-bootstrap';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {Modal} from 'react-bootstrap';
import '../../Components/UniversalUI/Modal/index.css'
import Loader from "../../ui/loader";
import UModal from "../UniversalUI/Modal/UModal";
import loader from "../../ui/loader";
function ClientUpdateButton(props) {
    const dispatch = useDispatch();
    const {clientMapModal, editData} = useSelector((state) => state.clients);

    function editClientData() {
        dispatch(setEditData(props.data))
        dispatch(setEditModalVisible(true))
    }

    function showLocation() {
        setLoad(true);
        console.log(props.data)
        dispatch(setEditData(props.data))
        dispatch(setOneClientMapModal())
        setTimeout(() => {
            setLoad(false)
        }, 3000);
    }

const [load, setLoad]=useState(false)


    return (
        <div>
            <Dropdown>
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                    tools
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={editClientData}>
                        <EditIcon/>Edit
                    </Dropdown.Item>
                    <Dropdown.Item onClick={showLocation}>
                        <div><LocationOnIcon/>Location</div>
                    </Dropdown.Item>
                    <Dropdown.Item></Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <div className={'umodal'}>
                            <Modal show={clientMapModal} onHide={() => {
                                dispatch(setOneClientMapModal())
                            }} centered>

                                <div style={{height:600}}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>{editData?.name}</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        {load?<Loader/>:

                                                <Map
                                                    state={{center: [editData?.latitude, editData?.longitude], zoom: 11}}
                                                    style={{width: '100%', height: '500px'}}
                                                >
                                                    <FullscreenControl options={{float: "left"}}/>
                                                    <GeolocationControl options={{float: "right"}}/>
                                                    <TrafficControl options={{float: "right"}}/>
                                                    <ZoomControl options={{float: "left"}}/>
                                                    <TypeSelector options={{float: "right"}}/>
                                                    <SearchControl options={{float: "left"}}/>
                                                    <Placemark
                                                        key={editData?.id}
                                                        geometry={[editData?.latitude, editData?.longitude]}
                                                        properties={{
                                                            iconCaption: `${editData?.name}`,
                                                            balloonContent: `phone:${editData?.phone}`,
                                                            hintContent: `address:${editData?.address}`,
                                                        }}
                                                        options={{
                                                            preset: 'islands#blueIcon',
                                                            iconColor: `${editData?.active?'#00FF00':'#FF0000'}`,
                                                            draggable: false,
                                                        }}
                                                        modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
                                                    />
                                                </Map>
                                        }
                                    </Modal.Body>
                                </div>

                            </Modal>
                 </div>

           </div>


    );
}
//
// <UModal isOpen={clientMapModal} toggle={() => dispatch(setOneClientMapModal())} title={'Client map'}
//         onSave={() => {}} elements={[{
//     type:"jsx",
//     data:   <YMaps>
//         <Map
//             state={{center: [editData?.latitude, editData?.longitude], zoom: 12}}
//             style={{width: '100%', height: '500px'}}
//         >
//             <FullscreenControl options={{float: "left"}}/>
//             <GeolocationControl options={{float: "right"}}/>
//             <TrafficControl options={{float: "right"}}/>
//             <ZoomControl options={{float: "left"}}/>
//             <TypeSelector options={{float: "right"}}/>
//             <SearchControl options={{float: "left"}}/>
//
//             <Placemark
//                 key={editData?.id}
//                 geometry={[editData?.latitude, editData?.longitude]}
//                 properties={{
//                     iconCaption: `${editData?.name}`,
//                     balloonContent: `phone:${editData?.phone}`,
//                     hintContent: `address:${editData?.address}`,
//                 }}
//                 options={{
//                     preset: 'islands#blueIcon',
//                     iconColor: `${editData?.active?'#00FF00':'#FF0000'}`,
//                     draggable: false,
//                 }}
//                 modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
//             />
//         </Map>
//     </YMaps>
// }]} isNotSaving={true}/>


export default ClientUpdateButton
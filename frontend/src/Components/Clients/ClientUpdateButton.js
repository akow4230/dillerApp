import React, {useState, useEffect} from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { GeolocationControl, Map, Placemark, SearchControl, TrafficControl, TypeSelector, YMaps, ZoomControl } from "react-yandex-maps";
import {useDispatch, useSelector} from "react-redux";
import {setOneClientMapModal, setEditData, setEditModalVisible} from "../../redux/reducers/ClientsSlice";
import {Button, Dropdown} from 'react-bootstrap';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {Modal} from 'react-bootstrap';
import '../../Components/UniversalUI/Modal/index.css'
function ClientUpdateButton(props) {
    const dispatch = useDispatch();
    const {clientMapModal, editData} = useSelector((state) => state.clients);

    function editClientData() {
        dispatch(setEditData(props.data))
        dispatch(setEditModalVisible(true))
    }

    function showLocation() {
        dispatch(setEditData(props.data))
        dispatch(setOneClientMapModal())
    }

    const [isYMapsLoaded, setIsYMapsLoaded] = useState(false);

    useEffect(() => {
        if (clientMapModal) {
            const script = document.createElement('script');
            script.src = 'https://api-maps.yandex.ru/2.1/?apikey=YOUR_API_KEY&lang=en_US';
            script.async = true;
            script.onload = () => {

                setIsYMapsLoaded(true);
            };
            document.head.appendChild(script);

            return () => {
                document.head.removeChild(script);
            };
        }
    }, [clientMapModal]);

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
                {isYMapsLoaded && (
                    <Modal show={clientMapModal} onHide={() => {
                        dispatch(setOneClientMapModal())
                        setIsYMapsLoaded(false)
                    }} centered>
                        <Modal.Header closeButton>
                            <Modal.Title>{editData?.name}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <YMaps>
                                <Map
                                    state={{center: [editData?.latitude, editData?.longitude], zoom: 12}}
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
                                   </YMaps>
                               </Modal.Body>
                           </Modal>
                       )}
                   </div>

           </div>
        </div>

    );
}

export default ClientUpdateButton
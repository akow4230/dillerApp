import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    Clusterer,
    FullscreenControl,
    GeolocationControl,
    Map,
    Panorama,
    Placemark,
    SearchControl,
    TrafficControl,
    TypeSelector,
    YMaps,
    ZoomControl
} from "react-yandex-maps";
import img from './images/pencil.png'
import {fetchClientsStart} from "../../redux/reducers/ClientsSlice";
import {getTableData} from "../../redux/reducers/TableSlice";
import {fetchTerritoryStart} from "../../redux/reducers/TerritorySlice";
import Loader from "../../ui/loader";
import client from './images/client.png'
import territoryMark from './images/territory.png'
function ClientsOnMap(props) {
    const dispatch = useDispatch();
    const {clients, loading}=useSelector(state=>(state.clients))
    const {territory } = useSelector((state)=>state.territory)

    // console.log(clients)
    useEffect(() => {
        dispatch(fetchClientsStart())
        dispatch(fetchTerritoryStart())
    }, [ dispatch ]);
    console.log(loading)

    return (
        <div className='container'>
            <div >
                <h1>Clients on Map </h1>
            </div>
            <div className='my-2 d-flex justify-content-center align-items-center gap-5'>

                <div className='d-flex align-items-center'>
                    <span style={{backgroundColor:'#00FF00'}} className="translate-middle p-2 h-50 rounded-circle"></span>
                    <p>Active clients: {clients.filter(item => item.active).length}</p>
                </div>

                <div className='d-flex align-items-center'>
                    <span className="translate-middle p-2 bg-danger h-50 rounded-circle"></span>
                    <p>No active clients:  {clients.filter(item => !item.active).length}</p>
                </div>



                <div className='d-flex align-items-center'>
                    <span style={{backgroundColor:'#FF0000'}} className="translate-middle p-2 bg-primary h-50 rounded-circle"></span>
                    <p>Territory: {territory?.length}</p>
                </div>
            </div>

            {loading?
                <Loader/>
            :
            <div>

                <div className=''>
                    <YMaps>
                        <Map
                            humanDistance
                            state={{ center: [39.76318977554918, 64.42578226984958], zoom: 11 }}
                            modules={['templateLayoutFactory']}
                            style={{ width: '100%', height: '500px' }} // Adjust the size here
                        >
                            <FullscreenControl options={{float: "left"}}/>
                            <GeolocationControl options={{float: "right"}}/>
                            <TrafficControl options={{float: "right"}}/>
                            <ZoomControl options={{float: "left"}}/>
                            <TypeSelector options={{float: "right"}}/>
                            <SearchControl options={{float: "left"}}/>
                            <Clusterer
                                options={{
                                    preset: "islands#invertedVioletClusterIcons",
                                    groupByCoordinates: false,
                                }}
                            >
                                {clients?.map(item=>
                                    <Placemark
                                        key={item.id}
                                        geometry={[item.latitude, item.longitude]}
                                        properties={{

                                            iconCaption: `${item.name}`,
                                            balloonContent: `phone:${item.phone}`,
                                            hintContent: `address:${item.address}`,
                                        }}
                                        options={{
                                            preset: 'islands#blueIcon',
                                            iconColor: `${item?.active?'#00FF00':'#FF0000'}`,
                                            draggable: false,
                                        }}
                                        modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
                                    />

                                )}

                            </Clusterer>

                            {territory?.map(item=>
                                <Placemark
                                    key={item.id}
                                    geometry={[item.latitude, item.longitude]}
                                    properties={{
                                        iconCaption: `
                                                    <div>
                                                        <img src=${img} alt="Icon" width="20" height="20" />
                                                        <table>
                                                            <tr>
                                                                <td>Name:</td>
                                                                <td>${item.name}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Phone:</td>
                                                                <td>${item.phone}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Address:</td>
                                                                <td>${item.address}</td>
                                                            </tr>
                                                        </table>
                                                    </div>
                                                `,
                                        // iconCaption: `${item.title}`,
                                        // balloonContent: `region:${item.region}`,
                                        // hintContent: `code:${item.code}`,
                                    }}
                                    options={{
                                        // preset: 'islands#blueIcon',
                                        // iconColor: '#0000FF',
                                        // draggable: false,
                                        // iconLayout: 'default#image', // Specify that you're using an image for the icon
                                        // iconImageHref: img,  // Path to the image for clients
                                        iconImageSize: [30, 30],      // Size of the image
                                        iconImageOffset: [-15, -15],  // Offset of the image
                                        draggable: false,
                                    }}
                                    modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
                                />

                            )}



                        </Map>
                    </YMaps>

                </div>

            </div>
            }
        </div>
    );
}

export default ClientsOnMap;

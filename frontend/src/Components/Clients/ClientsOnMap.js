import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import { FullscreenControl, GeolocationControl, Map, Placemark, SearchControl, TrafficControl, TypeSelector, YMaps, ZoomControl} from "react-yandex-maps";
import {fetchClientsStart} from "../../redux/reducers/ClientsSlice";
import {getTableData} from "../../redux/reducers/TableSlice";
import {fetchTerritoryStart} from "../../redux/reducers/TerritorySlice";

function ClientsOnMap(props) {
    const dispatch = useDispatch();
    const {clients}=useSelector(state=>(state.clients))
    const {territory } = useSelector((state)=>state.territory)

    // console.log(clients)
    useEffect(() => {
        dispatch(fetchClientsStart())
        dispatch(fetchTerritoryStart())
    }, [ dispatch ]);


    return (
        <div className='container'>
            <div>
                <h1>Clients on Map </h1>
            </div>
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
                                    iconColor: '#00FF00',
                                    draggable: false,
                                }}
                                modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
                            />

                        )}
                        {territory?.map(item=>
                            <Placemark
                                key={item.id}
                                geometry={[item.latitude, item.longitude]}
                                properties={{
                                    iconCaption: `${item.title}`,
                                    balloonContent: `region:${item.region}`,
                                    hintContent: `code:${item.code}`,
                                }}
                                options={{
                                    preset: 'islands#blueIcon',
                                    iconColor: '#FF0000',
                                    draggable: false,
                                }}
                                modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
                            />

                        )}


                        {/*<Placemark*/}
                        {/*    geometry={shiftMapState.center}*/}
                        {/*    properties={{*/}
                        {/*        iconCaption: 'Shift academy',*/}
                        {/*        balloonContent: "'Bizning o'quv markaz'",*/}
                        {/*        hintContent: 'Zamonaviy dasturlash akademiyasi',*/}
                        {/*    }}*/}
                        {/*    options={{*/}
                        {/*        preset: 'islands#yellowIcon',*/}
                        {/*        iconColor: '#FF0000',*/}
                        {/*        //   draggable: true,*/}
                        {/*    }}*/}
                        {/*    modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}*/}
                        {/*/>*/}
                    </Map>
                </YMaps>

            </div>
        </div>
    );
}

export default ClientsOnMap;

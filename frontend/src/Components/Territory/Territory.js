    import React, {useEffect} from 'react';
    import { ToastContainer } from "react-toastify";
    import { useDispatch, useSelector } from "react-redux";
    import {
    setModalVisible,
    setEditModalVisible,
    setLongitude,
    setLatitude,
    setMapState, setEditData
} from "../../redux/reducers/TerritorySlice";
    import TerritoryModal from "./TerritoryModal";
    import Table from "../UniversalUI/Table/Table";
    import TerritoryUpdateButton from "./TerritoryUpdateButton";
    import {changeSearchParams} from "../../redux/reducers/TableSlice";

    function Territory(props) {
        const dispatch = useDispatch();
        const { modalVisible, editModalVisible, defValueOfMap, mapState, editData } = useSelector((state) => state.territory);
        useEffect(()=>{
            dispatch(changeSearchParams({active:""}))
        },[])
        const columns = [
            {
                id: 1,
                title: "Id",
                key: "id",
                type: "int",
                show: true,
                order: 1
            },
            {
                id: 2,
                title: "Region",
                key: "region",
                type: "str",
                show: true,
                order: 2
            },
            {
                id: 3,
                title: "Title",
                key: "title",
                type: "str",
                show: true,
                order: 3
            },
            {
                id: 4,
                title: "Code",
                key: "code",
                type: "str",
                show: true,
                order: 4
            },
            {id:5,
            title:"Update",
            key:"update",
            type:"jsx",
            show:true,
            order:5,
            data:<TerritoryUpdateButton />}
        ]
        const filterParam = [
            {
                id: 1,
                name: 'active',
                multi: false,
                options: [
                    {value: '', label: 'All'},
                    {value: 'true', label: 'Active'},
                    {value: 'false', label: 'NoActive'}
                ],
                defaultValue: {value: '', label: 'All'},
                placeholder: ''
            },
        ]
        const closeModal = () => {
            dispatch({ type: 'territory/handleMapClear', payload: { mapState: mapState, defValueOfMap: defValueOfMap } });
            dispatch(setModalVisible(false));
        };
        const closeEditModal = () =>{
            dispatch({ type: 'territory/handleMapClear', payload: { mapState: mapState, defValueOfMap: defValueOfMap } });
            dispatch(setEditModalVisible(false))
        }
        return (
            <div style={{ background: "#eeeeee", borderRadius: "15px", padding: "20px", width: "100%", overflowY:"auto" }}>
                <ToastContainer />
                <p style={{ fontSize: "25pt" }}>Territory</p>
                <hr />
                <button className="btn btn-success" onClick={() => dispatch(setModalVisible(true))}>+ Add Territory</button>
                <Table
                    isDark={false}
                    requestApi={"/api/v1/territory?page={page}&size={limit}"}
                    columns={columns}
                    filterParam={filterParam}
                />
                {/*<button className="btn btn-success" onClick={() => {*/}
                {/*    dispatch(setEditData({*/}
                {/*        id:"a03c748d-551b-4bd9-9dc4-bc372143cc09",*/}
                {/*        title:"Shift Academyyy",*/}
                {/*        region:"Buxoro2",*/}
                {/*        code:"1111111",*/}
                {/*        active:true,*/}
                {/*        longitude:64.45346406250006,*/}
                {/*        latitude:39.7420392241709*/}
                {/*    }))*/}
                {/*    dispatch(setEditModalVisible(true))*/}
                {/*}}> Edit Territory</button>*/}
                <TerritoryModal action={"Add territory"} visible={modalVisible} onClose={closeModal} />
                <TerritoryModal action={"Edit territory"} data={editData} isEditing={true} visible={editModalVisible} onClose={closeEditModal} />
            </div>
        );
    }

    export default Territory;

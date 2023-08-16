    import React, {useEffect} from 'react';
    import { ToastContainer } from "react-toastify";
    import { useDispatch, useSelector } from "react-redux";
    import {
    setModalVisible,
    setEditModalVisible,
} from "../../redux/reducers/TerritorySlice";
    import TerritoryModal from "./TerritoryModal";
    import Table from "../UniversalUI/Table/Table";
    import TerritoryUpdateButton from "./TerritoryUpdateButton";
    import {changeSearchParams} from "../../redux/reducers/TableSlice";
    import {useLocation} from "react-router-dom";

    function Territory(props) {
        const dispatch = useDispatch();
        const { modalVisible, editModalVisible, defValueOfMap, mapState, editData } = useSelector((state) => state.territory);
        const location= useLocation();
        useEffect(()=>{
            dispatch(changeSearchParams({active:'', quickSearch: ""}))
        },[location.pathname])
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
                placeholder: 'All'
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
                <div className={"d-flex gap-3 align-items-center"}>
                    <p style={{ fontSize: "25pt" }}>Territory</p>
                    <button className="btn btn-success h-50" onClick={() => dispatch(setModalVisible(true))}>+ Add Territory</button>
                </div>
                <hr />
                <Table
                    isDark={false}
                    requestApi={"/api/v1/territory?page={page}&size={limit}"}
                    columns={columns}
                    filterParam={filterParam}
                    path={"territory"}
                />
                <TerritoryModal action={"Add territory"} visible={modalVisible} onClose={closeModal} />
                <TerritoryModal action={"Edit territory"} data={editData} isEditing={true} visible={editModalVisible} onClose={closeEditModal} />
            </div>
        );
    }

    export default Territory;

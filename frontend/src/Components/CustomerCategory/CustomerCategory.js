import React, {useEffect} from 'react';
import {ToastContainer} from "react-toastify";
import {
    fetchCategoriesStart, setCloseModals,
    setEditModalVisible,
    setModalVisible,
    setPreClose
} from "../../redux/reducers/CustomerCategorySlice";
import UModal from "../UniversalUI/Modal/UModal";
import {useDispatch, useSelector} from "react-redux";
import {changeSearchParams, changeTableDataSize, saveColumnsOrders, toggleModal} from "../../redux/reducers/TableSlice";
import Table from "../UniversalUI/Table/Table";
import TerritoryUpdateButton from "../Territory/TerritoryUpdateButton";
import CategoryUpdateButton from "./CustomerCategoryUpdateButton";
import PreClose from "../UniversalUI/preClose/PreClose";
import {useLocation} from "react-router-dom";

function CustomerCategory(props) {
    const dispatch = useDispatch();

    const location= useLocation();
    useEffect(()=>{
        dispatch(changeSearchParams({active:'', quickSearch: ""}))
        dispatch(changeTableDataSize(5))
    },[location.pathname])
    const category = useSelector((state) => state.category);
    const {preCloseShow} = useSelector((state)=>state.category)
    const elements = [{
        name: "Title*",
        type: "text",
        key: "title",
        required: true
    },
        {
            name: "Description",
            type: "text",
            key: "description",
            required: true
        },
        {
            name: "Code",
            type: "text",
            key: "code",
            required: true
        },
        {
            name: "Active",
            type: "checkbox",
            key: "active",
            required: false
        }
    ]
    const columns = [

        {
            id: 2,
            title: "Title",
            key: "title",
            type: "str",
            show: true,
            order: 2
        },
        {
            id: 3,
            title: "Description",
            key: "description",
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
        {
            id: 5,
            title: "Active",
            key: "active",
            type: "str",
            show: true,
            order: 5
        },
        {
            id: 6,
            title: "Update",
            key: "update",
            type: "jsx",
            show: true,
            order: 6,
            data: <CategoryUpdateButton/>
        }
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
        }
    ]
    function handleCloseModal(){
        dispatch(setCloseModals())
        dispatch(changeSearchParams({active:'', quickSearch: ""}))
    }
    return (
        <div style={{background: "#eeeeee", borderRadius: "15px", padding: "20px", width: "100%", overflowY: "auto"}}>
            <ToastContainer/>
            <PreClose closeMainModal={handleCloseModal} closePreClose={()=>dispatch(setPreClose(false))} show={preCloseShow}/>
            <div className={"d-flex gap-3 align-items-center"}>
                <p style={{fontSize: "25pt"}}>Client category</p>
                <button className="btn btn-success h-50" onClick={() => dispatch(setModalVisible(true))}>+ Add client
                    category
                </button>
            </div>
            <hr/>
            <Table
                isDark={false}
                requestApi={"/api/v1/customercategory?page={page}&size={limit}"}
                columns={columns}
                filterParam={filterParam}
                path={"customercategory"}
            />
            <UModal isOpen={category.modalVisible} toggle={handleCloseModal}
                    action={'Add client category'} url={"/api/v1/customercategory"} elements={elements} openPreClose={()=>dispatch(setPreClose(true))} showPreClose={preCloseShow} title={"Client category"}/>
            <UModal isOpen={category.editModalVisible} isEditing={true} toggle={handleCloseModal}
                    action={'Edit client category'} url={category.editDataUrl} data={category.editData} elements={elements} openPreClose={()=>dispatch(setPreClose(true))} showPreClose={preCloseShow} title={"Client category"}/>
        </div>
    );
}

export default CustomerCategory;
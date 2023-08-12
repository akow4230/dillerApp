import React, {useEffect} from 'react';
import {ToastContainer} from "react-toastify";
import {fetchCategoriesStart, setEditModalVisible, setModalVisible} from "../../redux/reducers/CustomerCategorySlice";
import UModal from "../UniversalUI/Modal/UModal";
import {useDispatch, useSelector} from "react-redux";
import {changeSearchParams, saveColumnsOrders, toggleModal} from "../../redux/reducers/TableSlice";
import Table from "../UniversalUI/Table/Table";
import TerritoryUpdateButton from "../Territory/TerritoryUpdateButton";
import CategoryUpdateButton from "./CustomerCategoryUpdateButton";

function CustomerCategory(props) {
    useEffect(() => {
        dispatch(changeSearchParams({active:''}))
    }, [])
    const dispatch = useDispatch();
    const category = useSelector((state) => state.category);
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
            id: 1,
            title: "Id",
            key: "id",
            type: "int",
            show: true,
            order: 1
        },
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
    return (
        <div style={{background: "#eeeeee", borderRadius: "15px", padding: "20px", width: "100%", overflowY: "auto"}}>
            <ToastContainer/>
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
            <UModal isOpen={category.modalVisible} toggle={() => dispatch(setModalVisible(false))}
                    title={'Add client category'} url={"/api/v1/customercategory"} elements={elements}/>
            <UModal isOpen={category.editModalVisible} isEditing={true} toggle={() => dispatch(setEditModalVisible(false))}
                    title={'Edit client category'} url={category.editDataUrl} data={category.editData} elements={elements}/>
        </div>
    );
}

export default CustomerCategory;
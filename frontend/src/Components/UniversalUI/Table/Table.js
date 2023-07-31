import React, {useEffect} from 'react';
import './style.css'
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import {useDispatch, useSelector} from "react-redux";
import {changeTableDataSize, getTableData} from "../../../redux/reducers/TableSlice";

function Table({isPageNation, isDark, columns, requestApi}) {
    const dispatch = useDispatch()
    const animatedComponents = makeAnimated();
    const {pageSize, url, data} = useSelector((state) => state.table);
    useEffect(() => {
        dispatch(getTableData({url: requestApi}))
    }, [dispatch, requestApi])
    return (
        <div className={"tableUI"}>
            <div className="topUI">
                <Select
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    isMulti
                    // onChange={(e) => selectRoles(e)}
                    options={columns?.map(item1 => ({value: item1?.id, label: item1?.title}))}
                />
                {
                    isPageNation ? <select defaultValue={pageSize} style={{
                        width: 70
                    }} onChange={(e) => dispatch(changeTableDataSize(e.target.value))} className={"form-select"}>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                        <option value="40">40</option>
                        <option value="50">50</option>
                    </select> : ""
                }
            </div>
            <div className={"bottomUI"}>
                <table className={isDark ? 'table table-dark table-striped' : 'table'}>
                    <thead>
                    <tr>
                        {
                            columns?.map((item) => {
                                return <th key={item?.id} className={item.show ? "" : "hidden"}>
                                    {item?.title}
                                </th>
                            })
                        }
                    </tr>
                    </thead>
                    <tbody>
                    {
                        data?.data?.map(item => <tr key={item?.id}>
                            {
                                columns?.map((col) => <td key={col.id} className={col.show ? "" : "hidden"}>{
                                    item[col.key]
                                }</td>)
                            }
                        </tr>)
                    }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Table;
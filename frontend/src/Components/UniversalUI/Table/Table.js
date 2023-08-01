import React, {useEffect, useState} from 'react';
import './style.css'
import {Button, Select} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import {
    changeTableColumns,
    changeTableDataPage,
    changeTableDataSize,
    getTableData
} from "../../../redux/reducers/TableSlice";
import Pagination from '@mui/material/Pagination';
import Filter from "../filter/Filter";

function Table({isPageNation, isDark, columns, requestApi}) {
    const dispatch = useDispatch()
    const [settings, setSettings] = useState(false)
    const {pageSize, currentPage, data} = useSelector((state) => state.table);
    useEffect(() => {
        dispatch(getTableData({url: requestApi, page: currentPage, size: pageSize, columns: columns}))
    }, [columns, currentPage, dispatch, pageSize, requestApi])
    return (
        <div className={"tableUI"}>
          <div>
              <Filter obj={[]}/>
          </div>

            <div className="topUI my-2">
                <Button onClick={() => setSettings(!settings)} type={settings ? 'primary' : 'dashed'}><i
                    className="fa-solid fa-sliders"></i></Button>
                {
                    settings ? <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10
                    }}>{
                        data.columns?.map((item, index) => {
                            return <FormControlLabel
                                key={index}
                                value={item.id}
                                control={<Switch color="primary"/>}
                                label={item.title}
                                checked={item.show}
                                labelPlacement={item.title}
                                onChange={(e) => dispatch(changeTableColumns({
                                    id: item.id,
                                    checked: e.target.checked,
                                    columns: data.columns
                                }))}
                            />
                        })
                    }
                    </div> : <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10
                    }}><Select
                        defaultValue={pageSize}
                        style={{
                            width: 70,
                        }}
                        onChange={(e) => dispatch(changeTableDataSize(e))}
                        options={[
                            {
                                value: '10',
                                label: '10',
                            },
                            {
                                value: '20',
                                label: '20',
                            },
                            {
                                value: '30',
                                label: '30',
                            },
                            {
                                value: '40',
                                label: '40'
                            },
                            {
                                value: '50',
                                label: '50'
                            },
                        ]}
                    /></div>
                }
            </div>
            <div className={"bottomUI"}>
                <div className="my-table">
                    <table className={isDark ? 'table table-dark table-striped' : 'table'}>
                        <thead>
                        <tr>
                            {
                                data.columns?.map((item) => {
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
                                    data.columns?.map((col) => <td key={col.id} className={col.show ? "" : "hidden"}>{
                                        item[col.key]
                                    }</td>)
                                }
                            </tr>)
                        }
                        </tbody>
                    </table>
                </div>
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    height: 60,
                    marginTop: 10
                }}>
                    <Pagination onChange={(e, page) => dispatch(changeTableDataPage({page: page}))} page={currentPage}
                                count={data.totalPage}
                                variant="outlined" shape="rounded"/>
                </div>
            </div>
        </div>
    );
}

export default Table;
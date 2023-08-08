import React, {useEffect, useState} from 'react';
import './style.css';
import {Button, Select} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import {
    changeTableColumns,
    changeTableDataPage,
    changeTableDataSize,
    getTableData,
    saveColumnsOrders,
    toggleModal
} from '../../../redux/reducers/TableSlice';
import Pagination from '@mui/material/Pagination';
import Filter from '../filter/Filter';
import axios from 'axios';
import TableModal from './TableModal';
import UModal from '../Modal/UModal';

function Table({isDark, columns, requestApi, filterParam, path}) {
    const dispatch = useDispatch();
    const [settings, setSettings] = useState(false);
    const {
        pageSize,
        darkTheme,
        currentPage,
        data,
        modal,
        searchParams
    } = useSelector((state) => state.table);

    function getData(search) {
        dispatch(getTableData({
            url: requestApi,
            page: currentPage,
            size: pageSize,
            columns: columns,
            isDark: isDark,
            search
        }));
    }

    useEffect(() => {
        getData(searchParams);
    }, [columns, currentPage, dispatch, isDark, pageSize, requestApi]);

    function getExcel() {
        axios
            .get(`http://localhost:8080/api/v1/${path}/getExcel?active=${searchParams.active.value}&search=${searchParams.quickSearch}`, {
                responseType: 'arraybuffer', headers: {
                    Authorization: localStorage.getItem('access_token')
                }
            })
            .then((res) => {
                const blob = new Blob([res.data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
                const url = window.URL.createObjectURL(blob);

                const a = document.createElement('a');
                a.href = url;
                a.download = 'territory.xlsx';
                a.click();

                window.URL.revokeObjectURL(url);
            })
            .catch((error) => {
                console.error('Error fetching Excel data:', error);
            });
    }

    const elements = [
        {
            data: <TableModal/>
        }
    ];
    return (
        <div className={darkTheme ? 'tableUI-dark' : 'tableUI'}>
            <Filter param={filterParam} func={getData}/>
            <div className={darkTheme ? 'topUI-dark text-white' : 'topUI'}>
                <button className={"btn btn-light"} onClick={() => setSettings(!settings)} type={settings ? 'primary' : 'dashed'}><i
                    className="fa-solid fa-sliders" style={{zIndex:"auto"}}></i></button>
                {
                    settings ? <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10
                    }}>
                        <button className={"btn btn-light d-flex align-items-center gap-2"} style={{width:"180px"}} type={'dashed'} onClick={() => dispatch(toggleModal())}><i
                            className="fa-solid fa-gears"></i>Menu Control</button>
                        {/*<MaterialUISwitch*/}
                        {/*    checked={darkTheme}*/}
                        {/*    onChange={(e) => dispatch(changeTheme(e.target.checked))}*/}
                        {/*/>*/}
                        <Button type={'dashed'} onClick={() => dispatch(toggleModal())}><i
                            className="fa-solid fa-gears"></i> &nbsp; Menu Control</Button>
                        {
                            data.columns?.map((item, index) => {
                                return <FormControlLabel
                                    key={item?.id}
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
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10
                    }}>

                        <Select
                            defaultValue={pageSize}
                            style={{
                                width: 70,
                            }}
                            onChange={(e) => dispatch(changeTableDataSize(e))}
                            options={[
                                {
                                    value: '5',
                                    label: '5',
                                },
                                {
                                    value: '10',
                                    label: '10',
                                },
                                {
                                    value: '15',
                                    label: '15',
                                },
                                {
                                    value: '20',
                                    label: '20'
                                },
                                {
                                    value: '30',
                                    label: '30'
                                },
                            ]}
                        />
                        <Button type={'dashed'} onClick={getExcel}  style={{ zIndex: "auto !important"}}><i
                            className="fa-solid fa-table"></i> &nbsp; Excel</Button>
                    </div>
                }
            </div>
            <div className={darkTheme ? 'bottomUI-dark' : 'bottomUI'} style={{overflowY: 'auto'}}>
                <div className={darkTheme ? 'my-table-dark' : 'my-table'}>
                    <table className={darkTheme ? 'table table-dark table-striped' : 'table table-bordered'}>
                        <thead style={{position:"sticky", top:"-1"}}>
                        <tr>
                            {
                                data?.columns?.map((item) => {
                                    return <th key={item?.id}>
                                        <p className={item?.show ? '' : 'hidden'}>{item?.title}</p>
                                    </th>
                                })
                            }
                        </tr>
                        </thead>
                        <tbody>
                        {
                            data?.data?.map(item => <tr key={item?.id}>
                                {
                                    data?.columns?.map((col) => <td key={col?.id}>
                                        {col.render ? col.render(item) :
                                            col?.show &&
                                            col.type === 'jsx' ? React.cloneElement(col.data, {data: item}) : col.show &&
                                                <p>{item[col?.key]}</p>

                                        }
                                        {
                                        }</td>)
                                }
                            </tr>)
                        }

                        </tbody>
                    </table>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        height: 40
                    }}>
                        {data.totalPage > 1 &&
                            <Pagination onChange={(e, page) => dispatch(changeTableDataPage({page: page}))}
                                        page={currentPage}
                                        count={data.totalPage}
                                        color={'primary'}
                                        variant={"outlined"}
                                        shape="rounded"/>}

                    </div>
                </div>

            </div>
            <UModal isOpen={modal} toggle={() => dispatch(toggleModal())} title={'Change order'}
                    onSave={() => dispatch(saveColumnsOrders())} elements={elements}/>
        </div>
    );
}

export default Table;


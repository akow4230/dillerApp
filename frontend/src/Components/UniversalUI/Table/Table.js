import React, { useEffect, useState } from 'react';
import './style.css';
import { Button, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { changeTableColumns, changeTableDataPage, changeTableDataSize, changeTheme, getTableData, saveColumnsOrders, toggleModal } from '../../../redux/reducers/TableSlice';
import Pagination from '@mui/material/Pagination';
import { styled } from '@mui/material/styles';
import Filter from '../filter/Filter';
import axios from 'axios';
import TableModal from './TableModal';
import UModal from '../Modal/UModal';

function Table({ isDark, columns, requestApi, filterParam, path }) {
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
                const blob = new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
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
            data: <TableModal />
        }
    ];
    return (
        <div className={darkTheme ? 'tableUI-dark' : 'tableUI'}>
            <Filter param={filterParam} func={getData} />
            <div className={darkTheme ? 'topUI-dark text-white' : 'topUI'}>
                <Button onClick={() => setSettings(!settings)} type={settings ? 'primary' : 'dashed'}><i className="fa-solid fa-sliders"></i></Button>
                {
                    settings ? <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10
                    }}>
                        <Button type={'dashed'} onClick={() => dispatch(toggleModal())}><i className="fa-solid fa-gears"></i> &nbsp; Menu Control</Button>
                        {/*<MaterialUISwitch*/}
                        {/*    checked={darkTheme}*/}
                        {/*    onChange={(e) => dispatch(changeTheme(e.target.checked))}*/}
                        {/*/>*/}
                        {
                            data.columns?.map((item, index) => {
                                return <FormControlLabel
                                    key={item?.id}
                                    value={item.id}
                                    control={<Switch color="primary" />}
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
                        <Button type={'dashed'} onClick={getExcel}><i className="fa-solid fa-table"></i> &nbsp; Excel</Button>
                    </div>
                }
            </div>
            <div className={darkTheme ? 'bottomUI-dark' : 'bottomUI'} style={{ overflowY: 'auto' }}>
                <div className={darkTheme ? 'my-table-dark' : 'my-table'}>
                    <table className={darkTheme ? 'table table-dark table-striped' : 'table table-bordered'}>
                        <thead style={{position:"sticky", top:-1,}}>
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
                                            col.type === 'jsx' ? React.cloneElement(col.data, { data: item }) : col.show &&
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
                        {data.totalPage>1 && <Pagination onChange={(e, page) => dispatch(changeTableDataPage({page: page}))} page={currentPage}
                                                         count={data.totalPage}
                                                         color={'primary'}
                                                         variant={"outlined"}
                                                         shape="rounded"/>}

                    </div>
                </div>

            </div>
            <UModal isOpen={modal} toggle={() => dispatch(toggleModal())} title={'Change order'}
                    onSave={() => dispatch(saveColumnsOrders())} elements={elements} />
        </div>
    );
}

export default Table;

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
        margin: 1,
        padding: 0,
        transform: 'translateX(6px)',
        '&.Mui-checked': {
            color: '#fff',
            transform: 'translateX(22px)',
            '& .MuiSwitch-thumb:before': {
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                    '#fff',
                )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
            },
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
            },
        },
    },
    '& .MuiSwitch-thumb': {
        backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
        width: 32,
        height: 32,
        '&:before': {
            content: "''",
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                '#fff',
            )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
        },
    },
    '& .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
        borderRadius: 20 / 2,
    },
}));
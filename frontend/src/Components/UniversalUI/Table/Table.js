import React, {useEffect, useState} from 'react';
import './style.css';
import {Button, Select} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import {
    changeSearchParams,
    changeTableColumns,
    changeTableDataPage,
    changeTableDataSize,
    getTableData,
    saveColumnsOrders,
    toggleModal,
    changeLoader
} from '../../../redux/reducers/TableSlice';
import Pagination from '@mui/material/Pagination';
import Filter from '../filter/Filter';
import axios from 'axios';
import TableModal from './TableModal';
import UModal from '../Modal/UModal';
import {useLocation} from "react-router-dom";
import Loader from "../../../ui/loader";
import PreClose from "../preClose/PreClose";

function Table({isDark, columns, requestApi, filterParam, path}) {
    const baseURL="http://localhost:8080"
    const dispatch = useDispatch();
    const [settings, setSettings] = useState(false);
    const {
        pageSize,
        darkTheme,
        currentPage,
        data,
        modal,
        searchParams,
        isLoading
    } = useSelector((state) => state.table);
    function getData(search, changePage = false) {
        if (changePage) {
            dispatch(getTableData({
                url: requestApi,
                page: 1,
                size: pageSize,
                columns: columns,
                isDark: isDark,
                search
            }));
        } else {
            dispatch(getTableData({
                url: requestApi,
                page: currentPage,
                size: pageSize,
                columns: columns,
                isDark: isDark,
                search
            }));
        }
    }

    useEffect(() => {
        getData(searchParams);
    }, [searchParams, columns, currentPage, dispatch, isDark, pageSize, requestApi]);

    function getExcel() {
        let category=[]

        searchParams.category?.map(item=>{
            category.push(item.value)
        })
        let weekDay = []
        searchParams.weekDay?.map(item => {
            weekDay.push(item.value)
        })
        let territory = []
        searchParams.territory?.map(item => {
            territory?.push(item?.value)
        })
        axios
            .get(`${baseURL}/api/v1/${path}/getExcel`, {
                responseType: 'arraybuffer', headers: {
                    Authorization: localStorage.getItem('access_token')
                }, params: {
                    active: searchParams.active?.value,
                    quickSearch: searchParams.quickSearch,
                    category: category.join(','),
                    weekDay: weekDay.join(','),
                    tin: searchParams.tin?.value,
                    territory: territory.join(',')
                }
            })
            .then((res) => {
                const blob = new Blob([res.data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
                const url = window.URL.createObjectURL(blob);

                const a = document.createElement('a');
                a.href = url;
                a.download = path + '.xlsx';
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

    function getValueByKeys(obj, keys) {
        const keysArray = keys.split("+").map((key) => key.trim());
        const values = keysArray.map((key) =>
            key.split('.').reduce((acc, k) => (acc && acc[k]) || '', obj)
        );
        return values.join(" ");
    }
    useEffect(()=>{
        dispatch(changeLoader());
        setTimeout(() => {
            dispatch(changeLoader());
        }, 1000);
    },[])
    return (
        <div>
         <div className={darkTheme ? 'tableUI-dark' : 'tableUI'}>
                        <PreClose closeMainModal={() => dispatch(toggleModal())}/>
                        <Filter param={filterParam} func={getData}/>
                       <div className={'bottomUI'} style={{overflowY: 'auto'}}>
                           {
                               isLoading?(<Loader/>):(<div className={'my-table'}>
                                   <table className="table">
                                       <thead style={{position: "sticky", top: "-1"}}>
                                       <tr>
                                           {data?.columns
                                               ?.filter((item) => item?.show)
                                               .map((item) => (
                                                   <th key={item?.id}>
                                                       <p>{item?.title}</p>
                                                   </th>
                                               ))}
                                       </tr>
                                       </thead>
                                       <tbody>
                                       {data?.data?.map((item) => (
                                           <tr key={item?.id}>
                                               {data?.columns?.filter((col) => col?.show).map((col) => (
                                                   <td key={col?.id}>
                                                       {col.type === 'jsx' ? (
                                                           React.cloneElement(col.data, {
                                                               data: item
                                                           })
                                                       ) : col.type === 'date' ? col?.render(item) : (
                                                           <p>{getValueByKeys(item, col.key)}</p>
                                                       )
                                                       }
                                                   </td>
                                               ))}
                                           </tr>
                                       ))}
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
                               </div>)
                           }
                        <UModal isOpen={modal} toggle={() => dispatch(toggleModal())} title={'Change order'}
                                onSave={() => dispatch(saveColumnsOrders())} elements={elements}/>
                    </div>
             </div>
        </div>
    );
}

export default Table;


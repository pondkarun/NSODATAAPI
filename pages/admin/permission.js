import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import Layout from '../../components/Layouts';
import API from '../../util/Api';
import {Table} from 'antd';
import {Cookies} from 'react-cookie';

export default function PermissionList(){

    const columns = [
        {
            title: 'ลำดับ',
            dataIndex: 'num',
            key: 'num',
            align:"center",
            sorter:(a,b) => a.num - b.num,
            render: (text, record, index) => index + 1,
        },
        {
            title: 'ชื่อ',
            dataIndex: 'access_name',
            key: 'access_name',
            sorter:(a,b) => a.access_name - b.access_name,
        },
        {
            title: 'กลุ่มผู้ใช้งาน',
            dataIndex: 'group_name',
            key: 'group_name',
            // sorter:(a,b) => a.group_name - b.group_name,
        },
        {
            title: 'จัดการ',
            dataIndex: '',
            key: '',
            render: (text, record, index) => <button>click</button>
        }
    ];

    useEffect(async () => {
        permissionDataList();
    },[]);

    const cookies = new Cookies();
    const {openid} = useSelector(({ auth }) => auth);
    const oID = cookies.get('openid');
    console.log('getOpenIDCookies', oID);

    const [permissionData, setPermissionData] = useState([]);
    const permissionDataList = () => {
        API.get('http://dookdik2021.ddns.net/services/v1/api/access/all', {
            headers: {
                'Authorization': `Bearer ${oID.token}`
              },
        }).then((data) => {
            setPermissionData(data.data.data.data);
            console.log('permissionData',permissionData);
        }).catch((error) => {
            console.log('error :>> ', error);
        })
    }


    return (
        <>
            <Layout disableheader>
                <h1 style={{fontSize: 27}}>รายการระดับการเข้าถึงระบบ</h1>
                <Table dataSource={permissionData} columns={columns} rowKey={(row)=>row.id} />;
            </Layout>
        </>
    )
}
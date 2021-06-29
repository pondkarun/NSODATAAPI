import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import Layout from '../../components/Layouts';
import API from '../../util/Api';
import {Table} from 'antd';
import {Cookies} from 'react-cookie';

export default function UserList(){
    
    const columns = [
        {
            title: 'ลำดับ',
            dataIndex: 'num',
            key: 'num',
            align:"center",
            render: (text, record, index) => index + 1,
        },
        {
            title: 'ชื่อเข้าใช้ระบบ',
            dataIndex: 'user_name',
            key: 'user_name',
        },
        {
            title: 'ชื่อ - นามสกุล',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'อีเมล',
            dataIndex: 'e_mail',
            key: 'e_mail',
        },
        {
            title: 'กลุ่มผู้ใช้งาน',
            dataIndex: 'group_name',
            key: 'group_name',
        },
        {
            title: 'เข้าระบบล่าสุด',
            dataIndex: 'last_login',
            key: 'last_login',
        },
        {
            title: 'สถานะผู้ใช้',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'จัดการ',
            dataIndex: '',
            key: '',
            render: (text, record, index) => <button>click</button>
        }
    ];

    useEffect(async () => {
        userDataList();
    },[]);

    const cookies = new Cookies();
    const {openid} = useSelector(({ auth }) => auth);
    const oID = cookies.get('openid');
    console.log('getOpenIDCookies', oID);

    const [userData, setUserData] = useState([]);
    const userDataList = () => {
        API.get('http://dookdik2021.ddns.net/services/v1/api/user/all', {
            headers: {
                'Authorization': `Bearer ${oID.token}`
              },
        }).then((data) => {
            setUserData(data.data.data.data);
            console.log('userData',userData);
        }).catch((error) => {
            console.log('error :>> ', error);
        })
    }

    return (
        <Layout disableheader>
            <h1  style={{fontSize: 27}}>ระบบจัดการผู้ใช้งานระบบ</h1>
            <Table dataSource={userData} columns={columns} rowKey={(row)=>row.id} />;
        </Layout>
    )
}
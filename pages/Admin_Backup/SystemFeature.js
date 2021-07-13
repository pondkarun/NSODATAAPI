import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import Layout from '../../components/Layouts';
import API from '../../util/Api';
import {Table} from 'antd';
import {Cookies} from 'react-cookie';

export default function UserList(){
    const dataSource = [
        {
            key: '1',
            access_name: 'Mike',
            e_mail: 32,
            group_name: '10 Downing Street',
        },
        {
            key: '2',
            access_name: 'John',
            e_mail: 42,
            group_name: '10 Downing Street',
        },
    ];
    const columns = [
        {
            title: 'ลำดับ',
            dataIndex: 'num',
            key: 'num',
            align:"center",
            sorter:(a,b) => a.parent_id - b.parent_id,
            render: (text, record, index) => index + 1,
        },
        {
            title: 'ชื่อ',
            dataIndex: 'access_name',
            key: 'access_name',
            sorter:(a,b) => a.access_name - b.access_name,
        },
        {
            title: 'URL',
            dataIndex: 'url',
            key: 'url',
            sorter:(a,b) => a.url - b.url,
        },
        {
            title: 'Access',
            dataIndex: 'access_name',
            key: 'access_name',
            sorter:(a,b) => a.access_name - b.access_name,
        },
        {
            title: 'Parent Menu',
            dataIndex: 'parent_menu',
            key: 'parent_menu',
            // sorter:(a,b) => a.parent_id - b.parent_id,
        },
        {
            title: 'จัดการ',
            dataIndex: '',
            key: '',
            render: (text, record, index) => <button>click</button>
        }
    ];

    useEffect(async () => {
        featureDataList();
    },[]);

    const cookies = new Cookies();
    const {openid} = useSelector(({ auth }) => auth);
    const oID = cookies.get('openid');
    console.log('getOpenIDCookies', oID);

    const [featureData, setFeatureData] = useState([]);
    const featureDataList = () => {
        API.get(`${process.env.NEXT_PUBLIC_APIURL}/application/all`, {
            headers: {
                'Authorization': `Bearer ${oID.token}`
              },
        }).then((data) => {
            setFeatureData(data.data.data.data);
            console.log('featureData',featureData);
        }).catch((error) => {
            console.log('error :>> ', error);
        })
    }
//

    return (
        <>
            <Layout disableheader>
                <h1 style={{fontSize: 27}}>ระบบจัดการการเข้าถึง Application</h1>
                <Table dataSource={featureData} columns={columns} rowKey={(row)=>row.id} />;
            </Layout>
        </>
    )
}
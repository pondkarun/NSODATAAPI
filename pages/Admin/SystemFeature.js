import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import Layout from '../../components/Layouts';
import API from '../../util/Api';
import {Table, Button, Row, Col} from 'antd';
import {Cookies} from 'react-cookie';
import Head from 'next/head';
import {CheckCircleOutlined, CloseCircleOutlined, ReloadOutlined, EyeOutlined, EditOutlined} from '@ant-design/icons';

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
            render: (text, record, index) => (
                <>
                    <Button type="link"><EyeOutlined style={{fontSize: 23, color: 'gray'}} /></Button><Button type="link"><EditOutlined style={{fontSize: 23, color: 'blue'}} /></Button>
                </>
            )
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
            {/* <Layout disableheader>
                <h1 style={{fontSize: 27}}>ระบบจัดการการเข้าถึง Application</h1>
                <Table dataSource={featureData} columns={columns} rowKey={(row)=>row.id} />;
            </Layout> */}

            <Layout disableheader>
                <Head>
                    <title>ระบบจัดการการเข้าถึง Application</title>
                </Head>
                <h1 style={{ fontSize: 27 }}>ระบบจัดการการเข้าถึง Application</h1>

                <Row>
                    <Col span={24} style={{ textAlign: 'right', display: 'inline', paddingBottom: 10 }}>
                        <Button type="default">เพิ่ม</Button>
                        {' '}
                        <Button type="default"><ReloadOutlined /></Button>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Table dataSource={featureData} columns={columns} rowKey={(row) => row.id} />;
                    </Col>
                </Row>
            </Layout>
        </>
    )
}
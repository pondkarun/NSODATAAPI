import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import Layout from '../../components/Layouts';
import API from '../../util/Api';
import {Table, Row, Col, Button} from 'antd';
import {Cookies} from 'react-cookie';
import Head from 'next/head';
import {CheckCircleOutlined, CloseCircleOutlined, ReloadOutlined, EyeOutlined, EditOutlined} from '@ant-design/icons';


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
            align: 'center',
            render: (text, record, index) => (
                <>
                    <Button type="link"><EyeOutlined style={{fontSize: 23, color: 'gray'}} /></Button><Button type="link"><EditOutlined style={{fontSize: 23, color: 'blue'}} /></Button>
                </>
            )
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
        API.get('http://api.directory.gdcatalog.go.th/v1/api/access/all', {
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
//

    return (
        <>
            {/* <Layout disableheader>
                <h1 style={{fontSize: 27}}>ระบบจัดการระดับการเข้าถึงระบบ</h1>
                <Table dataSource={permissionData} columns={columns} rowKey={(row)=>row.id} />;
            </Layout> */}

<Layout disableheader>
            <Head>
                <title>ระบบจัดการระดับการเข้าถึงระบบ</title>
            </Head>
            <h1  style={{fontSize: 27}}>ระบบจัดการระดับการเข้าถึงระบบ</h1>

            <Row>
                <Col span={24} style={{textAlign: 'right', display: 'inline', paddingBottom: 10}}>
                    <Button type="default">เพิ่ม</Button>
                    {' '}
                    <Button type="default"><ReloadOutlined /></Button>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                        <Table dataSource={permissionData} columns={columns} rowKey={(row) => row.id} />;
                </Col>
            </Row>
        </Layout>
        </>
    )
}
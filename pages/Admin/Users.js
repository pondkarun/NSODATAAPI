import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import Layout from '../../components/Layouts';
import API from '../../util/Api';
import {Table, Row, Col, Button} from 'antd';
import {Cookies} from 'react-cookie';
import Head from 'next/head';
import {CheckCircleOutlined, CloseCircleOutlined, ReloadOutlined, EyeOutlined, EditOutlined} from '@ant-design/icons';

export default function UserList(){

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
            title: 'ชื่อเข้าใช้ระบบ',
            dataIndex: 'user_name',
            key: 'user_name',
            sorter:(a,b) => a.user_name - b.user_name,
        },
        {
            title: 'ชื่อ',
            dataIndex: 'first_name',
            key: 'first_name',
            sorter:(a,b) => a.first_name - b.first_name,
        },
        {
            title: 'นามสกุล',
            dataIndex: 'last_name',
            key: 'last_name',
            sorter:(a,b) => a.last_name - b.last_name,
        },
        {
            title: 'อีเมล',
            dataIndex: 'e_mail',
            key: 'e_mail',
            sorter:(a,b) => a.e_mail - b.e_mail,
        },
        {
            title: 'กลุ่มผู้ใช้งาน',
            dataIndex: 'group_name',
            key: 'group_name',
            sorter:(a,b) => a.group_name - b.group_name,
        },
        {
            title: 'เข้าระบบล่าสุด',
            dataIndex: 'last_login',
            key: 'last_login',
            sorter:(a,b) => a.last_login - b.last_login,
        },
        {
            title: 'สถานะผู้ใช้',
            dataIndex: 'status',
            key: 'status',
            // sorter:(a,b) => a.status - b.status,
            // render: (text, record, index) => {parseInt(text) == 1 ? <CheckCircleOutlined style={{color: 'green', fontSize: 27}} /> : <CloseCircleOutlined style={{color: 'red', fontSize: 27}} />}
            render: (text, record, index) => <CheckCircleOutlined style={{color: 'green', fontSize: 27}} />

        },
        {
            title: 'จัดการ',
            dataIndex: '',
            key: '',
            render: (text, record, index) => (
                // <div>
                <>
                    <Button type="link"><EyeOutlined style={{fontSize: 23, color: 'gray'}} /></Button><Button type="link"><EditOutlined style={{fontSize: 23, color: 'blue'}} /></Button>
                </>
                // </div>
            )
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
        API.get(`${process.env.NEXT_PUBLIC_APIURL}/user/all`, {
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
        // <Layout disableheader>
        //     <h1  style={{fontSize: 27}}>ระบบจัดการผู้ใช้งานระบบ</h1>
        //     <Table dataSource={userData} columns={columns} rowKey={(row)=>row.id} onChange={onChange} />;
        // </Layout>
        <Layout disableheader>
            <Head>
                <title>ระบบจัดการผู้ใช้งานระบบ</title>
            </Head>
            <h1  style={{fontSize: 27}}>ระบบจัดการผู้ใช้งานระบบ</h1>

            <Row>
                <Col span={24} style={{textAlign: 'right', display: 'inline', paddingBottom: 10}}>
                    <Button type="default">เพิ่ม</Button>
                    {' '}
                    <Button type="default"><ReloadOutlined /></Button>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Table dataSource={userData} columns={columns} rowKey={(row) => row.id} onChange={onChange} />
                </Col>
            </Row>
        </Layout>
    )
}

function onChange(pagination, filters, sorter, extra) {
    console.log('tableParams >> ', pagination, filters, sorter, extra);
  }
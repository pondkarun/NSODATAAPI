import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import Layout from '../../components/Layouts';
import API from '../../util/Api';
import {Table, Button, Row, Col} from 'antd';
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
            title: 'ชื่อ',
            dataIndex: 'group_name',
            key: 'group_name',
            sorter:(a,b) => a.group_name - b.group_name,
        },
        {
            title: 'กลุ่มผู้ใช้งาน',
            dataIndex: 'parent_id',
            key: 'parent_id',
            sorter:(a,b) => a.parent_id - b.parent_id,
        },
        {
            // title: 'กลุ่มผู้ใช้งาน',
            // dataIndex: 'access',
            // key: 'access',
            // // render: (text, row, index) => {
            // //     console.log('access log >>', text);
            // // },
            // render: (text, row, index) => {
            //     text.map((acc, k) => (
            //         <p>{acc}</p>
            //     ))
            // },
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
        userGroupDataList();
    },[]);

    const cookies = new Cookies();
    const {openid} = useSelector(({ auth }) => auth);
    const oID = cookies.get('openid');
    console.log('getOpenIDCookies', oID);

    const [userGroupData, setUserGroupData] = useState([]);
    const userGroupDataList = () => {
        API.get('http://dookdik2021.ddns.net/services/v1/api/group/all', {
            headers: {
                'Authorization': `Bearer ${oID.token}`
              },
        }).then((data) => {
            console.log('user group list >>', data.data.data.data);
            setUserGroupData(data.data.data.data);
            console.log('userGroupData',userGroupData);
        }).catch((error) => {
            console.log('error :>> ', error);
        })
    }
//
    return (
        <>
            {/* <Layout disableheader>
                <h1 style={{fontSize: 27}}>รายการกลุ่มผู้ใช้งานระบบ</h1>
                <Table dataSource={userGroupData} columns={columns} rowKey={(row)=>row.id} />
            </Layout> */}
            <Layout disableheader>
                <Head>
                    <title>ระบบจัดการกลุ่มผู้ใช้งานระบบ</title>
                </Head>
                <h1 style={{ fontSize: 27 }}>ระบบจัดการกลุ่มผู้ใช้งานระบบ</h1>

                <Row>
                    <Col span={24} style={{ textAlign: 'right', display: 'inline', paddingBottom: 10 }}>
                        <Button type="default">เพิ่ม</Button>
                        {' '}
                        <Button type="default"><ReloadOutlined /></Button>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Table dataSource={userGroupData} columns={columns} rowKey={(row) => row.id} />
                    </Col>
                </Row>
            </Layout>

        </>
    )
}
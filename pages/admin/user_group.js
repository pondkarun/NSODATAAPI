import React from 'react';
import Layout from '../../components/Layouts';
import { Table } from 'antd';

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
            dataIndex: 'key',
            key: 'key',
        },
        {
            title: 'ชื่อ',
            dataIndex: 'access_name',
            key: 'access_name',
        },
        {
            title: 'กลุ่มผู้ใช้งาน',
            dataIndex: '',
            key: '',
        },
        {
            title: 'กลุ่มผู้ใช้งาน',
            dataIndex: '',
            key: '',
        },
        {
            title: 'จัดการ',
            dataIndex: '',
            key: '',
        }
    ];


    return (
        <>
            <Layout disableheader>
                <h1 style={{fontSize: 27}}>รายการกลุ่มผู้ใช้งานระบบ</h1>
                <Table dataSource={dataSource} columns={columns} />
            </Layout>
        </>
    )
}
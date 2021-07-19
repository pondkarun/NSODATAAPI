import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import Layout from '../../components/Layouts';
import API from '../../util/Api';
import {Table, Row, Col, Button, Modal, Input, Select} from 'antd';
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
                    <Button type="link"><EyeOutlined style={{fontSize: 23, color: 'gray'}} /></Button><Button type="link" onClick={showEditModal}><EditOutlined style={{fontSize: 23, color: 'blue'}} /></Button>
                </>
                // </div>
            )
        }
    ];

    useEffect(async () => {
        userDataList();
        userGroupDataList();
    },[]);

    const cookies = new Cookies();
    const {Option} = Select;
    const {openid} = useSelector(({ auth }) => auth);
    const oID = cookies.get('openid');
    console.log('getOpenIDCookies', oID);

    const [userName, setUserName]= useState('');
    const [name, setName]= useState('');
    const [lastName, setLastName]= useState('');
    const [password, setPassword]= useState('');
    const [cPassword, setCPassword]= useState('');
    const [email, setEmail]= useState('');
    const [telephone, setTelephone]= useState('');
    const [userIdentityNo, setUserIdentityNo]= useState('');
    const [status, setStatus]= useState('1');
    const [userGroup, setUserGroup]= useState('');
    const [note, setNote]= useState('');

    // const addUserFormData = new FormData();
    // addUserFormData.append('user_name', userName);
    // addUserFormData.append('first_name', name);
    // addUserFormData.append('last_name', lastName);
    // addUserFormData.append('password', password);
    // addUserFormData.append('c_password', cPassword);
    // addUserFormData.append('e_mail', email);
    // addUserFormData.append('mobile_phone_no', telephone);
    // addUserFormData.append('id_card_no', userIdentityNo);
    // addUserFormData.append('status', status);
    // addUserFormData.append('group_id', userGroup);
    // addUserFormData.append('note', note);


    const [userGroupData, setUserGroupData] = useState([]);
    const userGroupDataList = () => {
        API.get(`${process.env.NEXT_PUBLIC_APIURL}/group/all`, {
            headers: {
                'Authorization': `Bearer ${oID.token}`
              },
        }).then((data) => {
            setUserGroupData(data.data.data.data);
            console.log('userGroupData',userGroupData);
        }).catch((error) => {
            console.log('error :>> ', error);
        })
    }

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

    // const addUser = () =>{
    //     API.post(`${process.env.NEXT_PUBLIC_APIURL}/user/add`, addUserFormData, {
    //         headers: {
    //             "Content-Type": "multipart/form-data",'Authorization': `Bearer ${oID.token}`
    //           },
    //     }).then((data) => {
    //         console.log("Add user RESP >>", data.data)
    //         setIsModalVisible(false);

    //     }).catch((error) => {
    //         console.log('error :>> ', error);
    //     })    
    // }
    // const updateUser = () =>{
    //     API.post(`${process.env.NEXT_PUBLIC_APIURL}/user/add`, {
    //         headers: {
    //             'Authorization': `Bearer ${oID.token}`
    //           },
    //     }).then((data) => {

    //     }).catch((error) => {
    //         console.log('error :>> ', error);
    //     })    
    // }
    // const deleteUser = () =>{
    //     API.delete(`${process.env.NEXT_PUBLIC_APIURL}/user/delete`, {
    //         headers: {
    //             'Authorization': `Bearer ${oID.token}`
    //           },
    //     }).then((data) => {

    //     }).catch((error) => {
    //         console.log('error :>> ', error);
    //     })    
    // }



    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const showModal = () => {
        setIsModalVisible(true);
    };
    const showEditModal = () =>{
        setIsEditModalVisible(true);
    }
    const handleOk = () => {
        setIsModalVisible(false);
        setIsEditModalVisible(false);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
        setIsEditModalVisible(false);
    };





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
                    <Button type="default" onClick={showModal}>เพิ่ม</Button>
                    {' '}
                    <Button type="default"><ReloadOutlined /></Button>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Table dataSource={userData} columns={columns} rowKey={(row) => row.id} onChange={onChange} />
                </Col>
            </Row>
 {/* -------------------------------------------------------------------------------------------------------------------------            */}
            <Modal title="เพิ่มผู้ใช้งาน" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Row style={{ paddingBottom: '10px'}}>
                    <Col span={12} style={{textAlign: 'right'}}>
                        ชื่อผู้ใช้:
                    </Col>
                    <Col span={12} style={{textAlign: 'left', paddingLeft: '10px'}}>
                        <Input placeholder="Input" onChange={event => setUserName(event.target.value)} defaultValue={userName} required />
                    </Col>
                </Row>
                <Row style={{ paddingBottom: '10px'}}>
                    <Col span={12} style={{textAlign: 'right'}}>
                        ชื่อ:
                    </Col>
                    <Col span={12} style={{textAlign: 'left', paddingLeft: '10px'}}>
                        <Input placeholder="Input" onChange={event =>setName(event.target.value) } defaultValue={name} />
                    </Col>
                </Row>
                <Row style={{ paddingBottom: '10px'}}>
                    <Col span={12} style={{textAlign: 'right'}}>
                        นามสกุล:
                    </Col>
                    <Col span={12} style={{textAlign: 'left', paddingLeft: '10px'}}>
                        <Input placeholder="Input" onChange={event => setLastName(event.target.value)} defaultValue={lastName} />
                    </Col>
                </Row>
                <Row style={{ paddingBottom: '10px'}}>
                    <Col span={12} style={{textAlign: 'right'}}>
                        รหัสผ่าน:
                    </Col>
                    <Col span={12} style={{textAlign: 'left', paddingLeft: '10px'}}>
                        <Input.Password placeholder="Input" onChange={event => setPassword(event.target.value)} defaultValue={password} required />
                    </Col>
                </Row>
                <Row style={{ paddingBottom: '10px'}}>
                    <Col span={12} style={{textAlign: 'right'}}>
                        ยืนยันรหัสผ่าน:
                    </Col>
                    <Col span={12} style={{textAlign: 'left', paddingLeft: '10px'}}>
                        <Input.Password placeholder="Input" onChange={event => setCPassword(event.target.value)} defaultValue={cPassword} required />
                    </Col>
                </Row>
                <Row style={{ paddingBottom: '10px'}}>
                    <Col span={12} style={{textAlign: 'right'}}>
                        อีเมล์:
                    </Col>
                    <Col span={12} style={{textAlign: 'left', paddingLeft: '10px'}}>
                        <Input placeholder="Input" onChange={event => setEmail(event.target.value)} defaultValue={email} required />
                    </Col>
                </Row>
                <Row style={{ paddingBottom: '10px'}}>
                    <Col span={12} style={{textAlign: 'right'}}>
                        เบอร์โทรศัพท์:
                    </Col>
                    <Col span={12} style={{textAlign: 'left', paddingLeft: '10px'}}>
                        <Input placeholder="Input" onChange={event => setTelephone(event.target.value)} defaultValue={telephone} />
                    </Col>
                </Row>
                <Row style={{ paddingBottom: '10px'}}>
                    <Col span={12} style={{textAlign: 'right'}}>
                        หมายเลขประจำตัว:
                    </Col>
                    <Col span={12} style={{textAlign: 'left', paddingLeft: '10px'}}>
                        <Input placeholder="Input" onChange={event => setUserIdentityNo(event.target.value)} defaultValue={userIdentityNo} />
                    </Col>
                </Row>
                <Row style={{ paddingBottom: '10px'}}>
                    <Col span={12} style={{textAlign: 'right'}}>
                        สถานะ:
                    </Col>
                    <Col span={12} style={{textAlign: 'left', paddingLeft: '10px'}}>
                        {/* <Input placeholder="Input" onChange={event => setStatus(event.target.value)} defaultValue={status} /> */}
                        <Select style={{width:'100%'}} placeholder="Please Select" onSelect={event => setStatus(event.target.value)} defaultValue={status}>
                            <Option value="0">ยกเลิกการใช้งาน</Option>
                            <Option value="1">ใช้งานระบบ</Option>
                        </Select>
                    </Col>
                </Row>
                <Row style={{ paddingBottom: '10px'}}>
                    <Col span={12} style={{textAlign: 'right'}}>
                        กลุ่มผู้ใช้งาน:
                    </Col>
                    <Col span={12} style={{textAlign: 'left', paddingLeft: '10px'}}>
                        {/* <Input placeholder="Input" onChange={event => setUserGroup(event.target.value)} defaultValue={userGroup} /> */}
                        {/* <Select style={{width:'100%'}} onSelect={event=>setUserGroup(event.target.value) } placeholder="Please Select" defaultValue={userGroup} aria-required="true" >
                            {userGroupData.map((data, index) =>
                                <Option key={index} value={data.id}>{data.group_name}</Option>
                            )}
                        </Select> */}
                    </Col>
                </Row>
                <Row style={{ paddingBottom: '10px'}}>
                    <Col span={12} style={{textAlign: 'right'}}>
                        หมายเหตุ:
                    </Col>
                    <Col span={12} style={{textAlign: 'left', paddingLeft: '10px'}}>
                        <Input placeholder="Input" onChange={event => setNote(event.target.value)} defaultValue={note} />
                    </Col>
                </Row>
            </Modal>

            <Modal title="แก้ไขข้อมูลผู้ใช้งาน" visible={isEditModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Row style={{ paddingBottom: '10px'}}>
                    <Col span={12} style={{textAlign: 'right'}}>
                        ชื่อผู้ใช้:
                    </Col>
                    <Col span={12} style={{textAlign: 'left', paddingLeft: '10px'}}>
                        <Input placeholder="Input" />
                    </Col>
                </Row>
                <Row style={{ paddingBottom: '10px'}}>
                    <Col span={12} style={{textAlign: 'right'}}>
                        ชื่อ:
                    </Col>
                    <Col span={12} style={{textAlign: 'left', paddingLeft: '10px'}}>
                        <Input placeholder="Input" />
                    </Col>
                </Row>
                <Row style={{ paddingBottom: '10px'}}>
                    <Col span={12} style={{textAlign: 'right'}}>
                        นามสกุล:
                    </Col>
                    <Col span={12} style={{textAlign: 'left', paddingLeft: '10px'}}>
                        <Input placeholder="Input" />
                    </Col>
                </Row>
                <Row style={{ paddingBottom: '10px'}}>
                    <Col span={12} style={{textAlign: 'right'}}>
                        รหัสผ่าน:
                    </Col>
                    <Col span={12} style={{textAlign: 'left', paddingLeft: '10px'}}>
                        <Input.Password placeholder="Input" />
                    </Col>
                </Row>
                <Row style={{ paddingBottom: '10px'}}>
                    <Col span={12} style={{textAlign: 'right'}}>
                        อีเมล์:
                    </Col>
                    <Col span={12} style={{textAlign: 'left', paddingLeft: '10px'}}>
                        <Input placeholder="Input" />
                    </Col>
                </Row>
                <Row style={{ paddingBottom: '10px'}}>
                    <Col span={12} style={{textAlign: 'right'}}>
                        เบอร์โทรศัพท์:
                    </Col>
                    <Col span={12} style={{textAlign: 'left', paddingLeft: '10px'}}>
                        <Input placeholder="Input" />
                    </Col>
                </Row>
                <Row style={{ paddingBottom: '10px'}}>
                    <Col span={12} style={{textAlign: 'right'}}>
                        หมายเลขประจำตัว:
                    </Col>
                    <Col span={12} style={{textAlign: 'left', paddingLeft: '10px'}}>
                        <Input placeholder="Input" />
                    </Col>
                </Row>
                <Row style={{ paddingBottom: '10px'}}>
                    <Col span={12} style={{textAlign: 'right'}}>
                        สถานะ:
                    </Col>
                    <Col span={12} style={{textAlign: 'left', paddingLeft: '10px'}}>
                        <Input placeholder="Input" />
                    </Col>
                </Row>
                <Row style={{ paddingBottom: '10px'}}>
                    <Col span={12} style={{textAlign: 'right'}}>
                        กลุ่มผู้ใช้งาน:
                    </Col>
                    <Col span={12} style={{textAlign: 'left', paddingLeft: '10px'}}>
                        <Input placeholder="Input" />
                    </Col>
                </Row>
                <Row style={{ paddingBottom: '10px'}}>
                    <Col span={12} style={{textAlign: 'right'}}>
                        หมายเหตุ:
                    </Col>
                    <Col span={12} style={{textAlign: 'left', paddingLeft: '10px'}}>
                        <Input placeholder="Input" />
                    </Col>
                </Row>
            </Modal>
        </Layout>
    )
}

function onChange(pagination, filters, sorter, extra) {
    console.log('tableParams >> ', pagination, filters, sorter, extra);
  }
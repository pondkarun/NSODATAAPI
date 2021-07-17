import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../components/Layouts';
import API from '../../util/Api';
import axios from 'axios';
import { notification, Col, Row, Popconfirm, message } from 'antd';
import { Cookies } from 'react-cookie';
import Head from 'next/head';
import { DeleteFilled } from '@ant-design/icons'
import { Getdatalist } from '../../service/API';
import { SET_DATALIST } from '../../redux/actions';
import Link from 'next/link'


export default function UserList() {
    const cookies = new Cookies();
    const dispatch = useDispatch();
    const { openid, keycloak } = useSelector(({ auth }) => auth);
    const datalist = useSelector(({ datalist }) => datalist);
    const oID = cookies.get('openid');
    console.log('getOpenIDCookies', oID);

    const [datasetData, setDatasetData] = useState([]);
    const [datasetDataResult, setDatasetDataResult] = useState([]);

    const [datasetDetailData, setDatasetDetailData] = useState([]);

    useEffect(async () => {
        Dataset();
        DatasetDetail();
        Getdatalists();
    }, []);



    const Dataset = () => {
        API.get(`${process.env.NEXT_PUBLIC_APIURL}/datalist/all`, {
            headers: {
                'Authorization': `Bearer ${oID.token}`
            },
        }).then((data) => {
            setDatasetData(data.data.data);
            setDatasetDataResult(data.data.data.result)
            console.log('datasetData', datasetData);
            console.log('datasetDataResult', datasetDataResult);
        }).catch((error) => {
            console.log('error :>> ', error);
        })
    }
    const Getdatalists = async () => {
        Getdatalist().then(({ data: { data } }) => {
            // console.log('data :>> ', data);
            dispatch(SET_DATALIST(data));
        }).catch((eror) => {
            console.log('eror :>> ', eror);
        })
    }
    const DatasetDetail = (datasetID) => {

        // console.log('DatasetDetail.ID >>', datasetID);
        // let serchlist = datalist?.result.filter((listall,index)=>listall.id === datasetID);
        // console.log('serchlist :>> ', serchlist);
        // setDatasetDetailData(serchlist[0]);
        API.get(`${process.env.NEXT_PUBLIC_APIURL}/datalist/getbyid/` + datasetID, {
            headers: {
                'Authorization': `Bearer ${oID.token}`
            },
        }).then((data) => {
            console.log('datasetDetailData >>', data.data.data[0]);
            setDatasetDetailData(data.data.data[0]);
            console.log('datasetDetailData', datasetDetailData);
        }).catch((error) => {
            console.log('error :>> ', error);
        })
    }
    const Delitemlist = (item) => {
        let cutdata = Array.isArray(datasetDetailData?.dataset) ? datasetDetailData?.dataset.filter((list) => list.id !== item.id) : [];
        console.log(cutdata);
        let cutid = [];
        cutdata.forEach((list) => {
            cutid.push({ id: list.id });
        })
        const formData = new FormData();
        if (cutid.length > 0) {
            cutid.forEach((list, index) => {
                formData.append(`dataset[${index}]`, JSON.stringify(list));
            })
        } else {
            formData.append(`dataset[0]`, 'empty');
        }
        axios.post(`${process.env.NEXT_PUBLIC_APIURL}/datalist/update/${datasetDetailData.id}`, formData, {
            headers: { "Content-Type": "multipart/form-data", 'Authorization': `Bearer ${openid ? openid.token : keycloak.token}` }
        }).then(({ data: { data } }) => {
            // console.log('data :>> ', data);
            Getdatalists();
            DatasetDetail(datasetDetailData.id);
            notification.open({
                message: <span style={{ color: "white" }}>ลบชุดข้อมูล<span style={{ color: "#F4D03F" }}>{item.title}</span>ออกจากรายการของคุณแล้ว</span>,
                style: { backgroundColor: "#44daff", }
            });
        }).catch((error) => {
            console.log('error :>> ', error);
        })
    }
    function confirm(id) {
        API.delete(`/datalist/delete/${id}`).then((data) => {
            console.log('data :>> ', data);
            Getdatalists();
            DatasetDetail(null);
            message.success('ลบรายการที่เลือกแล้ว');

        }).catch((eror) => {
            console.log('eror :>> ', eror);
            message.error('ลบรายการที่เลือกไม่สำเร็จ');
        })
    }

    function cancel(e) {
        console.log(e);
        message.error('ยกเลิกการลบแล้ว');
    }
    return (
        <>
            <Head>
                <title>รายการข้อมูลของคุณ</title>
            </Head>
            <Layout>
                <Row style={{ paddingTop: 20, paddingBottom: 15 }}>
                    <h2 style={{ color: "#046af0", fontWeight: "bold" }}>พบ {' '} {datalist?.count} {' '} ชุดข้อมูล</h2>
                </Row>
                <Row gutter={25}>
                    <Col span={10}>
                        <div style={{ backgroundColor: '#F9EAC9', borderRadius: 10, padding: 15 }}>
                            <Col style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 17 }}>
                                รายการชุดข้อมูลของฉัน
                            </Col>
                            <Col style={{ textAlign: 'left', paddingLeft: 10, backgroundColor: '#F9EAC9' }}>
                                {datalist?.result.map((text, index) => (
                                    <div className={`${datasetDetailData?.id === text.id && "listmeitem-active"} listmeitem`} key={index} style={{ fontSize: 15, cursor: "pointer", }} onClick={() => DatasetDetail(text.id)}>
                                        <span style={{ cursor: "pointer" }}>{text.dataset_list_name}</span>
                                        <span style={{ color: "#F4D03F" }}> ({text.count})</span>
                                        <Popconfirm
                                            title="คุณต้องการลบรายการนี้ใช่หรือไม่?"
                                            onConfirm={()=>confirm(text.id)}
                                            onCancel={cancel}
                                            okText="ใช่"
                                            cancelText={<p>ไม่</p>}
                                        >
                                            <span className="listmeitemdel" style={{ float: "right", cursor: "pointer", color: "red", }}>x</span>
                                        </Popconfirm>
                                    </div>
                                ))}
                            </Col>
                        </div>
                    </Col>
                    <Col span={14}>
                        <Row gutter={[15, 15]}>
                            <Col span={24}>
                                {Array.isArray(datasetDetailData?.dataset) ? datasetDetailData?.dataset?.map((text, index) => (
                                    <div key={index} className="listitemdel" style={{ position: "relative", display: "flex", width: "100%", backgroundColor: '#F9EAC9', fontSize: 15, marginBottom: 10, borderRadius: 10, overflow: 'hidden' }}>
                                        <div style={{ width: "100%", padding: 5, display: "flex", flexDirection: "column", justifyContent: "center", }}>
                                            <span style={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>
                                                <img src={text.organization.image_url} width="40" alt="" style={{ margin: "0 10px 0 0" }} />
                                                <Link href={`dataset?dataid=${text.id}`}>{text.title}</Link></span>
                                        </div>
                                        <div className="itemdel" style={{ position: "absolute", height: "100%", borderTopRightRadius: 10, borderBottomRightRadius: 10, width: "10%", backgroundColor: "#FF7B91", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                            <DeleteFilled onClick={() => Delitemlist(text)} style={{ fontSize: 30, color: "white" }} />
                                        </div>
                                    </div>
                                )) :
                                    <div style={{ textAlign: "center" }}>
                                        ไม่มีลิสรายการข้อมูล
                                    </div>
                                }
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Layout>
        </>

    )
}

import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import Layout from '../../components/Layouts';
import API from '../../util/Api';
import {Table, Col, Row} from 'antd';
import {Cookies} from 'react-cookie';
import Head from 'next/head';
import {DeleteFilled} from '@ant-design/icons'

export default function UserList(){

    const testData = [
        {
            "id": "92ce32f9-c1b4-4d06-9c70-54d899cbf1fa",
            "user_id": "0f16ff56-0547-49c5-aa7e-20741c7d4ca0",
            "dataset_list_name": "ข้อมูลของฉัน",
            "dataset": [
                {
                    "id": "98f9a1db-7847-4838-8d1e-6cc609d2d365"
                },
                {
                    "id": "df394221-774c-416f-872a-2363df462d99"
                },
                {
                    "id": "e9752fd8-d75b-4c21-aa28-d67da7c804bf"
                }
            ],
            "created_by": "0f16ff56-0547-49c5-aa7e-20741c7d4ca0",
            "created_date": "2021-06-20 12:58:53",
            "updated_by": "0f16ff56-0547-49c5-aa7e-20741c7d4ca0",
            "updated_date": "2021-06-28 16:23:22",
            "count": 3
        },
        {
            "id": "c2f8add4-60ab-438f-9636-6d3d4a31c921",
            "user_id": "0f16ff56-0547-49c5-aa7e-20741c7d4ca0",
            "dataset_list_name": "my play list 4",
            "dataset": [
                {
                    "id": "98f9a1db-7847-4838-8d1e-6cc609d2d365"
                },
                {
                    "id": "e9752fd8-d75b-4c21-aa28-d67da7c804bf"
                }
            ],
            "created_by": "0f16ff56-0547-49c5-aa7e-20741c7d4ca0",
            "created_date": "2021-06-20 13:34:05",
            "updated_by": null,
            "updated_date": null,
            "count": 2
        },
        {
            "id": "94af95c3-8dbf-4f44-88c1-ab3d8df80528",
            "user_id": "0f16ff56-0547-49c5-aa7e-20741c7d4ca0",
            "dataset_list_name": "my",
            "dataset": [
                {
                    "id": "98f9a1db-7847-4838-8d1e-6cc609d2d365"
                }
            ],
            "created_by": "0f16ff56-0547-49c5-aa7e-20741c7d4ca0",
            "created_date": "2021-06-28 10:58:10",
            "updated_by": null,
            "updated_date": null,
            "count": 1
        },
    ];

    useEffect(async () => {
        Dataset();
        DatasetDetail();
    },[]);

    const cookies = new Cookies();
    const {openid} = useSelector(({ auth }) => auth);
    const oID = cookies.get('openid');
    console.log('getOpenIDCookies', oID);

    const [datasetData, setDatasetData] = useState([]);
    const [datasetDataResult, setDatasetDataResult] = useState([]);

    const [datasetDetailData, setDatasetDetailData] = useState([]);

    const Dataset = () => {
        API.get(`${process.env.NEXT_PUBLIC_APIURL}/datalist/all`, {
            headers: {
                'Authorization': `Bearer ${oID.token}`
              },
        }).then((data) => {
            setDatasetData(data.data.data);
            setDatasetDataResult(data.data.data.result)
            console.log('datasetData',datasetData);
            console.log('datasetDataResult',datasetDataResult);
        }).catch((error) => {
            console.log('error :>> ', error);
        })
    }

    const DatasetDetail = (datasetID) => {

        console.log('DatasetDetail.ID >>', datasetID);

        API.get(`${process.env.NEXT_PUBLIC_APIURL}/datalist/getbyid/`+datasetID, {
            headers: {
                'Authorization': `Bearer ${oID.token}`
              },
        }).then((data) => {
            console.log('datasetDetailData >>', data.data.data[0].dataset);
            setDatasetDetailData(data.data.data[0].dataset);
            console.log('datasetDetailData',datasetDetailData);
        }).catch((error) => {
            console.log('error :>> ', error);
        })
    }


    return (
        <>
        <Head>
            <title>รายการข้อมูลของคุณ</title>
        </Head>
        <Layout>
            <Row style={{paddingTop:25, paddingBottom: 25}}>
            <h3>พบ {' '} {datasetData.count} {' '} ชุดข้อมูล</h3>
            </Row>
            <Row>
                <Col span={7} style={{backgroundColor: '#F9EAC9', height: 200}}>
                    <Col style={{textAlign: 'center', fontWeight: 'bold', fontSize: 17}}>
                            รายการข้อมูลของคุณ
                    </Col>
                    <Col style={{textAlign: 'left', paddingLeft: 10, backgroundColor: '#F9EAC9'}}>
                        {datasetDataResult.map((text, index) =>(
                            <div style={{paddingTop: 10, fontSize: 15,}} onClick = {() => DatasetDetail(text.id)}><a>{text.dataset_list_name}</a> ({text.count})</div>
                        ))}
                    </Col>
                </Col>
                <Col span={17}>
                    <Col style={{paddingLeft: 30}}>
                    {datasetDetailData.map((text,index) => (
                        // <div style={{ backgroundColor: '#F9EAC9', paddingLeft: 10, paddingBottom: 10, fontSize: 15, margin: 10}}
                        // onMouseEnter={e => {
                        //     alert('Mouse Hover');
                        // }}
                        // >{text.title} <DeleteFilled style={{fontSize:30}} /></div>
                        <div style={{ backgroundColor: '#F9EAC9', paddingLeft: 10, paddingBottom: 10, fontSize: 15, margin: 10}}>{text.title} <DeleteFilled style={{fontSize:30}} /></div>
                    ))}


                    </Col>
                </Col>
            </Row>
        </Layout>
        </>
    )
}

import React, { useEffect, useState, useRef, useLayoutEffect } from 'react'
import Layouts from '../../components/Layouts';
import API from '../../util/Api';
import { Tabs, Table, Button } from 'antd';
import { useRouter } from 'next/router';
import { DownloadOutlined } from '@ant-design/icons';


const { TabPane } = Tabs;
var Columndatadict = [
    {
        title: <b>ฟิลด์</b>,
        dataIndex: "id",
        key: "id",

    },
    {
        title: <b>ชนิดข้อมูล</b>,
        dataIndex: "type",
        key: "type",
    },
    {
        title: <b>รายละเอียด</b>,
        dataIndex: "detail",
        key: "detail",
    },
    {
        title: <b>Required</b>,
        dataIndex: "Required",
        key: "Required",
    },
    {
        title: <b>ตัวอย่างข้อมูล</b>,
        dataIndex: "test",
        key: "test",
    }
]

const Contens = () => {
    const router = useRouter()
    const { id } = router.query;
    const loadingpage = useRef(true);
    const [state, setState] = useState({});
    const [column, setColumn] = useState([]);
    const [row, setRow] = useState([]);
    const [columndt, setColumndt] = useState(Columndatadict);
    const [rowdt, setRowdt] = useState([]);
    useLayoutEffect(() => {
        if (loadingpage.current) {
            API.get(`/resource/by_id/${id}?option=full`).then(({ data }) => {
                setState(data);
            }).catch((error) => {
                console.log('error :>> ', error);
            })
            GetTabledataContens();
            GetTabledataDatadict();
        }
        return () => {
            loadingpage.current = false;
        }
    }, []);
    const GetTabledataContens = () => {
        API.get(`/data/content/${id}`).then(({ data }) => {
            console.log(data);
            let column = data.fields?.map((col, index) => {
                return {
                    title: <b>{col.id}</b>,
                    dataIndex: col.id,
                    key: index,
                }
            });
            setColumn(column);
            setRow(data.records);
        }).catch((error) => {
            console.log('error :>> ', error);
        })

    }
    const GetTabledataDatadict = () => {
        API.get(`/data/dict/${id}`).then(({ data }) => {
            console.log("dataditc", data);
            setRowdt(data);
        }).catch((error) => {
            console.log('error :>> ', error);
        })

    }

    return (
        <Layouts>
            <div style={{ padding: "10px 50px 50px" }}>
                <div style={{ display: 'flex' }}>
                    <div style={{ width: "80%" }}>
                        <h1 style={{ fontSize: "2rem" }}>{state.name}</h1>
                    </div>
                    <div style={{ width: "20%", marginTop: 10 }}>
                        <Button
                            type="primary"
                            icon={<DownloadOutlined />}
                            style={{ float: "right" }}
                            size="large"
                            onClick={()=>window.open(state.original_url,"_blank")}
                        >
                            ดาวน์โหลด
                        </Button>
                    </div>
                </div>
                <div>
                    <p>URL: <a>{state.original_url}</a></p>
                    <p>Dataset description: {state.description}</p>
                </div>
                <div className="card-container" style={{ marginTop: 50 }} >
                    <Tabs type="card">
                        <TabPane tab="Data Explorer" key="1">
                            <div>
                                <Table rowKey={(t, i) => i} bordered scroll={{ x: true }} columns={column} dataSource={row} />
                            </div>
                        </TabPane>
                        <TabPane tab="Data Dictionary" key="2">
                            <div>
                                <Table rowKey={(t, i) => i} bordered scroll={{ x: true }} columns={columndt} dataSource={rowdt} />
                            </div>
                        </TabPane>
                    </Tabs>
                </div>
            </div>

            <style jsx global>{`

            `}</style>
        </Layouts>
    )
}

export default Contens

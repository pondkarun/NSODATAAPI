import React, { useEffect, useState, useRef, useLayoutEffect } from 'react'
import Layouts from '../../components/Layouts';
import API from '../../util/Api';
import { Tabs, Table } from 'antd';
import { useRouter } from 'next/router';


const { TabPane } = Tabs;

const Contens = () => {
    const router = useRouter()
    const { id } = router.query;
    const loadingpage = useRef(true);
    const [state, setState] = useState({});
    const [column, setColumn] = useState([]);
    const [row, setRow] = useState([]);
    useLayoutEffect(() => {
        if (loadingpage.current) {

            API.get(`/resource/by_id/${id}?option=full`).then(({ data }) => {
                setState(data);
            }).catch((error) => {
                console.log('error :>> ', error);
            })
            GetTabledataContens();
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
                    title: col.id,
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

    return (
        <Layouts>
            <div style={{ padding: "10px 50px 50px" }}>
                <div style={{ display: 'flex' }}>
                    <div style={{ width: "50%" }}>
                        <h1 style={{fontSize:"2rem"}}>{state.name}</h1>
                    </div>
                    <div style={{ width: "50%" }}>
                    </div>
                </div>
                <div>
                    <p>URL: <a>{state.original_url}</a></p>
                    <p>{state.description}</p>
                </div>
                <div className="card-container" style={{ marginTop: 50 }} >
                    <Tabs type="card">
                        <TabPane tab="Data Explorer" key="1">
                            <div>
                                <Table rowKey={(t,i)=>i} bordered scroll={{ x: true }} columns={column} dataSource={row} />
                            </div>
                        </TabPane>
                        <TabPane tab="Data Dictionary" key="2">
                            <div className="module-content">
                                <h2>?????????????????????????????????????????????</h2>
                                <table className="table table-striped table-bordered table-condensed table-toggle-more" data-module="table-toggle-more">
                                    <thead>
                                        <tr>
                                            <th scope="col">???????????????</th>
                                            <th scope="col">?????????</th>
                                        </tr>
                                    </thead>
                                    <tbody><tr>
                                        <th scope="row">??????????????????????????????????????????</th>
                                        <td>CSV</td>
                                    </tr><tr>
                                            <th scope="row">?????????????????????????????????????????????????????????????????????</th>
                                            <td>
                                                <span property="dc:rights">License not specified</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">??????????????????????????????????????????????????????????????????????????????</th>
                                            <td />
                                        </tr>
                                        <tr>
                                            <th scope="row">????????????????????????????????????????????????????????????????????????</th>
                                            <td>2020</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">????????????????????????????????????????????????????????????????????????</th>
                                            <td>2020</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">?????????????????????????????????</th>
                                            <td><ul><li>?????????????????????????????????????????????????????????????????????????????????????????????????????????</li><li>???????????????</li></ul></td>
                                        </tr>
                                        <tr>
                                            <th scope="row" />
                                            <td>????????????????????????????????????</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">????????????????????????</th>
                                            <td>?????????, ?????????</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">?????????????????????????????????</th>
                                            <td>???????????????</td>
                                        </tr>
                                        <tr>
                                            <th scope="row" />
                                            <td />
                                        </tr>
                                        <tr>
                                            <th scope="row">??????????????????????????????????????????????????????????????????????????????</th>
                                            <td>
                                                31 ????????????????????? 2563
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">????????????????????????????????????????????????????????????????????????</th>
                                            <td>
                                                31 ????????????????????? 2563
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">?????????????????????????????????</th>
                                            <td>??????????????????</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">????????????????????????????????????????????????</th>
                                            <td>7 ???????????????????????? 2564</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">??????????????????????????????????????????????????????????????????????????????????????????</th>
                                            <td>7 ???????????????????????? 2564</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                        </TabPane>
                    </Tabs>
                </div>
            </div>

            <style jsx global>{`
            .table {
                width: 100%;
                max-width: 100%;
                margin-bottom: 20px;
            }
            .table-bordered {
                border: 1px solid #ddd;
            }
            th {
                text-align: left;
            }
            .table-bordered > thead > tr > th, .table-bordered > tbody > tr > th, .table-bordered > tfoot > tr > th, .table-bordered > thead > tr > td, .table-bordered > tbody > tr > td, .table-bordered > tfoot > tr > td {
                border: 1px solid #ddd;
            }
            .table > thead > tr > th, .table > tbody > tr > th, .table > tfoot > tr > th, .table > thead > tr > td, .table > tbody > tr > td, .table > tfoot > tr > td {
                padding: 8px;
                line-height: 1.42857143;
                vertical-align: top;
                border-top: 1px solid #ddd;
            }
            .table-striped tbody tr:nth-child(even) td, .table-striped tbody tr:nth-child(even) th {
                background-color: #f2f2f2;
            }
            `}</style>
        </Layouts>
    )
}

export default Contens

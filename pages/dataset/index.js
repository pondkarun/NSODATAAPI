import React, { useEffect, useState, useRef } from 'react'
import Layouts from '../../components/Layouts';
import { Row, Col, Button, Popover, Image, Tag, List, Avatar, notification, Typography, Checkbox, Input } from 'antd';
import { Getdatalist } from '../../service/API';
import API from '../../util/Api';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router';
import { SET_DATALIST } from '../../redux/actions';
import {
    DownloadOutlined,
    LinkOutlined,
    MonitorOutlined,
    HeartTwoTone,
    PlusOutlined,
    PlusSquareTwoTone
} from '@ant-design/icons';

const { Title } = Typography;

const checktype =["XLSX","XLS","CSV","JSON"]

const Dataset = () => {
    const router = useRouter()
    const dispatch = useDispatch();
    const { dataid } = router.query;
    const { keycloak, openid } = useSelector(({ auth }) => auth);
    const [data, setData] = useState({});
    const [drawmode, setDrawmode] = useState(false);
    const [count, setCount] = useState(0);
    const [inputname, setInputname] = useState("");
    const datalist = useSelector(({ datalist }) => datalist);

    useEffect(() => {
        CheckMelist()

    }, [datalist]);
    useEffect(() => {
        console.log(`dataid`, dataid)
        if (dataid) {
            Getdataid();
            CheckMelist();
        }
    }, [])
    const CheckMelist = () => {
        let count = 0;
        datalist?.result?.map((listname) => {
            listname.dataset?.some((list) => {
                if (list['id'] === dataid) {
                    count++;
                }
            });
        });
        console.log(`count`, count)
        setCount(count);

    }
    const Getdataid = () => {
        API.get(`/ckan/getbyid/${dataid}`).then(({ data: { data } }) => {
            console.log('data :>> ', data);
            setData(data);
            Getdatalists();
        }).catch((error) => {
            console.log('error :>> ', error);
        })
    }
    const Getdatalists = async () => {
        Getdatalist().then(({ data: { data } }) => {
            // console.log('data :>> ', data);
            dispatch(SET_DATALIST(data));
        }).catch((eror)=>{
            console.log('eror :>> ', eror);
        })
    }
    function copyToClipboard(text) {
        var dummy = document.createElement("textarea");
        document.body.appendChild(dummy);
        dummy.value = text;
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
        notification.open({
            message: <span style={{ color: "white" }}>Copy url success</span>,
            style: { backgroundColor: "#44daff", }
        });
    }
    const OnCheckItem = (e, data) => {
        // console.log('e,id :>> ', e, data);
        var namedata = data;
        console.log(namedata);

        if (e) {//ถ้าเช็ค
            let arr = Array.isArray(data.dataset) ? data?.dataset : [];
            arr.push({ id: dataid });
            const formData = new FormData();
            arr.forEach((list, index) => {
                formData.append(`dataset[${index}]`, JSON.stringify(list));
            })
            axios.post(`${process.env.NEXT_PUBLIC_APIURL}/datalist/update/${data.id}`, formData, {
                headers: { "Content-Type": "multipart/form-data", 'Authorization': `Bearer ${openid ? openid.token : keycloak.token}` }
            }).then(({ data: { data } }) => {
                // console.log('data :>> ', data);
                Getdatalists();
                notification.open({
                    message: <span style={{ color: "white" }}>เพิ่มเข้ารายการ<span style={{ color: "#F4D03F" }}>{namedata.dataset_list_name}</span>ของคุณแล้ว</span>,
                    style: { backgroundColor: "#44daff", }
                });
            }).catch((error) => {
                console.log('error :>> ', error);
            })
        } else {
            let cutdata = Array.isArray(data.dataset) ? data.dataset.filter((list) => list.id !== dataid) : [];
            const formData = new FormData();
            // formData.append("dataset", arr);
            cutdata.forEach((list, index) => {
                formData.append(`dataset[${index}]`, JSON.stringify(list));
            })
            axios.post(`${process.env.NEXT_PUBLIC_APIURL}/datalist/update/${data.id}`, formData, {
                headers: { "Content-Type": "multipart/form-data", 'Authorization': `Bearer ${openid ? openid.token : keycloak.token}` }
            }).then(({ data: { data } }) => {
                // console.log('data :>> ', data);
                Getdatalists();
                notification.open({
                    message: <span style={{ color: "white" }}>นำออกจากรายการ<span style={{ color: "#F4D03F" }}>{namedata.dataset_list_name}</span>ของคุณแล้ว</span>,
                    style: { backgroundColor: "#44daff", }
                });
            }).catch((error) => {
                console.log('error :>> ', error);
            })

        }


    }
    const OnCliskAdd = () => {
        API.post(`/datalist/add`, {
            dataset_list_name: inputname,
        }).then(({ data: { data } }) => {
            setInputname("");
            setDrawmode(false);
            Getdatalists();
            notification.open({
                message: <span style={{ color: "white" }}>เพิ่มลิสรายการใหม่สำเร็จ</span>,
                style: { backgroundColor: "#44daff", }
            });
        }).catch((error) => {
            console.log('error :>> ', error);
            notification.open({
                message: <span style={{ color: "white" }}>เพิ่มลิสรายการไม่สำเร็จ</span>,
                style: { backgroundColor: "#ff4454", }
            });
        })
    }
    const RenderDropdrawnmenu = () => {

        return (
            !drawmode ?
                <div>
                    <p style={{ color: "white", fontWeight: "bold" }}> เลือกชุดรายการที่ต้องการเพิ่ม</p>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        {datalist?.result?.map((data, index) =>
                            <Checkbox key={index} checked={data.dataset?.some(list => list['id'] === dataid)} onChange={(e) => OnCheckItem(e.target.checked, data)} ><span style={{ color: "#F4D03F" }}>{data.dataset_list_name}</span><span> ({data.count})</span></Checkbox>
                        )}
                    </div>
                    <div style={{ borderTop: "1px solid gray", marginTop: 5 }}>
                        <a onClick={() => setDrawmode(true)} style={{ fontSize: 13, color: "white" }}><PlusOutlined style={{ fontSize: "large" }} /> เพิ่มรายการใหม่ (New My List)</a>
                    </div>
                </div>
                :
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <p style={{ color: "white", fontWeight: "bold" }}>ตั้งชื่อรายการใหม่</p>
                    <Input value={inputname} onChange={(e) => setInputname(e.target.value)} style={{ maxWidth: "200px", borderRadius: "20px" }} placeholder="ตั้งชื่อรายการของคุณ" />
                    <div style={{ display: 'flex', justifyContent: "space-around", marginTop: 10 }}>
                        <Button onClick={OnCliskAdd} shape="round" style={{ backgroundColor: "yellow" }}>เพิ่ม</Button>
                        <Button danger type="primary" shape="round" onClick={() => setDrawmode(false)}>ยกเลิก</Button>
                    </div>
                </div>
        )
    }
    return (
        <Layouts>
            <div className="container">
                <div style={{ padding: 10, borderBottom: "1px solid" }}>
                    <Row gutter={15}>
                        <Col md={5} xs={24}>
                            <div style={{ borderRadius: "10px", backgroundColor: "#F9EAC9", display: 'flex', flexDirection: "column", justifyContent: "center", height: "100%", alignItems: "center" }}>
                                <Image
                                    width={150}
                                    src={data.organization?.image_url}
                                />
                            </div>
                        </Col>
                        <Col md={19} xs={24} style={{ display: 'flex', flexDirection: "column", justifyContent: "center" }} >
                            <h1 style={{ fontSize: "2rem" }}>{data.title}</h1>
                            <p>{data.notes}</p>
                            <p>Tags : {data.tags?.map((item, index) => <Tag key={index} color="#108ee9" style={{ borderRadius: 10 }}>{item.name}</Tag>)}</p>
                            {
                                openid && <Popover style={{ backgroundColor: "#272323" }} placement="bottom" content={
                                    RenderDropdrawnmenu
                                }>
                                    <Button type="text" style={{ color: "white", alignSelf: "flex-end", borderRadius: "20px", backgroundColor: `${count > 0 ? '#FF7B91' : '#108ee9'}` }}>{count < 1 ? <PlusSquareTwoTone style={{ fontSize: 20 }} /> : <HeartTwoTone twoToneColor="#eb2f96" style={{ fontSize: 20 }} />}เพิ่มเข้าไปในรายการของคุณ{count > 0 && 'แล้ว'}</Button>
                                </Popover>
                            }
                        </Col>
                    </Row>
                </div>
                <div>
                    <Row gutter={15}>
                        <Col md={14} xs={24}>
                            <h1 style={{ fontSize: "1.3rem", fontWeight: "bold" }}>คำอธิบายชุดข้อมูล</h1>
                            <div style={{ backgroundColor: "antiquewhite", padding: 30, borderRadius: 10 }}>
                                <List
                                    style={{ backgroundColor: "white" }}
                                    bordered
                                    header={<div style={{ display: "flex", flexDirection: "row" }}><div className="listitemstitle">ฟิลด์	</div><div className="listitemstitle">ค่า</div></div>}
                                >
                                    <List.Item>
                                        <div className="listitemstitle">* ประเภทชุดข้อมูล</div>
                                        <div className="listitems">{data.data_type}</div>
                                    </List.Item>
                                    <List.Item>
                                        <div className="listitemstitle">ยินยอมให้นำชื่อชุดข้อมูลไปใช้ที่ GD-Catalog	</div>
                                        <div className="listitems">-</div>
                                    </List.Item>
                                    <List.Item>
                                        <div className="listitemstitle">* ชื่อผู้ติดต่อ</div>
                                        <div className="listitems">{data.maintainer}</div>
                                    </List.Item>
                                    <List.Item>
                                        <div className="listitemstitle">* อีเมลผู้ติดต่อ</div>
                                        <div className="listitems">{data.maintainer_email}</div>
                                    </List.Item>
                                    <List.Item>
                                        <div className="listitemstitle">* วัตถุประสงค์</div>
                                        <div className="listitems" style={{ display: "flex", flexDirection: "column" }}>
                                            {data.objective?.map((item) =>
                                                <span>{item}</span>
                                            )}
                                        </div>
                                    </List.Item>
                                    <List.Item>
                                        <div className="listitemstitle">* หน่วยความถี่ของการปรับปรุงข้อมูล</div>
                                        <div className="listitems">{data.update_frequency_unit}</div>
                                    </List.Item>
                                    <List.Item>
                                        <div className="listitemstitle">ค่าความถี่ของการปรับปรุงข้อมูล (ความถี่น้อยที่สุด)</div>
                                        <div className="listitems">-</div>
                                    </List.Item>
                                    <List.Item>
                                        <div className="listitemstitle">* ขอบเขตเชิงภูมิศาสตร์หรือเชิงพื้นที่</div>
                                        <div className="listitems">{data.geo_coverage}</div>
                                    </List.Item>
                                    <List.Item>
                                        <div className="listitemstitle">* แหล่งที่มา</div>
                                        <div className="listitems">{data.data_source}</div>
                                    </List.Item>
                                    <List.Item>
                                        <div className="listitemstitle">* รูปแบบการเก็บข้อมูล</div>
                                        <div className="listitems" style={{ display: "flex", flexDirection: "column" }}>
                                            {data.data_format?.map((item) =>
                                                <span>{item}</span>
                                            )}</div>
                                    </List.Item>
                                    <List.Item>
                                        <div className="listitemstitle">* หมวดหมู่ข้อมูลตามธรรมาภิบาลข้อมูลภาครัฐ</div>
                                        <div className="listitems">{data.data_category}</div>
                                    </List.Item>
                                    <List.Item>
                                        <div className="listitemstitle">* สัญญาอนุญาตให้ใช้ข้อมูล</div>
                                        <div className="listitems">{data.license_title}</div>
                                    </List.Item>
                                    <List.Item>
                                        <div className="listitemstitle">เงื่อนไขในการเข้าถึงข้อมูล</div>
                                        <div className="listitems">-</div>
                                    </List.Item>
                                    <List.Item>
                                        <div className="listitemstitle">URL ข้อมูลเพิ่มเติม</div>
                                        <div className="listitems">{data.url}</div>
                                    </List.Item>
                                    <List.Item>
                                        <div className="listitemstitle">ภาษาที่ใช้</div>
                                        <div className="listitems" style={{ display: "flex", flexDirection: "column" }}>
                                            {data.data_language?.map((item) =>
                                                <span>{item}</span>
                                            )}
                                        </div>
                                    </List.Item>
                                    <List.Item>
                                        <div className="listitemstitle">วันที่ปรับปรุงข้อมูลล่าสุด</div>
                                        <div className="listitems">-</div>
                                    </List.Item>
                                    <List.Item>
                                        <div className="listitemstitle">วันที่กำหนดเผยแพร่ข้อมูล</div>
                                        <div className="listitems">-</div>
                                    </List.Item>
                                    <List.Item>
                                        <div className="listitemstitle">ปีข้อมูลที่เริ่มต้นจัดทำ (สำหรับชุดข้อมูลสถิติ)</div>
                                        <div className="listitems">{data.first_year_of_data}</div>
                                    </List.Item>
                                    <List.Item>
                                        <div className="listitemstitle">ปีข้อมูลล่าสุดที่เผยแพร่ (สำหรับชุดข้อมูลสถิติ)</div>
                                        <div className="listitems">{data.last_year_of_data}</div>
                                    </List.Item>
                                    <List.Item>
                                        <div className="listitemstitle">การจัดจำแนก (สำหรับชุดข้อมูลสถิติ)</div>
                                        <div className="listitems">xxx</div>
                                    </List.Item>
                                    <List.Item>
                                        <div className="listitemstitle">หน่วยวัด (สำหรับชุดข้อมูลสถิติ)</div>
                                        <div className="listitems">{data.unit_of_measure}</div>
                                    </List.Item>
                                    <List.Item>
                                        <div className="listitemstitle">หน่วยตัวคูณ (สำหรับชุดข้อมูลสถิติ)</div>
                                        <div className="listitems">{data.unit_of_multiplier}</div>
                                    </List.Item>
                                    <List.Item>
                                        <div className="listitemstitle">วิธีการคำนวณ (สำหรับชุดข้อมูลสถิติ)</div>
                                        <div className="listitems">-</div>
                                    </List.Item>
                                    <List.Item>
                                        <div className="listitemstitle">มาตรฐานการจัดทำข้อมูล (สำหรับชุดข้อมูลสถิติ)</div>
                                        <div className="listitems">-</div>
                                    </List.Item>
                                    <List.Item>
                                        <div className="listitemstitle">สถิติทางการ</div>
                                        <div className="listitems">-</div>
                                    </List.Item>
                                    <List.Item>
                                        <div className="listitemstitle">สร้างในระบบเมื่อ</div>
                                        <div className="listitems">{new Date(data.harvesting_metadata_modified).toLocaleDateString('th-TH', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}</div>
                                    </List.Item>
                                    <List.Item>
                                        <div className="listitemstitle">ปรับปรุงครั้งล่าสุดในระบบเมื่อ</div>
                                        <div className="listitems">{new Date(data.metadata_modified).toLocaleDateString('th-TH', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}</div>
                                    </List.Item>

                                </List>
                            </div>

                        </Col>
                        <Col md={10} xs={24}>
                            <h1 style={{ fontSize: "1.3rem", fontWeight: "bold" }}>ข้อมูล</h1>
                            <div style={{ backgroundColor: "antiquewhite", borderRadius: 10, padding: 30, overflow: "hidden" }}>
                                <List
                                    dataSource={data.resources}
                                    renderItem={item => (
                                        <List.Item key={item.id}
                                            actions={[
                                                checktype.some((type)=>type == item.format)&& <Avatar icon={<DownloadOutlined onClick={() => window.open(item.original_url)} />} />,
                                                item.url && <Avatar icon={<LinkOutlined onClick={() => copyToClipboard(item.url)} />} />,
                                                item.original_url && <Avatar icon={<MonitorOutlined onClick={() => window.open(item.url)} />} />,
                                            ]}
                                        >
                                            <List.Item.Meta
                                                avatar={
                                                    <Image preview={false} src={`/img/${item.format ? item.format : "url"}.png`} width={60} />
                                                }
                                                title={<h3 title={item.name} style={{ fontWeight: "bold", fontSize: 14, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{item.name}</h3>}
                                                description={<a href={item.url} target="_blank" ><h5 style={{ color: "blue", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{item.url}</h5></a>}
                                            />

                                        </List.Item>
                                    )}
                                />
                            </div>

                        </Col>
                    </Row>
                </div>
            </div>

            <style jsx global>{`
            .ant-list-bordered .ant-list-header {
                padding-right: 24px;
                padding-left: 24px;
                background-color: #FBF4EF;
            }
            .listitemstitle{
                width: 50%;
                min-width: 100px;
                font-weight: bold;
            }
            .listitems{
                width: 50%;
                min-width: 100px;
            }
            .ant-list-split .ant-list-item {
                border-bottom: 1px solid #555555;
            }
            .ant-popover-title,.ant-popover-inner{
                margin-top:-10px;
                background-color: #3D3D3D;
                border-radius:5px;
            }
            .ant-popover-arrow{
                width: 0;
                height: 0;
                border-width: 0;
            }
            .ant-list-split .ant-list-item:last-child {
                border-bottom: 0.5px solid !important;
            }
            .ant-list-item-action {
                margin-left: 0px;
            }
            .ant-avatar.ant-avatar-icon:hover {
                font-size: 18px;
                background-color: #108ee9;
            }
            `}</style>
        </Layouts>
    )
}

export default Dataset

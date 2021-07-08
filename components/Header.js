import React, { useEffect, useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import Head from 'next/head';
import Link from 'next/link';
import API from '../util/Api';
import Axios from 'axios'
import { useRouter } from 'next/router'
import { Avatar, Input, Row, Col, Switch, Checkbox } from 'antd';
import {
  SettingFilled,
  CloseOutlined
} from '@ant-design/icons';



export default function Header({ serch, onserch, dataserch }) {
  const dispatch = useDispatch();
  const router = useRouter()
  const [opensetting, setOpensetting] = useState(false);
  const [checkpoperty, setCheckpoperty] = useState(null);
  const [swicht, setSwicht] = useState({
    s1: false,
    s2: false,
    s3: false,
    s4: false,
    s5: false,
    s6: false,
  });
  const { tags, data_type, groups, license_id, ministry, organization, res_format } = router.query;
  // useEffect(async () => {
  //   // checkpoperty && onserch(true,)
  //   // console.log('checkpoperty :>> ', JSON.stringify(checkpoperty).replace(/"/g, "").replace(/{/g, "").replace(/}/g, "").replace(/,/g, "+"));
  //   let fqserch = JSON.stringify(checkpoperty).replace(/"/g, "").replace(/{/g, "").replace(/}/g, "").replace(/,/g, "+");
  //   // console.log('fqserch :>> ', fqserch);
  //   checkpoperty && onserch(true, fqserch);
  //   console.log('path :>> ', router.query);

  // }, [checkpoperty]);


  const onCheckbox = (key, value) => {
    if (value === false) {
      let cutquery = router.query;
      delete cutquery[key];
      router.push({
        pathname: '/',
        query: { ...cutquery },
      })
      // setCheckpoperty({ ...checkpoperty });
    } else {
      // setCheckpoperty({ ...checkpoperty, [key]: value });
      if (key == "tags") {
        var checktags = router.query.tags;

        if (Array.isArray(checktags)) {
          if (checktags.indexOf(value) != -1) {
            checktags = checktags.filter((i) => i !== value);
          } else {
            checktags.push(value);
          }
        } else {
          if (checktags == value) {
            checktags = undefined;
          } else {
            console.log('checktags :>> ', checktags);
            checktags = [checktags];
            checktags.push(value);
          }
        }
      }

      router.push({
        pathname: '/',
        query: { ...router.query, [key]: key == "tags" ? checktags : [value] }, // router.query.tags ? Array.isArray(router.query.tags) ? [...router.query.tags, value] : [router.query.tags, value] : [value]
      })
    }
  }


  return (
    <>
      {/* <div className={styles.container}> */}
      <Head>
        <title>หน้าหลัก</title>
        <meta name="description" content="หน้าหลัก" />
        <link rel="icon" href="/favicon.ico" />

      </Head>

      <div style={{ backgroundColor: '#F4D03F', borderBottomLeftRadius: 50, borderBottomRightRadius: 50, }}>
        <Row style={{ padding: "20px" }} >
          <Col xs={24} sm={24} md={6}>
            <div style={{ textAlign: "center" }}>
              <Link href="/">
                <a>
                <Avatar size={150} src={<img src={"https://gdcatalog.go.th/assets/images/gdcatalog_logo/gdcatalog.png"} style={{ objectFit: "contain", backgroundColor: "#FFF", }} />} />
                </a>
              </Link>
            </div>
          </Col>
          <Col xs={24} sm={24} md={12} >
            <div style={{ display: "block", textAlign: 'center', fontSize: 27, fontWeight: 'bolder', }}>
              บริการนามานุกรมบัญชีข้อมูลภาครัฐ
              <br />
              (GD Catalog Directory Service)
              <br />
              <div style={{ textAlign: 'center', marginTop: "25px", display: "flex", flexDirection: "row" }}>
                <Input.Search placeholder="พิมพ์ชื่อข้อมูลที่ต้องการค้นหา..." style={{ border: "4px solid white", borderRadius: "20px", }}
                  // onChange={(e) => serch(e.target.value)}
                  onSearch={(value) => router.push({
                    pathname: '/',
                    query: { ...router.query, q: value },
                  })} />
                <SettingFilled style={{ margin: "5px 20px", color: "#2980B9" }} onClick={() => setOpensetting(!opensetting)} />
              </div>
            </div>
            <div style={{ width: "100%", height: `${opensetting ? "auto" : "0%"}`, backgroundColor: "rgb(61 61 61 / 95%)", position: "absolute", zIndex: 99, borderRadius: "20px", transition: "2s", overflow: "hidden" }}>
              <div style={{ padding: "10px", backgroundColor: "#F4D03F", borderBottomRightRadius: "10px", borderBottomLeftRadius: "10px", display: "flex", justifyContent: "space-between" }}>
                <SettingFilled style={{ margin: "5px 20px", color: "#2980B9", fontSize: "25px" }} />
                <span style={{ fontSize: "20px", fontWeight: "bold", color: "#2980B9" }}>ตัวกรองค้นหาข้อมูล</span>
                <CloseOutlined style={{ margin: "5px 20px", color: "#2980B9", fontSize: "25px" }} onClick={() => setOpensetting(!opensetting)} />
              </div>
              {dataserch ?
                <div style={{ padding: "10px" }}>

                  {!Array.isArray(dataserch.facets?.data_type) &&
                    <>
                      <span style={{ color: "white" }}>ประเภทข้อมูล </span><Switch checked={swicht.s1} onChange={(e) => setSwicht({ ...swicht, s1: e })} /> <br />
                      {swicht.s1 &&
                        <div style={{ padding: "10px" }}>
                          {dataserch.search_facets?.data_type.items.map((list, index) =>
                            <Checkbox key={index} checked={data_type && data_type == list.name ? true : false}
                              onChange={(e) => onCheckbox("data_type", e.target.checked && list.name)} >{list.display_name}</Checkbox>
                          )}
                        </div>
                      }
                    </>
                  }
                  {!Array.isArray(dataserch.facets?.groups) &&
                    <>
                      <span style={{ color: "white" }}>กลุ่ม </span><Switch checked={swicht.s2} onChange={(e) => setSwicht({ ...swicht, s2: e })} /> <br />
                      {swicht.s2 &&
                        <div style={{ padding: "10px" }}>
                          {dataserch.search_facets?.groups.items.map((list, index) =>
                            <Checkbox key={index} checked={groups && groups == list.name ? true : false}
                              onChange={(e) => onCheckbox("groups", e.target.checked && list.name)}>{list.display_name}</Checkbox>
                          )}
                        </div>
                      }
                    </>
                  }
                  {!Array.isArray(dataserch.facets?.license_id) &&
                    <>
                      <span style={{ color: "white" }}>สัญญาอนุญาต </span><Switch checked={swicht.s3} onChange={(e) => setSwicht({ ...swicht, s3: e })} /> <br />
                      {swicht.s3 &&
                        <div style={{ padding: "10px" }}>
                          {dataserch.search_facets?.license_id.items.map((list, index) =>
                            <Checkbox key={index} checked={license_id && license_id == list.name ? true : false}
                              onChange={(e) => onCheckbox("license_id", e.target.checked && list.name)}>{list.display_name}</Checkbox>
                          )}
                        </div>
                      }
                    </>
                  }
                  {!Array.isArray(dataserch.facets?.tags) &&
                    <>
                      <span style={{ color: "white" }}>แท็ค </span><Switch checked={swicht.s4} onChange={(e) => setSwicht({ ...swicht, s4: e })} /> <br />
                      {swicht.s4 &&
                        <div style={{ padding: "10px" }}>
                          {dataserch.search_facets?.tags.items.map((list, index) =>
                            <Checkbox key={index} checked={tags && tags.indexOf(list.name) != -1 ? true : false}
                              onChange={(e) => onCheckbox("tags", list.name)}>{list.display_name}</Checkbox>
                          )}
                        </div>
                      }
                    </>
                  }
                  {!Array.isArray(dataserch.facets?.ministry) &&
                    <>
                      <span style={{ color: "white" }}>กระทรวง </span><Switch checked={swicht.s5} onChange={(e) => setSwicht({ ...swicht, s5: e })} /> <br />
                      {swicht.s5 &&
                        <div style={{ padding: "10px" }}>
                          {dataserch.search_facets?.ministry.items.map((list, index) =>
                            <Checkbox key={index} checked={ministry && ministry == list.name ? true : false}
                              onChange={(e) => onCheckbox("ministry", e.target.checked && list.name)}
                            >{list.display_name}</Checkbox>
                          )}
                        </div>
                      }
                    </>
                  }
                  {!Array.isArray(dataserch.facets?.organization) &&
                    <>
                      <span style={{ color: "white" }}>องค์กร </span><Switch checked={swicht.s6} onChange={(e) => setSwicht({ ...swicht, s6: e })} /> <br />
                      {swicht.s6 &&
                        <div style={{ padding: "10px" }}>
                          {dataserch.search_facets?.organization.items.map((list, index) =>
                            <Checkbox key={index} checked={organization && organization == list.name ? true : false}
                              onChange={(e) => onCheckbox("organization", e.target.checked && list.name)}
                            >{list.display_name}</Checkbox>
                          )}
                        </div>
                      }
                    </>
                  }
                  {!Array.isArray(dataserch.facets?.res_format) &&
                    <>
                      <span style={{ color: "white" }}>รูปแบบ </span><Switch checked={swicht.s7} onChange={(e) => setSwicht({ ...swicht, s7: e })} /> <br />
                      {swicht.s7 &&
                        <div style={{ padding: "10px" }}>
                          {dataserch.search_facets?.res_format.items.map((list, index) =>
                            <Checkbox key={index} checked={res_format && res_format == list.name ? true : false}
                              onChange={(e) => onCheckbox("res_format", e.target.checked && list.name)}
                            >{list.display_name}</Checkbox>
                          )}
                        </div>
                      }
                    </>
                  }


                </div>
                :
                <div style={{textAlign:"center",padding:"30px",color:"white"}}>
                  ยังไม่พบข้อมูล....
                </div>
              }
            </div>
          </Col>
          <Col xs={24} sm={24} md={6}>

          </Col>
        </Row>

      </div>
      <style jsx global>
        {`
        .ant-input-group .ant-input {
          float: left;
        width: 100%;
        margin-bottom: 0;
        text-align: inherit;
        border-radius: 20px;
        }
        .ant-input-search-button {
            height: 32px;
            border-radius: 20px !important;
            border: none;
            background-color:#2980B9;
        }

        .ant-input-group-addon {
              border-radius: 20px;
              border: none;
              background-color:#2980B9;

          }
          .ant-input-search-button:hover, .ant-input-search-button:focus {
          z-index: 1;
          background-color:#2980B9;
        }
        .ant-switch-checked {
            background-color: #18ff4a;
        }
        .ant-checkbox + span {
            color: aliceblue;
            padding-right: 8px;
            padding-left: 8px;
        }
        .ant-checkbox-wrapper + .ant-checkbox-wrapper {
          margin-left: 0px;
        }
        `}
      </style>
    </>
  )
}

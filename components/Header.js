import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Home.module.scss';
import Grid from '@material-ui/core/Grid';
import SearchButton from '@material-ui/icons/SearchOutlined';
import TextField from '@material-ui/core/TextField';
import API from '../util/Api';
import Axios from 'axios'
import { Avatar, Input, Row, Col, Switch, Checkbox } from 'antd';
import {
  SettingFilled,
  CloseOutlined
} from '@ant-design/icons';



export default function Header({ serch, onserch, dataserch }) {
  const dispatch = useDispatch();
  const [opensetting, setOpensetting] = useState(false);
  const [checkpoperty, setCheckpoperty] = useState(null);
  const [swicht, setSwicht] = useState({
    s1:false,
    s2:false,
    s3:false,
    s4:false,
    s5:false,
    s6:false,
  });
  useEffect(async () => {
    // checkpoperty && onserch(true,)
    console.log('checkpoperty :>> ', JSON.stringify(checkpoperty).replace(/"/g, "").replace(/{/g, "").replace(/}/g, "").replace(/,/g, "+"));
    let fqserch = JSON.stringify(checkpoperty).replace(/"/g, "").replace(/{/g, "").replace(/}/g, "").replace(/,/g, "+");
    checkpoperty && onserch(true, fqserch);

  }, [checkpoperty]);


  const onCheckbox = (key, value) => {
    setCheckpoperty({ ...checkpoperty, [key]: value });
  }
  const GetDataKeyCloak = () => {
    API.get('/services/v1/api/user/mydata').then((data) => {
      console.log(`data`, data)
    }).catch((error) => {
      console.log('error :>> ', error);
    })
    // Axios({
    //   url:'http://dookdik2021.ddns.net/services/v1/api/user/mydata',
    //   headers:{
    //     Authorization:'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI1IiwianRpIjoiYjU2ZjlhM2Q1OTcyZTNmMzUyZGUwMjZkZDM4M2JjMTNkODFhYmNkODBkMDhlM2M5ODhjM2YzNDJhMzRkMjExODY5ZDUxYzk0NjYzMzc2Y2QiLCJpYXQiOjE2MjM5NTc0MDUuMDU2OTI4LCJuYmYiOjE2MjM5NTc0MDUuMDU2OTMyLCJleHAiOjE2MjQwNDM4MDQuODAwMzgxLCJzdWIiOiJlMDkwYzc1Ny00OTk4LTQ5NGUtOGNlNi1kYjVjMzliODBlMzIiLCJzY29wZXMiOltdfQ.Eoj_6aegdfpN4RuXjhi7dsVlKTCcrn7KPyIKBOCZBhNad3lHtli_aHagYlpmK9isI3JEFRhjD8l-91vBLPB38Le8O7rbPdNdHRtxqp5as8oDjbB0CS6eyG009szHnteoZI5EHK8zPWFR7WsvvAC3F_Tj7IwmmerU_mHiKmXKlJDKXZj4QWbJISx8Jy9jwHtm-9nhOLEA6avM3jwniXIe9cl5oJPXll8YZ4IQCZ0WqsOJ3lrbRz2MI8tw4r18EhV2q0mbZXV48aq4MOmGd40nvA2ZgpdpjUDYlcO9iWIM_bG4vJVKtyiQO3NK1QnaXX2qaraAGCwM2n_tmf4o9AonaK-gGaI5i6jCsKyYTwEftSmGYAugJiM8g3wyXjMza1fHWR57FIW_3PJKOUvBcHgETsr0b0Y9vMWupkIHKfGlQhj1QSKUlnC5O3ydau2WsbJtcA1xP3l83n5eggj2K3NOjJ0KnUOBlFVCfRT4Nii2dX3Ga33z-Na8Nz6Rh9L0YdVrjZ59_6-FKnnKjVFAR6O5xyriZWpqCS9_uQ0k-wDQhVXc1Roo1LZiUEbJDNE278POsktns-j-0mW2vqlWwdyC7017eV8T90HQg9TPAJBQIK_RcWzdh9Zxmk0s_yc_dG45oti_TGeTLo5jZPq9g2x4zvq47GF7tFJhDig0j4oHfB4'
    //   }
    // }).then((data)=>{
    //   console.log('data :>> ', data);
    // }).catch((eror)=>{
    //   console.log('eror :>> ', eror);
    // })
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
              <Avatar size={150} src={<img src={"/img/logo.png"} style={{ objectFit: "contain", backgroundColor: "#FFF", }} />} />
            </div>
          </Col>
          <Col xs={24} sm={24} md={12} >
            <div style={{ display: "block", textAlign: 'center', fontSize: 27, fontWeight: 'bolder', }}>
              ระบบนามานุกรมข้อมูลภาครัฐ
              <br />
              (Goverment Directory Service)
              <br />
              <div style={{ textAlign: 'center', marginTop: "25px", display: "flex", flexDirection: "row" }}>
                <Input.Search placeholder="พิมพ์ชื่อข้อมูลที่ต้องการค้นหา..." style={{ border: "4px solid white", borderRadius: "20px", }} onChange={(e) => serch(e.target.value)} onSearch={() => onserch(true)} />
                <SettingFilled style={{ margin: "5px 20px", color: "#2980B9" }} onClick={() => setOpensetting(!opensetting)} />
              </div>
            </div>
            <div style={{ width: "100%", height: `${opensetting ? "auto" : "0%"}`, backgroundColor: "#3D3D3D", position: "absolute", zIndex: 99, borderRadius: "20px", transition: "2s", overflow: "hidden" }}>
              <div style={{ padding: "10px", backgroundColor: "#F4D03F", borderBottomRightRadius: "10px", borderBottomLeftRadius: "10px", display: "flex", justifyContent: "space-between" }}>
                <SettingFilled style={{ margin: "5px 20px", color: "#2980B9", fontSize: "25px" }} />
                <span style={{ fontSize: "20px", fontWeight: "bold", color: "#2980B9" }}>ตัวกรองค้นหาข้อมูล</span>
                <CloseOutlined style={{ margin: "5px 20px", color: "#2980B9", fontSize: "25px" }} onClick={() => setOpensetting(!opensetting)} />
              </div>
              <div style={{ padding: "10px" }}>

                {!Array.isArray(dataserch.facets?.data_type) &&
                  <>
                    <span style={{ color: "white" }}>ประเภทข้อมูล </span><Switch checked={swicht.s1} onChange={(e)=>setSwicht({...swicht,s1:e})} /> <br />
                    {swicht.s1 &&
                    <div style={{ padding: "10px" }}>
                      {dataserch.search_facets?.data_type.items.map((list, index) =>
                        <Checkbox key={index} onChange={(e) => onCheckbox("data_type", e.target.checked && list.display_name)} >{list.display_name}</Checkbox>
                      )}
                    </div>
                    }
                  </>
                }
                {!Array.isArray(dataserch.facets?.groups) &&
                  <>
                    <span style={{ color: "white" }}>กลุ่ม </span><Switch checked={swicht.s2} onChange={(e)=>setSwicht({...swicht,s2:e})} /> <br />
                    {swicht.s2 &&
                    <div style={{ padding: "10px" }}>
                      {dataserch.search_facets?.groups.items.map((list, index) =>
                        <Checkbox key={index} onChange={(e) => onCheckbox("groups", e.target.checked && list.display_name)}>{list.display_name}</Checkbox>
                      )}
                    </div>
                    }
                  </>
                }
                {!Array.isArray(dataserch.facets?.license_id) &&
                  <>
                    <span style={{ color: "white" }}>สัญญาอนุญาต </span><Switch checked={swicht.s3} onChange={(e)=>setSwicht({...swicht,s3:e})} /> <br />
                    {swicht.s3 &&
                    <div style={{ padding: "10px" }}>
                      {dataserch.search_facets?.license_id.items.map((list, index) =>
                        <Checkbox key={index} onChange={(e) => onCheckbox("license_id", e.target.checked && list.display_name)}>{list.display_name}</Checkbox>
                      )}
                    </div>
                    }
                  </>
                }
                {!Array.isArray(dataserch.facets?.tags) &&
                  <>
                    <span style={{ color: "white" }}>แท็ค </span><Switch checked={swicht.s4} onChange={(e)=>setSwicht({...swicht,s4:e})} /> <br />
                    {swicht.s4 &&
                    <div style={{ padding: "10px" }}>
                      {dataserch.search_facets?.tags.items.map((list, index) =>
                        <Checkbox key={index} onChange={(e) => onCheckbox("tags", e.target.checked && list.display_name)}>{list.display_name}</Checkbox>
                      )}
                    </div>
                    }
                  </>
                }
                {!Array.isArray(dataserch.facets?.ministry) &&
                  <>
                    <span style={{ color: "white" }}>กระทรวง </span><Switch checked={swicht.s5} onChange={(e)=>setSwicht({...swicht,s5:e})} /> <br />
                    {swicht.s5 &&
                    <div style={{ padding: "10px" }}>
                      {dataserch.search_facets?.ministry.items.map((list, index) =>
                        <Checkbox key={index}>{list.display_name}</Checkbox>
                      )}
                    </div>
                    }
                  </>
                }
                {!Array.isArray(dataserch.facets?.organization) &&
                  <>
                    <span style={{ color: "white" }}>องค์กร </span><Switch checked={swicht.s6} onChange={(e)=>setSwicht({...swicht,s6:e})} /> <br />
                    {swicht.s6 &&
                    <div style={{ padding: "10px" }}>
                      {dataserch.search_facets?.organization.items.map((list, index) =>
                        <Checkbox key={index}>{list.display_name}</Checkbox>
                      )}
                    </div>
                    }
                  </>
                }
                {!Array.isArray(dataserch.facets?.res_format) &&
                  <>
                    <span style={{ color: "white" }}>รูปแบบ </span><Switch checked={swicht.s7} onChange={(e)=>setSwicht({...swicht,s7:e})} /> <br />
                    {swicht.s7 &&
                    <div style={{ padding: "10px" }}>
                      {dataserch.search_facets?.res_format.items.map((list, index) =>
                        <Checkbox key={index}>{list.display_name}</Checkbox>
                      )}
                    </div>
                    }
                  </>
                }


              </div>
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

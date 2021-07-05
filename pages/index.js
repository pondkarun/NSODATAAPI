import React, { useEffect, useState, useLayoutEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Head from 'next/head';
import { Cookies } from 'react-cookie'
import Link from 'next/link';
import Layout from '../components/Layouts';
import API from '../util/Api';
import Axios from 'axios'
import { SET_OPENID } from '../redux/actions'
import Cardbox from '../components/Cardbox'
import { Row, Col, Button, Dropdown, Radio, Space, Menu } from 'antd';
import {
  BarsOutlined,
  InsertRowLeftOutlined,
  AppstoreFilled
} from '@ant-design/icons';
import { useRouter } from 'next/router'



export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter()
  const { id, user_name, e_mail, status, last_login, login_status, token, token_date, created_by, created_date, updated_by, updated_date, open_id } = router.query;
  const { tags, data_type, groups, license_id, ministry, organization, res_format, q, sort } = router.query;
  const cookies = new Cookies();
  const { keycloak, openid } = useSelector(({ auth }) => auth);
  const [modeshow, setModeshow] = useState(true);
  const [ckanData, setCkandata] = useState([]);
  const [rawdata, setRawdata] = useState({});
  const [serch, setSerch] = useState("");
  const firstUpdate = useRef(true);


  function stringify(obj) {
    let objString = '';
    // We add the opening curly brace
    objString += '{';
    for (const key in obj) {
      const value = obj[key];
      if (value) {
        objString += `${key}:`;

        if (typeof obj[key] === 'object') {
          objString += `${stringify(value)}`;
        } else if (typeof value === 'string') {
          if (key == "tags") {
            objString += `${value}`;
          } else {
            objString += `"${value}"`;
          }
        } else if (typeof obj[key] === 'number') {
          objString += `${value}`;
        }
      }

      // We add the comma
      objString += `,`;
    }
    // We add the closing curly brace
    objString += '}';
    return objString;
  }
  const changemode = () => {
    let mode1 = {
      xs: { span: 24 },
      sm: { span: 12 },
      md: { span: 6 },
      lg: { span: 4 }
    }
    let mode2 = {
      xs: { span: 24 },
      sm: { span: 12 },
      md: { span: 8 },
      lg: { span: 8 }
    }
    if (modeshow) {
      return mode1
    } else {
      return mode2
    }

  }


  useLayoutEffect(() => {
    // let qy = { tags, data_type, groups, license_id, ministry, organization, res_format };
    //  console.log( JSON.stringify({...qy,tags:tags?.toString()}).replace(/"/g, "").replace(/{/g, "").replace(/}/g, "").replace(/,/g, "+"));
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    GetDataCKan(true);
  }, [tags, data_type, groups, license_id, ministry, organization, res_format, q, sort]);

  useEffect(async () => {
    // console.log('tokenopenid :>> ', token);
    if (token) {
      cookies.set('openid', { id, user_name, e_mail, status, last_login, login_status, token, token_date, created_by, created_date, updated_by, updated_date, open_id });
      dispatch(SET_OPENID({ id, user_name, e_mail, status, last_login, login_status, token, token_date, created_by, created_date, updated_by, updated_date, open_id }));
    }
  }, [token]);
  useEffect(async () => {
    // GetDataKeyCloak()
    keycloak && GetDataCKan();
  }, [keycloak]);

  const oID = cookies.get('openid');
  // console.log('getOpenIDCookies', oID);


  const GetDataCKan = (isserch = false) => {
    let qy = { tags, data_type, groups, license_id, ministry, organization, res_format, };
    let checkall = { tags, data_type, groups, license_id, ministry, organization, res_format, q ,sort};
    let checkempty = Object.keys(JSON.parse(JSON.stringify(checkall))).length === 0 && JSON.parse(JSON.stringify(checkall)).constructor === Object;
    API.get(`http://dookdik2021.ddns.net/services/v1/api/ckan/all?rows=${12}&start=${isserch ? 0 : ckanData.length}&sort=${router.query.sort?router.query.sort:"title_string+asc"}&q=${q ? q : ""}&fq=${stringify({ ...qy, tags: tags?.toString() }).replace(/{/g, "").replace(/}/g, "").replace(/,/g, "+")}`, {
      headers: {
        'Authorization': `Bearer ${openid ? openid.token : keycloak.token}`
      },
    }).then(({ data: { data } }) => {
      // console.log(`GetDataCKan`, data);
      if (checkempty == false && isserch == true) {
        setCkandata(data.results);
        setRawdata(data);
      } else {
        setCkandata([...ckanData, ...data.results]);
        setRawdata(data);
      }
    }).catch((error) => {
      console.log('error :>> ', error);
    })
  }

  const renderSorter = () => {
    function changsort(e){
      router.push({
        pathname: '/',
        query: {...router.query,sort:e.target.value},
      })
    }
    return (
      <Menu style={{ padding: "5px 20px", borderRadius: 10 }}>
        <Radio.Group  defaultValue={"title_string+asc"}>
          <Space direction="vertical" onChange={changsort}>
            <Radio value={"score+desc%2C+metadata_modified+desc"}>ความสัมพันธ์</Radio>
            <Radio value={"title_string+asc"}>เรียงชื่อตามลำดับตัวอักษร (ก-ฮ)</Radio>
            <Radio value={"title_string+desc"}>เรียงชื่อตามลำดับตัวอักษร (ฮ-ก)</Radio>
            <Radio value={"metadata_modified+desc"}>ถูกแก้ไขครั้งสุดท้าย</Radio>
            <Radio value={"views_recent+desc"}>ได้รับความสนใจ</Radio>
          </Space>
        </Radio.Group>
      </Menu>
    )


  }
  return (
    <>
      <Head>
        <title>หน้าหลัก</title>
        <meta name="description" content="หน้าหลัก" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout style={{ padding: 20, display: "flex" }} serch={setSerch} onserch={GetDataCKan} dataserch={rawdata}  >
        <div style={{ padding: "20px 0px", width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <span style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#2980B9" }}>{`แสดง ${' '} ${ckanData.length} ${' '} ชุดข้อมูล (พบทั้งหมด ${rawdata.count} ชุดข้อมูล)`}</span>
          <div>
            {
              modeshow ?
                <BarsOutlined onClick={() => setModeshow(!modeshow)} style={{ fontSize: "30px", fontWeight: "bold", color: "#2980B9" }} />
                :
                <AppstoreFilled onClick={() => setModeshow(!modeshow)} style={{ fontSize: "30px", fontWeight: "bold", color: "#2980B9" }} />
            }
            <Dropdown overlay={renderSorter}>
              <InsertRowLeftOutlined style={{ fontSize: "30px", fontWeight: "bold", color: "#2980B9" }} />
            </Dropdown>
          </div>
        </div>
        <Row gutter={20} >
          {ckanData.map((item, index) =>
            <Link href="/" key={index} >
              <Col className="gutter-row" {...changemode()} >
                <Cardbox title={item.title} rawdata={item} image={item.organization.image_url} mode={modeshow} />
              </Col>
            </Link>
          )}
        </Row>
        <Button onClick={() => GetDataCKan()} type="primary" size="middle" style={{ width: "200px", alignSelf: "flex-end", borderRadius: "50px", backgroundColor: "#2980B9" }}>แสดงชุดข้อมูลเพิ่มเติม</Button>

      </Layout>
    </>
  )
}

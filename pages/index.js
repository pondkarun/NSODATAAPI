import React, { useEffect, useState, useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Head from 'next/head';
import { Cookies } from 'react-cookie'
import Link from 'next/link';
import Layout from '../components/Layouts';
import API from '../util/Api';
import Axios from 'axios'
import { SET_OPENID } from '../redux/actions'
import Cardbox from '../components/Cardbox'
import { Row, Col,Button } from 'antd';
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
  const cookies = new Cookies();
  const { keycloak, openid } = useSelector(({ auth }) => auth);
  const [modeshow, setModeshow] = useState(true);
  const [ckanData, setCkandata] = useState([]);
  const [rawdata, setRawdata] = useState({});
  const [serch, setSerch] = useState("");


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



  useEffect(async () => {
    console.log('tokenopenid :>> ', token);
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
  console.log('getOpenIDCookies', oID);


  const GetDataCKan = (isserch=false,fq="") => {
    API.get(`http://dookdik2021.ddns.net/services/v1/api/ckan/all?rows=${12}&start=${isserch?1:ckanData.length+1}&sort=views_recent+desc&q=${serch}&fq=${fq&&fq}`, {
      headers: {
        'Authorization': `Bearer ${openid ? openid.token : keycloak.token}`
      },
    }).then(({data:{data}}) => {
      console.log(`GetDataCKan`, data);
      if(serch&&fq!==""){
        setCkandata(data.results);
        setRawdata(data);
      }else{
        setCkandata([...ckanData,...data.results]);
        setRawdata(data);
      }
    }).catch((error) => {
      console.log('error :>> ', error);
    })
  }

  return (
    <>
      <Head>
        <title>หน้าหลัก</title>
        <meta name="description" content="หน้าหลัก" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout style={{ padding: 20 ,display:"flex"}} serch={setSerch} onserch={GetDataCKan} dataserch={rawdata}  >
        <div style={{ padding: "20px 0px", width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <span style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#2980B9" }}>{`พบ ${' '} ${ckanData.length} ${' '} ชุดข้อมูล`}</span>
          <div>
            {
              modeshow ?
                <BarsOutlined onClick={() => setModeshow(!modeshow)} style={{ fontSize: "30px", fontWeight: "bold", color: "#2980B9" }} />
                :
                <AppstoreFilled onClick={() => setModeshow(!modeshow)} style={{ fontSize: "30px", fontWeight: "bold", color: "#2980B9" }} />
            }
            <InsertRowLeftOutlined style={{ fontSize: "30px", fontWeight: "bold", color: "#2980B9" }} />
          </div>
        </div>
        <Row gutter={20} >
          {ckanData.map((item,index) =>
            <Link href="/" key={index}>
              <Col className="gutter-row" {...changemode()} >
                <Cardbox  title={item.title} image={item.organization.image_url} mode={modeshow} />
              </Col>
            </Link>
          )}
        </Row>
            <Button onClick={()=>GetDataCKan()} type="primary" size="middle" style={{width:"200px",alignSelf:"flex-end",borderRadius:"50px",backgroundColor:"#2980B9"}}>แสดงชุดข้อมูลเพิ่มเติม</Button>

      </Layout>
    </>
  )
}

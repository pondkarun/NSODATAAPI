import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Head from 'next/head';
import { Cookies } from 'react-cookie'
import Link from 'next/link';
import Layout from '../components/Layouts';
import API from '../util/Api';
import Axios from 'axios'
import { SET_OPENID } from '../redux/actions'
import Cardbox from '../components/Cardbox'
import { Row, Col } from 'antd';
import {
  BarsOutlined,
  InsertRowLeftOutlined
} from '@ant-design/icons';
import { useRouter } from 'next/router'


export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter()
  const { id,user_name,e_mail,status,last_login,login_status,token,token_date,created_by,created_date,updated_by,updated_date,open_id} = router.query;
  const cookies = new Cookies();
  const { keycloak } = useSelector(({ auth }) => auth);

  console.log("auth", keycloak)
  const [name, setName] = useState("wwwwwww");

  useEffect(async () => {
    console.log('tokenopenid :>> ', token);
    if(token){
      cookies.set('openid', {id,user_name,e_mail,status,last_login,login_status,token,token_date,created_by,created_date,updated_by,updated_date,open_id});
      dispatch(SET_OPENID({id,user_name,e_mail,status,last_login,login_status,token,token_date,created_by,created_date,updated_by,updated_date,open_id}));
    }
  }, [token]);
  useEffect(async () => {
    GetDataKeyCloak()
    GetDataCKan()
  }, []);

  const oID = cookies.get('openid');
console.log('getOpenIDCookies',oID);

  const GetDataKeyCloak = () => {
    // API.get('/services/v1/api/user/mydata').then((data) => {
    //   console.log(`data`, data)
    //   dispatch(SET_MENU(data.data));
    // }).catch((error) => {
    //   console.log('error :>> ', error);
    // })
    // Axios({
    //   url:'http://dookdik2021.ddns.net/services/v1/api/user/mydata',
    //   method:"GET",
    //   headers:{
    //     Authorization:'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI1IiwianRpIjoiYjU2ZjlhM2Q1OTcyZTNmMzUyZGUwMjZkZDM4M2JjMTNkODFhYmNkODBkMDhlM2M5ODhjM2YzNDJhMzRkMjExODY5ZDUxYzk0NjYzMzc2Y2QiLCJpYXQiOjE2MjM5NTc0MDUuMDU2OTI4LCJuYmYiOjE2MjM5NTc0MDUuMDU2OTMyLCJleHAiOjE2MjQwNDM4MDQuODAwMzgxLCJzdWIiOiJlMDkwYzc1Ny00OTk4LTQ5NGUtOGNlNi1kYjVjMzliODBlMzIiLCJzY29wZXMiOltdfQ.Eoj_6aegdfpN4RuXjhi7dsVlKTCcrn7KPyIKBOCZBhNad3lHtli_aHagYlpmK9isI3JEFRhjD8l-91vBLPB38Le8O7rbPdNdHRtxqp5as8oDjbB0CS6eyG009szHnteoZI5EHK8zPWFR7WsvvAC3F_Tj7IwmmerU_mHiKmXKlJDKXZj4QWbJISx8Jy9jwHtm-9nhOLEA6avM3jwniXIe9cl5oJPXll8YZ4IQCZ0WqsOJ3lrbRz2MI8tw4r18EhV2q0mbZXV48aq4MOmGd40nvA2ZgpdpjUDYlcO9iWIM_bG4vJVKtyiQO3NK1QnaXX2qaraAGCwM2n_tmf4o9AonaK-gGaI5i6jCsKyYTwEftSmGYAugJiM8g3wyXjMza1fHWR57FIW_3PJKOUvBcHgETsr0b0Y9vMWupkIHKfGlQhj1QSKUlnC5O3ydau2WsbJtcA1xP3l83n5eggj2K3NOjJ0KnUOBlFVCfRT4Nii2dX3Ga33z-Na8Nz6Rh9L0YdVrjZ59_6-FKnnKjVFAR6O5xyriZWpqCS9_uQ0k-wDQhVXc1Roo1LZiUEbJDNE278POsktns-j-0mW2vqlWwdyC7017eV8T90HQg9TPAJBQIK_RcWzdh9Zxmk0s_yc_dG45oti_TGeTLo5jZPq9g2x4zvq47GF7tFJhDig0j4oHfB4'
    //   }
    // }).then((data)=>{
    //   console.log('data :>> ', data);
    // }).catch((eror)=>{
    //   console.log('eror :>> ', eror);
    // })
  }

  const [ckanData, dataList] = useState([]);

  const GetDataCKan = () => {
    API.get('http://dookdik2021.ddns.net/services/v1/api/ckan/all').then((data) => {
      console.log(`GetDataCKan`, data);
      dataList(data.data.data.results);
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

      {/* <Layout>
        <p>{name}</p>
        <button onClick={() => { setName("Thunwa") }}>click</button>
      </Layout> */}
      <Layout style={{ padding: 20 }}>
        <div style={{ padding: "20px 0px", width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <span style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#2980B9" }}>{`พบ70ชุดข้อมูล`}</span>
          <div>
          <BarsOutlined style={{fontSize:"30px",fontWeight:"bold",color:"#2980B9"}} />
          <InsertRowLeftOutlined style={{fontSize:"30px",fontWeight:"bold",color:"#2980B9"}} />
          </div>
        </div>
        <Row gutter={20} >
          {ckanData.map((item) =>
            <Col className="gutter-row" xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 6 }} lg={{ span: 4 }} >
              <Cardbox key={item.id} title={item.maintainer} />
            </Col>
          )}
        </Row>

      </Layout>
    </>
  )
}

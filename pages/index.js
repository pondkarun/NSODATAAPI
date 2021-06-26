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
import { Row, Col } from 'antd';
import {
  BarsOutlined,
  InsertRowLeftOutlined
} from '@ant-design/icons';
import { useRouter } from 'next/router'


export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter()
  const { id, user_name, e_mail, status, last_login, login_status, token, token_date, created_by, created_date, updated_by, updated_date, open_id } = router.query;
  const cookies = new Cookies();
  const { keycloak,openid } = useSelector(({ auth }) => auth);

  const [name, setName] = useState("wwwwwww");

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

  const [ckanData, dataList] = useState([]);

  const GetDataCKan = () => {
    API.get('http://dookdik2021.ddns.net/services/v1/api/ckan/all', {
      headers: {
        'Authorization': `Bearer ${openid ? openid.token : keycloak.token}`
      }
    }).then((data) => {
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
            <BarsOutlined style={{ fontSize: "30px", fontWeight: "bold", color: "#2980B9" }} />
            <InsertRowLeftOutlined style={{ fontSize: "30px", fontWeight: "bold", color: "#2980B9" }} />
          </div>
        </div>
        <Row gutter={20} >
          {ckanData.map((item) =>
            <Col className="gutter-row" xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 6 }} lg={{ span: 4 }} >
              <Cardbox key={item.id} title={item.maintainer} image={item.organization.image_url} />
            </Col>
          )}
        </Row>

      </Layout>
    </>
  )
}

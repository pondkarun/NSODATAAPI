import React from 'react'
import Layouts from '../../components/Layouts';
import { Row, Col, Image, Form, Input, Button, Checkbox } from 'antd';
import API from '../../util/Api';
import {useDispatch} from 'react-redux';
import {SET_OPENID} from '../../redux/actions';
import {Cookies} from 'react-cookie';
import { useRouter } from 'next/router'

function Login() {
const dispatch =useDispatch();
const cookies = new Cookies();
const router = useRouter()

const onFinish = (values) => {
    console.log('Success:', values);
    API.post('http://dookdik2021.ddns.net/services/v1/api/login',values).then(({data:{data}})=>{
      // console.log('data :>> ', data);
      dispatch(SET_OPENID(data));
      cookies.set("openid",data);
      router.push('/');
    }).catch((eror)=>{
      console.log('eror :>> ', eror);
    })
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <Layouts disableheader disablecontainer>
      <Row style={{ height: '100%' }}>
        <Col span={14} xs={0} md={14} style={{ backgroundColor: "#F4D03F", }}>
        </Col>
        <Col span={10} xs={24} md={10}>
          <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
            <Image preview={false} src={"/img/logobg.png"} width={200} height={200} />
            <h2 style={{ fontWeight: "bold", fontSize: "25px" }}>ระบบนามานุกรมข้อมูลภาครัฐ</h2>
            <h2 style={{ fontWeight: "bold", fontSize: "25px" }}>(Goverment Directory Service)</h2>
            <div style={{ width: "80%" }}>
              <Form
                name="basic"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
              >
                <Form.Item
                  label=""
                  name="user_name"
                  rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input placeholder="Username" />

                </Form.Item>

                <Form.Item
                  label=""
                  name="password"
                  rules={[{ required: true, message: 'Please input your password!' }]}
                >
                  <Input.Password placeholder="Password" />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 0, span: 24 }}>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item>
                  <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
                    <Button htmlType="submit" block style={{ width: "45%", backgroundColor: "#89EE89",color:"white" }}>
                      Login
                    </Button>
                    <Button block style={{ width: "45%" }}>
                      Sign Up
                    </Button>
                  </div>
                </Form.Item>
                <Form.Item wrapperCol={{ span: 24 }}>
                  <Button href="http://dookdik2021.ddns.net/services/v1/api/openid" type="primary" block htmlType="submit">
                   Login On OpenID
                  </Button>

                </Form.Item>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
      <style jsx global>
        {`
          .ant-input {
              padding: 16px 12px 4px 11px;
              border:none;
              border-bottom: 2px solid gray;
          }
          .ant-input-affix-wrapper {
            border-bottom: 2px solid gray;
          }
          .ant-input-affix-wrapper > input.ant-input {
              padding: 12px 10px 4px 4px;
              border:none;
          }

          .ant-select .ant-select-selector {
              padding: 16px 10px 4px 11px;
          }

          .ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
              padding: 16px 10px 4px 11px;
              height: 48px;
          }

          .ant-select-single .ant-select-selector .ant-select-selection-search {
              top: 16px;
          }
          .ant-btn-block {
              width: 100%;
              border-radius: 10px;
              height: 40px;
          }
          `}
      </style>
    </Layouts>
  )
}

export default Login

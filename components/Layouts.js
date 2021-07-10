import React, { useEffect, useState } from 'react'
import { AppBar, Toolbar, IconButton, Typography, ListItemText, ListItemIcon, ListItem, Divider, List, Drawer } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Headers from './Header';
import { useSelector, useDispatch } from 'react-redux';
import { Layout, Menu, PageHeader, Avatar, Badge, Row, Col } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import Link from 'next/link';
import API from '../util/Api';
import { Cookies } from 'react-cookie'
import { SET_MENU } from '../redux/actions'
import { blue100 } from 'material-ui/styles/colors';
import {useRouter} from 'next/router';
import { route } from 'next/dist/next-server/server/router';

const { SubMenu } = Menu;
const { Header, Content, Sider, Footer } = Layout;


function Layouts({ children, disableheader, disablecontainer, dataserch }) {
    const dispatch = useDispatch();
    const datalist = useSelector(({ datalist }) => datalist);
    const [open, setOpen] = React.useState(true);
    const { openid,keycloak } = useSelector(({ auth }) => auth);
    const path = useRouter();

    var { munu } = useSelector(({ menu }) => menu);
    var permission_data = [];
    if (munu != null) {
        permission_data = munu.data.permission_data;
        console.log("permission_data", permission_data);
    }

    useEffect(() => {
        !munu && keycloak && Getmydata();
    }, [keycloak])

    const Getmydata = () => API.get('/services/v1/api/user/mydata', {
        headers: {
            'Authorization': `Bearer ${openid ? openid.token : keycloak.token}`
        }
    }).then((data) => {
        console.log(`data`, data)
        dispatch(SET_MENU(data.data));
    }).catch((error) => {
        console.log('error :>> ', error);
    })

    console.log('path.pathname >>', path.pathname);

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <PageHeader
                style={{ backgroundColor: "#2980B9", padding: "0px 19px" }}
                ghost={false}
                onBack={() => setOpen(!open)}
                backIcon={<IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={() => setOpen(true)}
                >
                    <MenuIcon style={{ color: "#FFF", fontSize: "40px", }} />
                </IconButton>}
                extra={[
                    <Avatar key={0} size={45} icon={<UserOutlined />} style={{ backgroundColor: "#FFF", color: "#000" }} />,
                    <a key={1}>{openid ? <span style={{ color: "white" }}>{openid.user_name}</span> : <Link href="/login"><a style={{ color: "#FFF", fontSize: "20px", top: "5px", position: "relative" }}>Login</a></Link>}</a>,
                    <a key={3} href="#">
                        <Badge count={datalist?.count} style={{ top: "10px" }}>
                            <ShoppingCartOutlined style={{ color: "yellow", fontSize: "40px", top: "10px", position: "relative" }} />
                        </Badge>
                    </a>,
                ]}
            >
            </PageHeader>
            <Layout>
                <Sider collapsedWidth={0} width={405} className="site-layout-background" style={{ backgroundColor: "#3D3D3D", zIndex: 99999 }} collapsed={open}>{/*position: "absolute", minHeight: '90%',*/}
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={[path.pathname]}
                        //defaultOpenKeys={['sub1']}
                        style={{ height: '100%', borderRight: 0, backgroundColor: "#3D3D3D", color: "#FFF" }}
                    >
                        {/* {permission_data.map((text, index) => (
                                <Menu.Item key={text.url} ><Link href={text.url}><span style={{color:"white"}}>{text.application_name}</span></Link></Menu.Item>
                        ))} */}
                        {
                            permission_data.map(text => {
                                return text.child && text.child.length > 0 ?
                                    <SubMenu key={text.id} title={text.application_name}>
                                        {
                                            // text.child.map(sub => {
                                            //     return
                                            //     <Menu.Item key={sub.url}>
                                            //         <Link href={sub.url}><span style={{color:"white"}}>{sub.application_name}</span></Link>
                                            //     </Menu.Item>
                                            // })
                                            text.child.map((sub, index) => (
                                                <Menu.Item key={sub.id}>
                                                    <Link href={sub.url}><span style={{ color: "orange" }}>{sub.application_name}</span></Link>
                                                </Menu.Item>
                                            ))
                                        }
                                    </SubMenu>
                                    :
                                    <Menu.Item key={text.url} ><Link href={text.url}><span style={{ color: "white" }}>{text.application_name}</span></Link></Menu.Item>
                            })
                        }
                    </Menu>
                    <p></p>
                </Sider>
                <Layout>
                    {!disableheader && <Headers dataserch={dataserch} />}
                    <Layout style={{ padding: !disablecontainer ? '0 50px 50px' : '0 0', }}>
                        {children}
                    </Layout>
                    <Footer style={{ backgroundColor: blue100 }}>
                        <Row>
                            <Col span={12}>
                                <Row>
                                    <Col span={1}>
                                        ที่อยู่
                                    </Col>
                                    <Col span={23}>
                                        สำนักงานสถิติแห่งชาติ กระทรวงดิจิทัลเพื่อเศรษฐกิจและสังคมศูนย์ราชการเฉลิมพระเกียรติ ๘๐ พรรษา
                                        <br />
                                        อาคารรัฐประศาสนภักดี ชั้น 2 ถนนแจ้งวัฒนะ เขตหลักสี่ กทม. 10210
                                        <br />
                                        โทรศัพท์: 0 2142-1234
                                        <br />
                                        โทรสาร: 0 2143-8109
                                        <br />
                                        อีเมล: services@nso.go.th
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={12}>
                                <Row>
                                    <Col>
                                        <div style={{ textAlign: 'right' }}>
                                            <Link href={'/'}><a>Q & A</a></Link> | <Link href={'/'}><a>นโยบายเว็บไซต์</a></Link> | <Link href={'/'}><a> นโยบายข้อมูลส่วนบุคคล</a></Link> | <Link href={'/'}><a> นโยบายการรักษาความมั่นคงปลอดภัยเว็บไซต์</a></Link>
                                            <br />
                                            <br />
                                            <br />
                                            <div style={{ position: 'revert', }}>
                                                รุ่นโปรแกรม: 1.0.0
                                                <br />
                                                วันที่ 2021-01-01
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Footer>
                </Layout>

            </Layout>
            <style jsx global>{`
            .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
                background-color: #2980b9;
            }
            `}</style>
        </Layout>
    )
}

export default Layouts

import React, { useEffect, useState } from 'react'
import { AppBar, Toolbar, IconButton, Typography, ListItemText, ListItemIcon, ListItem, Divider, List, Drawer } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Headers from './Header';
import { useSelector,useDispatch } from 'react-redux';
import { Layout, Menu, PageHeader, Avatar, Badge } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import Link from 'next/link';
import API from '../util/Api';
import { Cookies } from 'react-cookie'
import { SET_MENU } from '../redux/actions'

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;


function Layouts({ children, disableheader, disablecontainer }) {
	const dispatch = useDispatch();
    const [open, setOpen] = React.useState(true);
    const { openid,keycloak } = useSelector(({ auth }) => auth);
    var { munu } = useSelector(({ menu }) => menu);
    var permission_data = [];
    if (munu != null) {
        permission_data = munu.data.permission_data;
        console.log("permission_data", permission_data);
    }

    useEffect(() => {
        !munu && keycloak && Getmydata();
    }, [keycloak])

    const Getmydata = () => API.get('/services/v1/api/user/mydata',{
        headers:{
            'Authorization': `Bearer ${openid ? openid.token : keycloak.token}`
        }
    }).then((data) => {
        console.log(`data`, data)
        dispatch(SET_MENU(data.data));
    }).catch((error) => {
        console.log('error :>> ', error);
    })

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
                    <Avatar size={45} icon={<UserOutlined />} style={{ backgroundColor: "#FFF", color: "#000" }} />,
                    <>{openid ? <span style={{ color: "white" }}>{openid.user_name}</span> : <Link href="/login"><a style={{ color: "#FFF", fontSize: "20px", top: "5px", position: "relative" }}>Login</a></Link>}</>,
                    <a href="#">
                        <Badge count={0} style={{ top: "10px" }}>
                            <ShoppingCartOutlined style={{ color: "yellow", fontSize: "40px", top: "10px", position: "relative" }} />
                        </Badge>
                    </a>,
                ]}
            >
            </PageHeader>
            <Layout>
                <Sider collapsedWidth={0} width={200} className="site-layout-background" style={{ backgroundColor: "#3D3D3D", zIndex: 99999 }} collapsed={open}>{/*position: "absolute", minHeight: '90%',*/}
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100%', borderRight: 0, backgroundColor: "#3D3D3D", color: "#FFF" }}
                    >
                        {permission_data.map((text, index) => (
                            <Menu.Item key={text.id} >{text.application_name}</Menu.Item>
                        ))}
                    </Menu>
                </Sider>
                <Layout>
                    {!disableheader && <Headers />}
                    <Layout style={{ padding: !disablecontainer ? '0 50px 50px' : '0 0', }}>
                        {children}
                    </Layout>
                </Layout>

            </Layout>
        </Layout>
    )
}

export default Layouts

import React from 'react'
import clsx from 'clsx';
import { AppBar, Toolbar, IconButton, Typography, ListItemText, ListItemIcon, ListItem, Divider, List, Drawer } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Headers from './Header';
import { useSelector } from 'react-redux';
import { Layout, Menu, PageHeader, Avatar } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined, ShoppingCartOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;


function Layouts({ children }) {
    const [open, setOpen] = React.useState(true);
    var { munu } = useSelector(({ menu }) => menu);
    var permission_data = [];
    if (munu != null) {
        permission_data = munu.data.permission_data;
        console.log("permission_data", permission_data);
    }



    return (
        <Layout style={{ minHeight: '100vh' }}>
            <PageHeader
                style={{ backgroundColor: "#2980B9", padding: "3px 19px" }}
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
                    <span style={{ color: "#FFF", fontSize: "20px", top: "5px", position: "relative" }}>UserName</span>,
                    <ShoppingCartOutlined style={{ color: "yellow", fontSize: "40px", top: "10px", position: "relative" }} />
                ]}
            >
            </PageHeader>
            <Layout>
                <Sider collapsedWidth={0} width={200} className="site-layout-background" style={{ position: "absolute", minHeight: '90%', backgroundColor: "#3D3D3D", zIndex: 99999 }} collapsed={open}>
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
                    <Headers />
                    <Layout style={{ padding: '0 50px 50px' }}>
                        {children}
                    </Layout>
                </Layout>

            </Layout>
        </Layout>
    )
}

export default Layouts

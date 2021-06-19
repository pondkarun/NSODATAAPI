import React from 'react'
import clsx from 'clsx';
import { AppBar, Toolbar, IconButton, Typography, ListItemText, ListItemIcon, ListItem, Divider, List, Drawer } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Container from '@material-ui/core/Container';
import Headers from './Header';
import { UserOutlined,ShoppingCartOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { PageHeader, Avatar, Button } from 'antd';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    me: {
        marginRight: theme.spacing(2),
    },

    title: {
        flexGrow: 1,

    },

    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
}));

function Layouts({ children }) {
    const classes = useStyles();

    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    var { munu } = useSelector(({ menu }) => menu);
    var permission_data = [];
    if (munu != null) {
        permission_data = munu.data.permission_data;
        console.log("permission_data", permission_data);
    }

    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {permission_data.map((text, index) => (
                    <ListItem key={text.id}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text.application_name} />
                    </ListItem>
                ))}
            </List>

        </div>
    );




    return (
        <div className={classes.root}>
            <>
                <div className="site-page-header-ghost-wrapper">
                    <div className="site-page-header-ghost-wrapper">
                        <PageHeader
                            style={{ backgroundColor: "#2980B9", padding: "3px 19px" }}
                            ghost={false}
                            onBack={toggleDrawer('left', true)}
                            backIcon={<IconButton
                                edge="start"
                                className={classes.menuButton}
                                color="inherit"
                                aria-label="open drawer"
                                onClick={toggleDrawer('left', true)}
                            >
                                <MenuIcon style={{ color: "#FFF", fontSize: "30px" }} />
                            </IconButton>}
                            extra={[
                                <Avatar size={45} icon={<UserOutlined />} style={{backgroundColor:"#FFF",color:"#000"}} />,
                                <span style={{color:"#FFF",fontSize:"20px",top:"5px",position:"relative"}}>UserName</span>,
                                <ShoppingCartOutlined style={{color:"yellow",fontSize:"40px",top:"10px",position:"relative"}} />
                            ]}
                        >
                        </PageHeader>
                    </div>
                </div>
                <Drawer anchor={'left'} open={state['left']} onClose={toggleDrawer('left', false)}>
                    {list('left')}
                </Drawer>
            </>
            <Headers />
            <Container maxWidth="lg">
                {children}
            </Container>
            <style jsx global>
                {`
                .ant-page-header-heading-extra {
                    margin: 8px 0 !important;
                    white-space: nowrap;
                }
                `}
            </style>
        </div>
    )
}

export default Layouts

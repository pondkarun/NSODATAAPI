import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
// import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCartOutlined';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import SearchButton from '@material-ui/icons/SearchOutlined';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import { OutlinedInput } from '@material-ui/core';
import Logo from 'next/image';
import Link from 'next/link';
import Image from 'next/image';
import { style } from '@material-ui/system';
import Layout from '../components/Layouts';
// import LogoPath from '../public/img/logo.png';
import { Row, Col, Input, Button} from 'antd';
import { black } from 'material-ui/styles/colors';

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
  },
}));

export default function TemporaryDrawer() {
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
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <>
      {/* <div className="Layout" style={{ backgroundColor: '#21696f' }}>
        <Grid container spacing={3}>
          <Grid item xs={11}>
            {['Left'].map((anchor) => (
              <React.Fragment key={anchor}>
                <Button onClick={toggleDrawer(anchor, true)}><MenuIcon /></Button>
                <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                  {list(anchor)}
                </Drawer>
              </React.Fragment>
            ))}
          </Grid>
          <Grid item xs={1}>
          <AccountBoxIcon />
            <ShoppingCartIcon />
          </Grid>
        </Grid>
      </div> */}
      {/* <div container>
        <div item xs={6}>
          <div style={{ fontSize: 27, fontWeight: 'bolder', display: 'inline' }}>
            ระบบนามานุกรมข้อมูลภาครัฐ
          </div>
          <div style={{ fontSize: 25, fontWeight: 'bolder' }}>
            (Government Directory Service)
          </div>
          <div>
            <Image src={"/img/logo.png"} alt="Logo" width={100} height={100} />
          </div>        
        </div>
        <div item xs={6}>
          <div style={{ textAlign: 'center', fontSize: 27, fontWeight: 'bolder', height: '100%' }}>
            เข้าสู่ระบบ
            <br />
            <TextField variant={'filled'} label={'Open ID account'} />
            <br />
            <TextField variant={'filled'} label={'Password'} />
            <br />
            <Link href="/" className={style.button}>
              <a>Login</a>
            </Link>
            
          </div>        
          </div>
      </div> */}
<br />
<br />
<Layout>
<div>
        <Row style = {{}}>
          <Col span={12} style={{textAlign: 'center', fontSize: 27, fontWeight: 'bolder'}}>
            ระบบนามานุกรมข้อมูลภาครัฐ
            <br />
            (Government Directory Service)
            <br />
            <br />
            <Image src={"/img/logo.png"} alt="Logo" width={100} height={100} />
          </Col>
          <Col span={12} style={{textAlign: 'center', fontSize: 25, fontWeight: 'bold', backgroundColor: 'orange', borderTopLeftRadius: 60}}>
            เข้าสู่ระบบ
            <br />
            <Row><Col span={24} style={{fontSize: 25,}}>Open ID account</Col></Row>
            <Row><Col span={12} offset={6}><Input placeholder="Username" size="large" allowClear /></Col></Row>
            <Row><Col span={12} offset={6}><Input.Password placeholder="Password" size="large" allowClear /></Col></Row>
            <Row><Col span={12} offset={6} style={{textAlign: 'center'}}><Button type="primary" shape="round">Login</Button></Col></Row>
            <Row><Col span={24} style={{}}><hr style={{color: black}} /></Col></Row>
            <Row><Col span={24} style={{fontWeight: 'normal', fontSize: 17}}>หรือ</Col></Row>
            <Row><Col span={12} offset={6} style={{textAlign: 'center'}}><Button type="primary" shape="round">Open ID</Button></Col></Row>
          </Col>
        </Row>
      </div>
</Layout>
      

    </>
  );
}
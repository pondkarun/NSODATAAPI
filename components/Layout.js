import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
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
import Link from 'next/link';
//import InboxIcon from '@material-ui/icons/MoveToInbox';
//import MailIcon from '@material-ui/icons/Mail';

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
    // color: theme.palette.text.secondary,
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
        {
          [
            {'Menu':'หน้าแรก', 'Url': '/'},
            {'Menu':'ข้อมูลของฉัน', 'Url': '/'},
            {'Menu':'ชุดข้อมูลยอดนิยม', 'Url': '/'},
            {'Menu':'เกี่ยวกับ', 'Url': '/'},
            {'Menu':'จัดการผู้ใช้งาน', 'Url': '/admin/user'},
            {'Menu':'จัดการกลุ่มผู้ใช้งาน', 'Url': '/admin/user_group'},
            {'Menu':'จัดการระดับการเข้าถึง', 'Url': '/admin/permission'},
            {'Menu':'จัดการฟังก์ชันโปรแกรม', 'Url': '/admin/system_feature'},
          ]
          .map((text, index) => (
            <Link href={text.Url}>
              <ListItem button key={text.Menu}>
                <ListItemText primary={text.Menu} />
              </ListItem>
            </Link>
        ))}
      </List>
      {/* <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List> */}
    </div>
  );

  return (
    <>
      <div className="Layout" style={{ backgroundColor: '#21696f' }}>
        {/* {['left', 'right', 'top', 'bottom'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>Menu</Button>
          <Button onClick={toggleDrawer(anchor, true)}><MenuIcon/></Button>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))} */}

        <Grid container spacing={3}>
          <Grid item xs={11}>
            {['Left'].map((anchor) => (
              <React.Fragment key={anchor}>
                {/* <Button onClick={toggleDrawer(anchor, true)}>Menu</Button> */}
                <Button onClick={toggleDrawer(anchor, true)}><MenuIcon /></Button>
                <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                  {list(anchor)}
                </Drawer>
              </React.Fragment>
            ))}
          </Grid>
          <Grid item xs={1}>
            <Link href={'/login'}>
              <AccountBoxIcon />
            </Link>
            <ShoppingCartIcon />
          </Grid>
        </Grid>
      </div>
      {/* <div style = {{backgroundColor: '#ffa366',}}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <div style={{textAlign: 'center', fontSize: 27, fontWeight: 'bolder'}}>
            ระบบนามานุกรมข้อมูลภาครัฐ
            <br/>
            (Goverment Directory Service)
            </div>
          </Grid>
        </Grid>
        <br/>
        <Grid container>
          <Grid item xs={12}>
            <div style={{textAlign: 'center'}}>
            
            <TextField placeholder={'Search...'} />
            <button type="submit"><SearchButton /></button>
            </div>
            <br />
          </Grid>
        </Grid>
      </div> */}
    </>
  );
}
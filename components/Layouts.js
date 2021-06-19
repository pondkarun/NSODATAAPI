import React from 'react'
import clsx from 'clsx';
import { AppBar, Toolbar, IconButton, Typography, ListItemText, ListItemIcon, ListItem, Divider, List, Button, Drawer } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Container from '@material-ui/core/Container';
import Headers from './Header';
import {useSelector} from 'react-redux';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
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

function Layouts({ children  }) {
    const classes = useStyles();

    const {munu} = useSelector(({menu})=>menu);
    console.log("Guest", munu);
    const permission_data = munu.data.permission_data;

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
                {permission_data.map((text, index) => (
                    <ListItem button key={text.id}>
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
                <AppBar position="static">
                    <Toolbar className={classes.toolbar}>
                        <IconButton
                            edge="start"
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer('left', true)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography className={classes.title} variant="h6" noWrap>

                        </Typography>
                        <IconButton aria-label="search" color="inherit">
                            <SearchIcon />
                        </IconButton>
                        <IconButton aria-label="display more actions" edge="end" color="inherit">
                            <MoreIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Drawer anchor={'left'} open={state['left']} onClose={toggleDrawer('left', false)}>
                    {list('left')}
                </Drawer>
            </>
            <Headers />
            <Container fixed>
                {children}
            </Container>

        </div>
    )
}

export default Layouts

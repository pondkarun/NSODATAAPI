import styles from '../../styles/Home.module.scss';
import Button from '@material-ui/core/Button';

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Layout from '../../components/Layout';

const useStyle = makeStyles({
    table: {
        minWidth: 650,
    },
});

const rows=[];

export default function UserList(){

    const classes = useStyle();

    return (
        <>
        <Layout />
        <h1>ระบบจัดการการเข้าถึง Application</h1>

        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label=" Simple Table">
                <TableHead>
                    <TableRow>
                        <TableCell>ลำดับ</TableCell>
                        <TableCell>ชื่อ</TableCell>
                        <TableCell>URL</TableCell>
                        <TableCell>Access</TableCell>
                        <TableCell>Parent Menu</TableCell>
                        <TableCell>จัดการ</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                            <TableCell>1</TableCell>
                            <TableCell>รายการโดรน</TableCell>
                            <TableCell>/MenuDrone/ManegerDrone/Drone</TableCell>
                            <TableCell>KUBOTA ประเทศไทย</TableCell>
                            <TableCell></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>

        </>
    )
}
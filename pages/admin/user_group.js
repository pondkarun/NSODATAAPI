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
        <h1>รายการกลุ่มผู้ใช้งานระบบ</h1>

        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label=" Simple Table">
                <TableHead>
                    <TableRow>
                        <TableCell>ลำดับ</TableCell>
                        <TableCell>กลุ่มผู้ใช้งาน</TableCell>
                        <TableCell>กลุ่มผู้ใช้งาน</TableCell>
                        <TableCell>จัดการ</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                            <TableCell>1</TableCell>
                            <TableCell>Natthamon</TableCell>
                            <TableCell>Super Admin</TableCell>
                            <TableCell></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>

        </>
    )
}
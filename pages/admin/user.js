import styles from '../../styles/Home.module.scss';
import Button from '@material-ui/core/Button';

import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Layout from '../../components/Layouts';
import CheckIcon from '@material-ui/icons/Check';
import { green } from '@material-ui/core/colors';

const useStyle = makeStyles({
    table: {
        minWidth: 650,
    },
});

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

export default function UserList(){

    const classes = useStyle();

    return (
        <>
        <Layout />
        <h1>ระบบจัดการผู้ใช้งานระบบ</h1>

        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label=" Simple Table">
                <TableHead>
                    <TableRow>
                        <TableCell>ลำดับ</TableCell>
                        <TableCell>ชื่อเข้าใช้ระบบ</TableCell>
                        <TableCell>ชื่อ - นามสกุล</TableCell>
                        <TableCell>อีเมล</TableCell>
                        <TableCell>กลุ่มผู้ใช้งาน</TableCell>
                        <TableCell>เข้าระบบล่าสุด</TableCell>
                        <TableCell>สถานะผู้ใช้</TableCell>
                        <TableCell>จัดการ</TableCell>
                        
                    </TableRow>
                </TableHead>   
                <TableBody>
                    {rows.map((row, index) => (
                        <TableRow>
                            <TableCell>{index+1}</TableCell>
                            <TableCell>{row.UserName}</TableCell>
                            <TableCell>{row.Name}</TableCell>
                            <TableCell>{row.Mail}</TableCell>
                            <TableCell>{row.UserGroup}</TableCell>
                            <TableCell>{row.LastLogin}</TableCell>
                            {/* <TableCell>{row.Status}</TableCell> */}
                            <TableCell><CheckIcon style={{color: green[500], }} /></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    ))}

                    {/* <TableRow>
                            <TableCell>1</TableCell>
                            <TableCell>Natthamon</TableCell>
                            <TableCell>พ.อ.อ. นัทธมน มากสาขา</TableCell>
                            <TableCell>nn@gmail.com</TableCell>
                            <TableCell>Super Admin</TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                    </TableRow> */}
                </TableBody>
            </Table>
        </TableContainer>

        </>
    )
}
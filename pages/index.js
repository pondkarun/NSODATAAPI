import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Home.module.scss';
import Layout from '../components/Layouts';
import Grid from '@material-ui/core/Grid';
import SearchButton from '@material-ui/icons/SearchOutlined';
import TextField from '@material-ui/core/TextField';
import API from '../util/Api';
import Axios from 'axios'


export default function Home() {
  const dispatch = useDispatch();
  const name = "asdasdasd"
  useEffect(async () => {
    GetDataKeyCloak()
  }, []);



  const GetDataKeyCloak = () => {
    API.get('/services/v1/api/user/mydata').then((data) => {
      console.log(`data`, data)
    }).catch((error) => {
      console.log('error :>> ', error);
    })
    // Axios({
    //   url:'http://dookdik2021.ddns.net/services/v1/api/user/mydata',
    //   method:"GET",
    //   headers:{
    //     Authorization:'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI1IiwianRpIjoiYjU2ZjlhM2Q1OTcyZTNmMzUyZGUwMjZkZDM4M2JjMTNkODFhYmNkODBkMDhlM2M5ODhjM2YzNDJhMzRkMjExODY5ZDUxYzk0NjYzMzc2Y2QiLCJpYXQiOjE2MjM5NTc0MDUuMDU2OTI4LCJuYmYiOjE2MjM5NTc0MDUuMDU2OTMyLCJleHAiOjE2MjQwNDM4MDQuODAwMzgxLCJzdWIiOiJlMDkwYzc1Ny00OTk4LTQ5NGUtOGNlNi1kYjVjMzliODBlMzIiLCJzY29wZXMiOltdfQ.Eoj_6aegdfpN4RuXjhi7dsVlKTCcrn7KPyIKBOCZBhNad3lHtli_aHagYlpmK9isI3JEFRhjD8l-91vBLPB38Le8O7rbPdNdHRtxqp5as8oDjbB0CS6eyG009szHnteoZI5EHK8zPWFR7WsvvAC3F_Tj7IwmmerU_mHiKmXKlJDKXZj4QWbJISx8Jy9jwHtm-9nhOLEA6avM3jwniXIe9cl5oJPXll8YZ4IQCZ0WqsOJ3lrbRz2MI8tw4r18EhV2q0mbZXV48aq4MOmGd40nvA2ZgpdpjUDYlcO9iWIM_bG4vJVKtyiQO3NK1QnaXX2qaraAGCwM2n_tmf4o9AonaK-gGaI5i6jCsKyYTwEftSmGYAugJiM8g3wyXjMza1fHWR57FIW_3PJKOUvBcHgETsr0b0Y9vMWupkIHKfGlQhj1QSKUlnC5O3ydau2WsbJtcA1xP3l83n5eggj2K3NOjJ0KnUOBlFVCfRT4Nii2dX3Ga33z-Na8Nz6Rh9L0YdVrjZ59_6-FKnnKjVFAR6O5xyriZWpqCS9_uQ0k-wDQhVXc1Roo1LZiUEbJDNE278POsktns-j-0mW2vqlWwdyC7017eV8T90HQg9TPAJBQIK_RcWzdh9Zxmk0s_yc_dG45oti_TGeTLo5jZPq9g2x4zvq47GF7tFJhDig0j4oHfB4'
    //   }
    // }).then((data)=>{
    //   console.log('data :>> ', data);
    // }).catch((eror)=>{
    //   console.log('eror :>> ', eror);
    // })
  }
  return (
    <>
      <Head>
        <title>หน้าหลัก</title>
        <meta name="description" content="หน้าหลัก" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <p>{name}</p>
        <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic architecto beatae similique, accusamus aspernatur itaque non earum eveniet sunt quidem nulla ipsum omnis error praesentium repellat commodi provident repellendus laudantium.</h1>
      </Layout>
    </>
  )
}

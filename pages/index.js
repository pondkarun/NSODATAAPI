import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Home.module.scss';
import Layout from '../components/Layout';
import Grid from '@material-ui/core/Grid';
import SearchButton from '@material-ui/icons/SearchOutlined';
import TextField from '@material-ui/core/TextField';



export default function Home() {
  return (
    <>
      {/* <div className={styles.container}> */}
      <Head>
        <title>หน้าหลัก</title>
        <meta name="description" content="หน้าหลัก" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout />
      <div style={{ backgroundColor: '#ffa366', borderBottomLeftRadius: 50, borderBottomRightRadius: 50,}}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <div style={{ textAlign: 'center', fontSize: 27, fontWeight: 'bolder', }}>
            <Image src={"/img/logo.png"} alt="Logo" width={100} height={100} />
              ระบบนามานุกรมข้อมูลภาครัฐ
              <br />
              (Goverment Directory Service)
              <br />
              <div style={{backgroundColor: 'white', borderRadius: 10,}}>
                
              </div>
            </div>
          </Grid>
        </Grid>
        <br />
        <Grid container>
          <Grid item xs={12}>
            <div style={{ textAlign: 'center' }}>

              <TextField placeholder={'Search...'} />
              <button type="submit"><SearchButton /></button>
            </div>
            <br />
          </Grid>
        </Grid>
      </div>

      {/* </div> */}
    </>
  )
}

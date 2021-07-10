import Layouts from '../../components/Layouts';
import Head from 'next/head';

export default function AboutUS() {
    return (
        <Layouts>
            <Head>
                <title>ข้อมูลยอดนิยม</title>
            </Head>
            <h3 style={{fontSize: 30}}>
                ข้อมูลยอดนิยม 0 รายการ
            </h3>
        </Layouts>
        
    )
}
import React from 'react'
import Layouts from '../../components/Layouts';
import { Row, Col, Button, Image, Radio, Space, Menu } from 'antd';

function Dataset() {
    return (
        <Layouts>
            <div style={{ padding: 10 }}>
                <Row gutter={15}>
                    <Col span={5}>
                            <Image
                                width={150}
                                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                            />
                    </Col>
                    <Col span={19} style={{ display: 'flex', flexDirection: "column", justifyContent: "center" }} >
                        <h1 style={{ fontSize: "2rem" }}>asdasdasd</h1>
                        <p>asdasdasdasd</p>
                        <p>Tags :</p>
                    </Col>
                </Row>
            </div>
            <div>
            <h1 style={{ fontSize: "1rem" }}>คำอธิบายชุดข้อมูล</h1>
                <Row gutter={15}>
                    <Col span={16} style={{backgroundColor:"#F54"}}>

                    </Col>
                    <Col span={8}  style={{backgroundColor:"#F54"}}>

                    </Col>
                </Row>
            </div>
        </Layouts>
    )
}

export default Dataset

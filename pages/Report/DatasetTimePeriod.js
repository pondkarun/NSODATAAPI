import React from 'react'
import Layouts from '../../components/Layouts';
import { Table, Tag, Space, Form, DatePicker, Select, Row, Col } from 'antd';

const { RangePicker } = DatePicker;
const { Option } = Select;

const DatasetTimePeriod = () => {
const [typeselect, setTypeselect] = React.useState("day");
    const columns = [
        {
            title: 'ลำดับ',
            dataIndex: 'name',
            key: 'name',
            render: text => <a>{text}</a>,
        },
        {
            title: 'ชื่อคำค้น',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'จำนวนการใช้งานคำค้น',
            dataIndex: 'address',
            key: 'address',
        },

    ];

    return (
        <Layouts>
            <div style={{ padding: "15px 0px" }}>
                <h1 style={{ textAlign: "center" }}>รายงานแสดงความนิยมคำค้นจำแนกตามช่วงเวลา</h1>
                <Form
                    name="basic"
                    layout="vertical"
                >
                    <Row gutter={25}>
                        <Col span={4}>
                            <Form.Item
                                label="ช่วงเวลา"
                                name="dattime"
                            >
                                <RangePicker picker={typeselect!=="day"&&typeselect} />

                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item
                                label="ราย"
                                name="date_trunc"
                            >
                                <Select
                                    style={{ width: 200 }}
                                    placeholder="เลือกรายประเภท"
                                    onChange={(e)=>setTypeselect(e)}
                                >
                                    <Option value="day">วัน</Option>
                                    <Option value="month">เดือน</Option>
                                    <Option value="year">ปี</Option>
                                    <Option value="week">สัปดาห์</Option>
                                </Select>

                            </Form.Item>
                        </Col>
                        <Col span={4}>

                        </Col>
                    </Row>
                </Form>
                <Table columns={columns} dataSource={[]} />
            </div>
        </Layouts>
    )
}

export default DatasetTimePeriod

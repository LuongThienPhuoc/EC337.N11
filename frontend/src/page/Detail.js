import { Layout, Menu, Row, Col, Typography, Breadcrumb, Rate, Divider, Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { MoneyCollectOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import QRCode from "react-qr-code";
import data from "./data.json"
import axios from "axios"
const { Header, Content, Footer } = Layout;
const { Title } = Typography;
const App = () => {
    const { id } = useParams()
    const [product, setProduct] = useState({})
    console.log(id)
    useEffect(() => {
        axios.get("axios")
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err)
            })
        data.map((item) => {
            if (item.id == id) {
                setProduct(item)
            }
        })
    }, [id])
    const navigate = useNavigate()
    return (
        <Layout className="layout">
            <Header>
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    items={
                        [
                            {
                                key: 1,
                                label: "Home",
                                onClick: () => { navigate("/") }
                            },

                            {
                                key: 3,
                                label: "Payment",
                                onClick: () => { navigate("/payment") }
                            },
                        ]
                    }
                />
            </Header>
            <Content
                style={{
                    padding: '0 50px',
                }}
            >

                <div className="site-layout-content">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>

                        <div style={{ display: "flex", alignItems: "center" }}>
                            <Title style={{ marginTop: "50px", color: "#636363", marginRight: "20px" }} level={3}>Detail Product</Title>
                            <Breadcrumb style={{ transform: "translateY(+20px)" }}>
                                <Breadcrumb.Item onClick={() => { navigate("/") }}><span style={{ cursor: "pointer" }}>Home</span></Breadcrumb.Item>
                                <Breadcrumb.Item>{product.title}</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <Button onClick={() => { navigate("/payment") }} style={{ background: "#95de64", fontWeight: "600", marginTop: "20px", width: "300px" }} type="primary" icon={<MoneyCollectOutlined />} size={"large"}>
                            GO TO PAYMENT
                        </Button>

                    </div>
                    <Row style={{ borderRadius: "8px", background: "white" }} gutter={[16, 16]}>
                        <Col span={8}>
                            <img style={{ padding: "10px", height: "400px", width: "100%", borderRadius: "8px" }} alt="example" src={product?.thumbnail} />
                        </Col>
                        <Col span={16}>
                            <Title style={{ marginTop: "20px" }} level={4}>{product.title}</Title>
                            <p style={{ fontWeight: "600", color: "#f7cc15", fontSize: "1.2rem", marginBottom: "0px" }}>$ {product.price} VNĐ</p>
                            <Rate disabled defaultValue={4} />
                            <p style={{ fontSize: "1rem", paddingTop: "10px" }}>
                                Available - <span style={{ color: "#95de64" }}>In stock</span>
                            </p>
                            <Divider />
                            <p>
                                {product.description}
                            </p>
                            <div style={{ background: "black", display: "flex", borderRadius: "8px", width: "200px", flexDirection: "column", alignItems: "center", padding: "5px 10px" }}>
                                <div style={{ margin: "10px", height: "180px", width: "180px", borderRadius: "8px" }}>
                                    <QRCode
                                        size={256}
                                        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                        viewBox={`0 0 256 256`}
                                        value={id} />
                                </div>
                                <div style={{ textAlign: "center", color: "white", margin: "5px 0", fontWeight: "600" }}>SCAN ME</div>
                            </div>
                            <Divider />
                        </Col>
                    </Row>
                </div>
            </Content>
            <Footer
                style={{
                    textAlign: 'center',
                }}
            >
                Ant Design ©2018 Created by Ant UED
            </Footer>
        </Layout>
    );
}

export default App;
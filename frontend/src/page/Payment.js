import { Layout, Menu, Row, Col } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cart from './Cart';
import QRCode from "react-qr-code";

const { Header, Content, Footer } = Layout;

const Payment = () => {
    const navigate = useNavigate()

    return (
        <Layout className="layout">
            <Header>
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['3']}
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
                    <Row style={{ marginTop: "50px" }} gutter={[16, 16]}>
                        <Col span={8}>
                            <div style={{ background: "black", display: "flex", borderRadius: "8px", width: "100%", flexDirection: "column", alignItems: "center", padding: "5px 10px" }}>
                                <QRCode
                                    size={256}
                                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                    viewBox={`0 0 256 256`}
                                    value={1000000} />
                                <div style={{ textAlign: "center", color: "white", margin: "5px 0", fontWeight: "600", fontSize: "2rem" }}>SCAN ME</div>
                            </div>
                        </Col>
                        <Col span={10} offset={3}>
                            <Cart></Cart>
                            <div style={{ fontSize: "2rem", fontWeight: "700", color: "#95de64", textAlign: "center" }}>
                                TOTAL: <span>500.000.000đ</span>
                            </div>
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

export default Payment;
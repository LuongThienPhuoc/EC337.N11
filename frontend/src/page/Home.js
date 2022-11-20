import { Layout, Menu, Row, Col } from 'antd';
import React from 'react';
import Item from './Item';
import { useNavigate } from 'react-router-dom';
import data from "./data.json"

const { Header, Content, Footer } = Layout;
const App = () => {
    const navigate = useNavigate()

    return (
        <Layout className="layout">
            <Header>
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    items={
                        [
                            {
                                key: 1,
                                label: "Home",
                                onClick: () => { navigate("/") }
                            },
                            {
                                key: 2,
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
                        {
                            data?.map((item, key) =>
                                <Col key={key} span={6}>
                                    <Item item={item}></Item>
                                </Col>)
                        }

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
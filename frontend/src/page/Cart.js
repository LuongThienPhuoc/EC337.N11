import React from 'react';
import { Divider } from 'antd';
import { Avatar, List } from 'antd';
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';

const data = [
    {
        title: 'Tủ lạnh siêu lạnh của hãng - Panasonic',
    },
    {
        title: 'Tủ lạnh siêu lạnh của hãng - Panasonic',
    },
    {
        title: 'Tủ lạnh siêu lạnh của hãng - Panasonic',
    },
    {
        title: 'Tủ lạnh siêu lạnh của hãng - Panasonic',
    },
];
const Cart = () => (
    <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
            <List.Item>
                <List.Item.Meta
                    avatar={<Avatar style={{ width: "50px", height: "50px" }} src="https://tudongvietphat.com/wp-content/uploads/2021/01/Tu-lanh-Casper-RM-680VBW-645l-4-cua-web4.jpg" />}
                    title={<h3 >{item.title}</h3>}
                    description={<>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <p style={{ fontWeight: "600", color: "#f7cc15", fontSize: "1rem", marginBottom: "0px" }}>
                                $ 120.000.000 VNĐ
                                <span style={{ color: "black", fontSize: ".8rem" }}> x3</span>
                            </p>
                            <p style={{ fontWeight: "600", color: "#f7cc15", fontSize: "1.2rem", marginBottom: "0px", transform: "translateY(-3px)" }}>
                                $ 360.000.000 VNĐ
                            </p>
                        </div>
                        <div style={{ fontSize: "1.4rem" }}>
                            <span style={{ paddingRight: "20px", cursor: "pointer" }}>
                                <PlusCircleOutlined />
                            </span>
                            <span style={{ paddingRight: "20px", cursor: "pointer" }}>
                                <MinusCircleOutlined />
                            </span>
                        </div>
                        <Divider />
                    </>}
                />
            </List.Item>
        )}
    />
);
export default Cart;
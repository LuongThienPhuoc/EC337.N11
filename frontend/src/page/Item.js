import { Card, Button } from 'antd';
import React from 'react';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
const { Meta } = Card;
const gridStyle = {
    width: '100%',
    borderRadius: "8px",
    border: "1px solid black"
};

const Item = ({ item }) => {
    const navigate = useNavigate()
    return (
        <Card hoverable cover={<img style={{ padding: "5px", height: "300px" }} alt="example" src={item.thumbnail} />} style={gridStyle}>
            <div style={{ height: "100px", overflow: "hidden" }}>
                <Meta title={item.title} description={item.description} />
            </div>
            <div>
                Price: <span style={{ fontWeight: "600", color: "#95de64" }}>{item.price} VNĐ</span>
            </div>
            <Button onClick={() => { navigate(`/detail/${item.id}`) }} style={{ background: "#95de64", fontWeight: "600", marginTop: "20px" }} type="primary" icon={<ShoppingCartOutlined />} size={"medium"}>
                Add to card
            </Button>
        </Card>
    );

}
export default Item;
import React from "react"
import { Divider } from "antd"
import { Avatar, List } from "antd"
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons"
import data from "./data.json"

const Cart = (props) => {
  console.log("props.item", props.items)
  return (
    <List
      itemLayout="horizontal"
      dataSource={props.items}
      renderItem={(item) => {
        const filter = data.find((filter) => filter.id == item.idProduct)
        console.log("filter", filter)
        return (
          <List.Item>
            <List.Item.Meta
              avatar={
                <img
                  src={filter.images[0]}
                  style={{ width: "50px", height: "50px" }}
                ></img>
              }
              title={<h3>{filter.title}</h3>}
              description={
                <>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <p
                      style={{
                        fontWeight: "600",
                        color: "#f7cc15",
                        fontSize: "1rem",
                        marginBottom: "0px"
                      }}
                    >
                      {filter.price} $
                      <span style={{ color: "black", fontSize: ".7rem" }}>
                        {" "}
                        x{item.amount}
                      </span>
                    </p>
                    <p
                      style={{
                        fontWeight: "600",
                        color: "#f7cc15",
                        fontSize: "1.2rem",
                        marginBottom: "0px",
                        transform: "translateY(-3px)"
                      }}
                    >
                      {filter.price * item.amount} $
                    </p>
                  </div>
                  <div style={{ fontSize: "1.4rem" }}>
                    <span
                      onClick={() =>
                        props.updateCart(item.idProduct, item.amount + 1)
                      }
                      style={{ paddingRight: "20px", cursor: "pointer" }}
                    >
                      <PlusCircleOutlined />
                    </span>
                    <span
                      onClick={() =>
                        props.updateCart(item.idProduct, item.amount - 1)
                      }
                      style={{ paddingRight: "20px", cursor: "pointer" }}
                    >
                      <MinusCircleOutlined />
                    </span>
                  </div>
                  <Divider />
                </>
              }
            />
          </List.Item>
        )
      }}
    />
  )
}
export default Cart

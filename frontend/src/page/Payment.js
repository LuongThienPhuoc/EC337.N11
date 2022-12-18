import { Layout, Menu, Row, Col, Skeleton, Button } from "antd"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import Cart from "./Cart"
import { AntDesignOutlined, UserOutlined } from "@ant-design/icons"
import { Avatar, Divider, Tooltip } from "antd"
import QRCode from "react-qr-code"
import { useEffect, useRef } from "react"
import socketIOClient from "socket.io-client"
import data from "./data.json"
import axios from "axios"

const { Header, Content, Footer } = Layout
const host = "https://payment-be.onrender.com/"
const Payment = () => {
  const navigate = useNavigate()
  const socketRef = useRef()
  const [users, setUser] = useState([])
  const [userSelect, setUserSelect] = useState(null)
  const [totalMoney, setTotalMoney] = useState(null)
  const [reRenderQr, setRenderQr] = useState(true)
  useEffect(() => {
    socketRef.current = socketIOClient.connect(host)
    socketRef.current.on("me", (id) => {
      socketRef.current.emit("admin-join", id)
    })
    socketRef.current.on("getListCart", (data) => {
      setUserSelect(
        data.users.find((cart) => cart.userIdSocket === data.idSocket)
      )
      setUser(data.users)
    })
    return () => {
      socketRef.current.disconnect()
    }
  }, [])
  useEffect(() => {
    setRenderQr(true)
    if (userSelect) {
      let total = 0
      userSelect.list.forEach((item) => {
        const filter = data.find((filter) => filter.id == item.idProduct)
        total += filter.price * item.amount
      })
      setTotalMoney(total)
    }
  }, [userSelect])
  useEffect(() => {
    if (totalMoney) {
      setRenderQr(false)
    }
  }, [totalMoney])

  const updateCart = (idProduct, amount) => {
    socketRef.current.emit("update-cart", {
      idSocket: userSelect.userIdSocket,
      idProduct,
      amount
    })
    let newList = [...users]
    newList = newList.map((user) => {
      if (user.userIdSocket === userSelect.userIdSocket) {
        if (amount === 0) {
          user.list = user.list.filter((item) => item.idProduct !== idProduct)
        } else {
          user.list = user.list.map((item) => {
            if (item.idProduct === idProduct) {
              item.amount = amount
            }
            return item
          })
        }
      }
      return user
    })
    setUser([...newList])
    const newUserSelect = newList.find(
      (user) => user.userIdSocket === userSelect.userIdSocket
    )
    setUserSelect({ ...newUserSelect })
    let total = 0
    newUserSelect.list.forEach((item) => {
      const filter = data.find((filter) => filter.id == item.idProduct)
      total += filter.price * item.amount
    })
    setTotalMoney(total)
  }

  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["3"]}
          items={[
            {
              key: 1,
              label: "Home",
              onClick: () => {
                navigate("/")
              }
            },

            {
              key: 3,
              label: "Payment",
              onClick: () => {
                navigate("/payment")
              }
            }
          ]}
        />
      </Header>
      <Content
        style={{
          padding: "0 50px"
        }}
      >
        <div className="site-layout-content">
          <Row style={{ marginTop: "50px" }} gutter={[16, 16]}>
            {/* <Col span={8}>
              {reRenderQr ? (
                <Skeleton active />
              ) : (
                <div
                  style={{
                    background: "black",
                    display: "flex",
                    borderRadius: "8px",
                    width: "100%",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "5px 10px"
                  }}
                >
                  <QRCode
                    size={256}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    viewBox={`0 0 256 256`}
                    value={String(totalMoney)}
                  />
                  <div
                    style={{
                      textAlign: "center",
                      color: "white",
                      margin: "5px 0",
                      fontWeight: "600",
                      fontSize: "2rem"
                    }}
                  >
                    SCAN ME
                  </div>
                </div>
              )}
            </Col> */}
            <Col span={6}>
              <Button
                type="primary"
                onClick={() => {
                  axios
                    .post("http://localhost:5000/momo", {
                      amount: totalMoney
                    })
                    .then((res) => {
                      console.log("res", res)
                      // navigate(res.data);
                      window.location.replace(res.data)
                    })
                  // axios
                  //   .post("http://localhost:5000/momo", {
                  //     amount: totalMoney
                  //   })
                  //   .then((res) => {
                  //     console.log("res", res)
                  //     // navigate(res.data);
                  //     if (res.data.length) window.location.replace(res.data)
                  //   })
                  const d = new Date()
                  d.setTime(d.getTime() + 30 * 24 * 60 * 60 * 1000)
                  let expires = "expires=" + d.toUTCString()
                  document.cookie = 0 + "=" + 0 + ";" + expires + ";path=/"
                }}
              >
                Go to payment
              </Button>
            </Col>
            <Col span={18}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <h1 style={{ marginBottom: "30px", paddingRight: "20px" }}>
                  Users:
                </h1>
                <Avatar.Group
                  maxCount={2}
                  maxStyle={{
                    color: "#f56a00",
                    backgroundColor: "#fde3cf",
                    marginBottom: "50px"
                  }}
                >
                  {users.map((user) => {
                    return (
                      <Tooltip
                        onClick={() => {
                          setUserSelect(user)
                        }}
                        title={user.userIdSocket}
                        placement="top"
                      >
                        <Avatar
                          size={50}
                          style={{
                            backgroundColor: "#f56a00",
                            cursor: "pointer"
                          }}
                        >
                          {user.userIdSocket}
                        </Avatar>
                      </Tooltip>
                    )
                  })}
                </Avatar.Group>
              </div>
              {userSelect && (
                <>
                  <Cart updateCart={updateCart} items={userSelect.list}></Cart>
                  <div
                    style={{
                      fontSize: "2rem",
                      fontWeight: "700",
                      color: "#95de64",
                      textAlign: "center"
                    }}
                  >
                    TOTAL: <span>{totalMoney}</span>
                  </div>
                </>
              )}
            </Col>
          </Row>
        </div>
      </Content>
      <Footer
        style={{
          textAlign: "center"
        }}
      >
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  )
}

export default Payment

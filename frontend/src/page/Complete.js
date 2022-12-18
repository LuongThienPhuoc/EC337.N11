import Typography from "antd/lib/typography/Typography"
import React from "react"
import { NavLink } from "react-router-dom"

export default function Complete() {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ textAlign: "center", marginTop: 100, fontSize: 40 }}>
        Giao dịch thành công
      </div>{" "}
      <NavLink to="/">Quay về trang chủ</NavLink>
    </div>
  )
}

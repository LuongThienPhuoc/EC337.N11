import React from "react"
import QRCode from "react-qr-code"
import data from "./data.json"
export default function Test() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {data.map((val) => {
        console.log("val.id", val.id)
        return (
          <div style={{ margin: 40 }}>
            <QRCode value={String(val.id)} />
          </div>
        )
      })}
    </div>
  )
}

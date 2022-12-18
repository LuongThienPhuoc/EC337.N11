import { Route, Routes } from "react-router-dom"

import Home from "./page/Home"
import Detail from "./page/Detail"
import Payment from "./page/Payment"
import Test from "./page/Test"
import Complete from "./page/Complete"

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home></Home>}></Route>
      <Route path="/detail/:id" element={<Detail></Detail>}></Route>
      <Route path="/payment" element={<Payment></Payment>}></Route>
      <Route path="/test" element={<Test />}></Route>
      <Route path="/complete" element={<Complete></Complete>}></Route>
    </Routes>
  )
}

export default Routers

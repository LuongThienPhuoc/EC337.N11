import { Route, Routes } from "react-router-dom";

import Home from "./page/Home";
import Detail from "./page/Detail";
import Payment from "./page/Payment";

const Routers = () => {
    return (
        <Routes>
            <Route path="/" element={<Home></Home>}></Route>
            <Route path="/detail/:id" element={<Detail></Detail>}></Route>
            <Route path="/payment" element={<Payment></Payment>}></Route>
        </Routes>
    )
}

export default Routers
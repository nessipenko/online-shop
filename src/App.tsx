import React from "react"
import {
    Route,
    Routes,

} from "react-router-dom"

import Header from "./components/Header/Header"
import Home from "./pages/home/Home"
import Basket from "./pages/basket/Basket"
import Card from "./pages/card/Card"
import Stock from "./components/Stock/Stock"
import Order from "./pages/order/Order"
import Delivery from "./pages/delivery/Delivery"

import 'animate.css';
import Footer from "./components/Footer/Footer"

function App() {
    return (
        <div className="App">
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/basket" element={<Basket />} />
                <Route path="/card/:id" element={<Card />} />
                <Route path="/stock" element={<Stock />} />
                <Route path="/order" element={<Order />} />
                <Route path="/delivery" element={<Delivery />} />
                <Route path="/products/:category" element={<Home />} />
            </Routes>
            <Footer />
        </div>
    )
}

export default App

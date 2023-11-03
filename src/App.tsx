import React from "react"
import Header from "./components/Header/Header.tsx"
import Home from "./pages/home/Home"
import Basket from "./pages/basket/Basket"
import Card from "./pages/card/Card.tsx"
import Stock from "./components/Stock/Stock"
import {
    Route,
    Routes,

} from "react-router-dom"
import Order from "./pages/order/Order"
import Delivery from "./pages/delivery/Delivery"

function App() {
    return (
        <div className="App">

            <Header/>
            <Routes>
                <Route path="/" element={<Home
                // 

                // searchProduct={searchProduct}
                // getBasket={getBasket}
                />} />
                <Route path="/basket" element={<Basket
                //  basket={basketProducts} 
                />} />
                <Route path="/card/:id" element={<Card />} />
                <Route path="/stock" element={<Stock />} />
                <Route path="/order" element={<Order />} />
                <Route path="/delivery" element={<Delivery />} />
                <Route path="/products/:category" element={<Home />} />

            </Routes>

        </div>
    )
}

export default App

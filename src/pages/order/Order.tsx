import React from 'react'

import './Order.scss'

const Order = () => {
    return (
        <div className="container">
            <div className="order">
                <h2 className='order__title'>Online Store - Purchase Conditions</h2>
                <p className='order__descr'>Thank you for choosing to shop with us! To ensure a smooth and enjoyable shopping experience, please take note of the following conditions:</p>

                <h3 className='order__subtitle'>Payment Methods:</h3>
                <ul className='order__list'>
                    <li>We accept payments via credit/debit cards (Visa, MasterCard, American Express) and PayPal.</li>
                    <li>All transactions are securely processed to safeguard your financial information.</li>
                </ul>
                <h3 className='order__subtitle'>Returns and Exchanges:</h3>
                <ul className='order__list'>
                    <li>We gladly accept returns and exchanges within 30 days of the purchase date.</li>
                    <li>Items must be in their original condition, with tags attached.</li>
                    <li>Customers are responsible for return shipping costs unless the return is due to a product defect or an error on our part.</li>
                </ul>

            </div>
        </div>
    )
}

export default Order


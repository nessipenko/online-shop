import React from 'react'

const Delivery = () => {
    return (
        <div className="container">
            <div className="delivery">
                <h3 className='order__subtitle'>Delivery Options:</h3>
                <ul className='order__list'>
                    <li>We offer standard and expedited shipping options.</li>
                    <li>Tracking information will be provided once your order is dispatched.</li>
                </ul>

                <h3 className='order__subtitle'> Shipping Times:</h3>
                <ul className='order__list'>
                    <li>Orders are typically processed within 1-2 business days.</li>
                    <li>Standard shipping times vary based on your location, ranging from 5 to 10 business days.</li>
                    <li>Expedited shipping options are available for faster delivery; shipping fees will be calculated at checkout.</li>
                </ul>

                <p className='order__descr'>By proceeding with your purchase, you acknowledge and agree to these conditions. If you have any questions or concerns, please don't hesitate to contact our customer service team. Happy shopping!</p>
            </div>
        </div>
    )
}
export default Delivery



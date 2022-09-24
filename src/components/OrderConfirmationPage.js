import React from "react";
import { Link } from "react-router-dom";

const OrderConfirmationPage = () => {
    return(
        <div>
            <div>Placeholder thank you message</div>
            <div>Thank you for your order! Review details in you <Link to="/account/orderhistory">order history</Link> page in account settings</div>
            <div>Can flesh this out further with more details; could pull last completed/processed order and display that information</div>
        </div>
    )
}

export default OrderConfirmationPage;
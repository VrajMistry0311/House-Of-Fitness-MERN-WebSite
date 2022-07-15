import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import { Link, useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import SideBar from "./Sidebar";

const ProcessOrder2 = () => {

    const navigate = useNavigate();

    const { shippingInfo, cartItems } = useSelector(state => state.cart);
    const { user } = useSelector(state => state.user);

    const subTotal = cartItems.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
    );

    const shippingCharges = subTotal >= 1000 ? 0 : 200;
    const tax = subTotal * 0.18;
    const totalPrice = subTotal + tax + shippingCharges;

    const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

    const processPayment = () => {
        const data = {
            subTotal,
            tax,
            shippingCharges,
            totalPrice
        };

        sessionStorage.setItem("orderInfo", JSON.stringify(data));

        navigate('/payment/process')
    }
    return (
        <Fragment>
            <MetaData title="Update Product" />
            <div className="dashboard">
                <SideBar />
                <div className="newProductContainer">
                    <div className="confirmOrderPage">
                        <div>
                            <div className="confirmShippingArea">
                                <Typography>Shipping Info</Typography>
                                <div className="confirmShippingAreaBox">
                                    <div>
                                        <p>Name:</p>
                                        <span>{user.name}</span>
                                    </div>
                                    <div>
                                        <p>Phone:</p>
                                        <span>{shippingInfo.phoneNo}</span>
                                    </div>
                                    <div>
                                        <p>Address:</p>
                                        <span>{address}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="confirmCartItems">
                                <Typography>Your Cart Items:</Typography>
                                <div className="confirmCartItemsContainer">
                                    {cartItems &&
                                        cartItems.map((item) => (
                                            <div key={item.product}>
                                                <img src={item.image} alt="Product" />
                                                <Link to={`/product/${item.product}`}>
                                                    {item.name}
                                                </Link>
                                                <span>
                                                    {item.quantity} X ₹{item.price} = <b>₹{item.price * item.quantity}</b>
                                                </span>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="orderSummary">
                                <Typography>Order Summary</Typography>
                                <div>
                                    <div>
                                        <p>Subtotal:</p>
                                        <span>₹{subTotal}</span>
                                    </div>
                                    <div>
                                        <p>Shipping Charges:</p>
                                        <span>₹{shippingCharges}</span>
                                    </div>
                                    <div>
                                        <p>GST:</p>
                                        <span>₹{tax}</span>
                                    </div>
                                    <div>
                                        <p>Subtotal:</p>
                                        <span>₹{subTotal}</span>
                                    </div>
                                </div>
                                <div className="orderSummaryTotal">
                                    <p>
                                        <b>Total:</b>
                                    </p>
                                    <span>₹{totalPrice}</span>
                                </div>

                                <button onClick={processPayment}>Proceed To Payment</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default ProcessOrder2
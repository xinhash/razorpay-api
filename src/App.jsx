import React, { useState } from "react";
import Axios from "axios";
import "./App.css";

function App() {
  async function paymentHandler(e) {
    e.preventDefault();
    const headers = {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmM0YTNiOWJjYmFlMjM1NDg0ZWU2NDgiLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE2MDkyNDMzMjgsImV4cCI6MTYwOTMyOTcyOH0.KRGveLHlOz0Z9ZRwfwfH7LA3YYtLEGAO4M7ozE3Av0s",
      "Content-Type": "application/json",
    };

    const API_URL = "http://134.209.148.127:8080/payments";
    const orderUrl = `${API_URL}/orders`;
    const response = await Axios.request({
      url: orderUrl,
      method: "post",
      headers,
      data: {
        amount: 50000,
        currency: "INR",
      },
    });
    const { data } = response;
    const options = {
      key: "rzp_test_AnaETLhxHO5yYf",
      name: "Your App Name",
      description: "Some Description",
      order_id: data.id,
      handler: async (response) => {
        try {
          const paymentId = response.razorpay_payment_id;
          const url = `${API_URL}/${paymentId}/capture`;
          console.log(url);
          const captureResponse = await Axios.request({
            method: "post",
            url,
            headers,
            data: {
              amount: 50000,
              currency: "INR",
            },
          });
          console.log(captureResponse);
        } catch (err) {
          console.log(err);
        }
      },
      theme: {
        color: "#686CFD",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  }

  return (
    <div>
      <button onClick={paymentHandler}>Pay Now</button>
    </div>
  );
}

export default App;

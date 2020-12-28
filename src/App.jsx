import React, { useState } from "react";
import Axios from "axios";
import "./App.css";

function App() {
  async function paymentHandler(e) {
    e.preventDefault();
    const headers = {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmM2M2Q1ZWY4OGFmYTU2MDkzY2Y5NzAiLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE2MDcwMDgxNTUsImV4cCI6MTYwNzA5NDU1NX0.qhXeK48puk2dXqgdZovGSvPp5X5iAA9g2NA75k8RKiY",
      "Content-Type": "application/json",
    };

    const API_URL = "http://localhost:4000/payments";
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
      key: "rzp_test_d9VJn7AdalPUKG",
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

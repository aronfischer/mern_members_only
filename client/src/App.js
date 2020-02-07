import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import Layout from "./core/Layout";
import axios from "axios";
import { isAuth, getLocalStorage } from "./auth/helpers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const App = () => {
  const [values, setValues] = useState({
    author: "",
    message: "",
    buttonText: "Send"
  });

  useEffect(() => {
    if (isAuth()) {
      setValues({
        ...values,
        author: isAuth().name
      });
    }
  }, []);

  const { author, message, buttonText } = values;

  const handleChange = event => {
    setValues({ ...values, message: event.target.value });
  };

  const clickSubmit = event => {
    event.preventDefault();
    setValues({ ...values, buttonText: "Sending" });

    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/create-message`,
      data: { author, message }
    })
      .then(response => {
        console.log("MESSAGE SENT SUCCESS", response);
        setValues({
          ...values,
          message: "",
          buttonText: "Send"
        });
        // toast.success(response.data.message);
      })
      .catch(error => {
        console.log("MESSAGE SENT ERROR", error.response.data);
        setValues({
          ...values,
          buttonText: "Send"
        });
        toast.error(error.response.data.error);
      });
  };

  const createMessageForm = () => (
    <form className='form'>
      <div className='form-group'>
        <textarea
          onChange={handleChange}
          value={message}
          type='text'
          className='form-control'
        />
      </div>
      <button className='btn btn-primary' onClick={clickSubmit}>
        {buttonText}
      </button>
    </form>
  );

  return (
    <Layout>
      <div className='col-md-6 mx-auto'>
        <ToastContainer />
        <h1 className='text-center my-5'>Members only message Board</h1>
        {isAuth().role === "subscriber" ? createMessageForm() : null}
      </div>
    </Layout>
  );
};

export default App;

import React, { useState, useEffect, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import Layout from "./core/Layout";
import axios from "axios";
import { isAuth, getLocalStorage } from "./auth/helpers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Message from "./message/Message";

const App = () => {
  const [values, setValues] = useState({
    message: "",
    messages: "",
    buttonText: "Send"
  });

  const { author, messages, message, buttonText } = values;

  useEffect(() => {
    // if (isAuth()) {
    //   setValues({ ...values, buttonText: "soth" });
    // }
    loadMessages();
  }, []);

  const loadMessages = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API}/message`
    })
      .then(response => {
        setValues({
          ...values,
          messages: response.data
        });
      })
      .catch(error => {
        console.log("GETTING MESSAGES FROM BACKEND ERROR", error);
      });
  };

  const handleChange = event => {
    setValues({ ...values, message: event.target.value });
  };

  const clickSubmit = event => {
    event.preventDefault();
    setValues({ ...values, buttonText: "Sending" });

    console.log("VALUES", values);

    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/message`,
      data: { author: isAuth().name, message }
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

  const displayMessages = () => (
    <Fragment>
      {messages !== ""
        ? messages.map(msg => {
            return <Message message={msg} key={msg._id} />;
          })
        : null}
    </Fragment>
  );

  return (
    <Layout>
      <div className='col-md-6 mx-auto'>
        <ToastContainer />
        <h1 className='text-center my-5'>Members only message Board</h1>
      </div>
      <div className='col-md-8 col-lg-6 mx-auto'>
        {displayMessages()}

        {isAuth() && isAuth().role === "subscriber"
          ? createMessageForm()
          : null}
      </div>
      <button onClick={() => console.log(messages)}>Test</button>
    </Layout>
  );
};

export default App;

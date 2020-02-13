import React, { useState, useEffect, Fragment, useRef } from "react";
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
    scroll: true,
    buttonText: "Send"
  });

  const { scroll, messages, message, buttonText } = values;

  useEffect(() => {
    loadMessages();
    return () => {
      setValues({
        ...values,
        scroll: true
      });
    };
  }, []);

  useEffect(() => {
    if (scroll === true) {
      scrollToBottom();
      setValues({
        ...values,
        scroll: false
      });
    }
  }, [scroll]);

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
    // setValues({ ...values, buttonText: "Sending" });

    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/message`,
      data: { author: isAuth().name, message }
    })
      .then(response => {
        console.log("MESSAGE SENT SUCCESS", response);
        setValues({
          ...values,
          message: ""
        });
        // toast.success(response.data.message);
      })
      .then(() => {
        loadMessages();
      })
      .catch(error => {
        console.log("MESSAGE SENT ERROR", error.response.data);
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

  const deleteMessage = msgId => {
    axios({
      method: "DELETE",
      url: `${process.env.REACT_APP_API}/message/${msgId}`,
      data: { msgId }
    })
      .then(response => {
        console.log("Message deleted");
        loadMessages();
        toast.success(response.data.message);
      })
      .catch(err => {
        console.log("ERROR WHEN DELETING A MESSAGE", err);
        toast.error(err.response.data.error);
      });
  };

  const scrollToEl = React.createRef();
  const scrollToBottom = () => {
    scrollToEl.current.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  };

  const displayMessages = () => {
    return (
      <Fragment>
        <div id='scrollContainer' className='af-card-container mb-3'>
          {messages !== ""
            ? messages.map(msg => {
                return (
                  <Message
                    message={msg}
                    key={msg._id}
                    deleteMessage={deleteMessage}
                  />
                );
              })
            : null}
          <div ref={scrollToEl} className='af-scrollTo'></div>
        </div>
      </Fragment>
    );
  };

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
    </Layout>
  );
};

export default App;

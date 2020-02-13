import React, { useState, useEffect, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import Layout from "../core/Layout";
import axios from "axios";
import { isAuth, getCookie, signout, updateUser } from "../auth/helpers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import MyMessages from "../message/MyMessages";

const Private = ({ history }) => {
  const [values, setValues] = useState({
    role: "",
    name: "",
    email: "",
    password: "",
    buttonText: "Submit",
    messages: ""
  });

  const token = getCookie("token");
  useEffect(() => {
    loadProfile();
    loadMessages();
  }, []);

  const loadProfile = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API}/user/${isAuth()._id}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        console.log("PRIVATE PROFILE UPDATE", response);
        const { role, name, email } = response.data;

        setValues({
          ...values,
          role,
          name,
          email
        });
      })
      .catch(error => {
        console.log("PRIVATE PROFILE UPDATE ERROR", error.response.data.error);
        if (error.response.status === 401) {
          signout(() => {
            history.push("/");
          });
        }
      });
  };

  const loadMessages = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API}/message/${isAuth()._id}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        console.log("GET PRIVATE MESSAGES SUCCESS", response);
        setValues({
          ...values,
          messages: response.data
        });
      })
      .catch(error => {
        console.log("GET PRIVATE MESSAGES ERROR", error.response.data.error);
      });
  };

  const { role, messages, name, email, password, buttonText } = values;

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = event => {
    event.preventDefault();
    setValues({ ...values, buttonText: "Submitting" });

    axios({
      method: "PUT",
      url: `${process.env.REACT_APP_API}/user/update`,
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: { name, password }
    })
      .then(response => {
        console.log("PRIVATE PROFILE UPDATE SUCCESS", response);
        updateUser(response, () => {
          setValues({
            ...values,
            buttonText: "Submitted"
          });
          toast.success("Profile updated successfully!");
        });
      })
      .catch(error => {
        console.log("PRIVATE PROFILE UPDATE ERROR", error.response.data.error);
        setValues({ ...values, buttonText: "Submit" });
        toast.error(error.response.data.error);
      });
  };

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

  const updateForm = () => (
    <form className='form'>
      <div className='form-group'>
        <label>Role</label>
        <input value={role} type='text' className='form-control' disabled />
      </div>
      <div className='form-group'>
        <label>Name</label>
        <input
          onChange={handleChange("name")}
          value={name}
          type='text'
          className='form-control'
        />
      </div>
      <div className='form-group'>
        <label>Email</label>
        <input value={email} type='email' className='form-control' disabled />
      </div>
      <div className='form-group'>
        <label>Password</label>
        <input
          onChange={handleChange("password")}
          value={password}
          type='password'
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
      <h1 className='text-center mt-5'>Private</h1>
      <div className='row'>
        <div className='col-md-6 mt-5 mx-auto'>
          <MyMessages deleteMessage={deleteMessage} messages={messages} />
        </div>
        <div className='col-md-6 mt-5 mx-auto'>
          <ToastContainer />
          <h3 className='text-center'>Profile Update</h3>
          {updateForm()}
        </div>
      </div>
    </Layout>
  );
};

export default Private;

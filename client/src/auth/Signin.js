import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Layout from "../core/Layout";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const Signin = () => {
  const [values, setValues] = useState({
    email: "aronfischersigl@googlemail.com",
    password: "123456",
    buttonText: "Submit"
  });

  const { email, password, buttonText } = values;

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = event => {
    event.preventDefault();
    setValues({ ...values, buttonText: "Submitting" });

    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/signin`,
      data: { email, password }
    })
      .then(response => {
        console.log("SIGNIN SUCCESS", response);
        setValues({
          ...values,
          email: "",
          password: "",
          buttonText: "Submitted"
        });
        toast.success(`Hey, ${response.data.user.name}, Welcome back!`);
      })
      .catch(error => {
        console.log("SIGNIN ERROR", error.response.data);
        setValues({ ...values, buttonText: "Submit" });
        toast.error(error.response.data.error);
      });
  };

  const signinForm = () => (
    <form className='form'>
      <div className='form-group'>
        <label>Email</label>
        <input
          onChange={handleChange("email")}
          value={email}
          type='email'
          className='form-control'
        />
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
      <div className='col-md-6 mx-auto'>
        <ToastContainer />
        <h1 className='text-center my-5'>Signin</h1>
        {signinForm()}
      </div>
    </Layout>
  );
};

export default Signin;

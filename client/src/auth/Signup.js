import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Layout from "../core/Layout";
import axios from "axios";
import { isAuth } from "./helpers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const Signup = () => {
  const [values, setValues] = useState({
    name: "Aron",
    email: "aronfischersigl@googlemail.com",
    password: "123456",
    buttonText: "Submit"
  });

  const { name, email, password, buttonText } = values;

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = event => {
    event.preventDefault();
    setValues({ ...values, buttonText: "Submitting" });

    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/signup`,
      data: { name, email, password }
    })
      .then(response => {
        console.log("SIGNUP SUCCESS", response);
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          buttonText: "Submitted"
        });
        toast.success(response.data.message);
      })
      .catch(error => {
        console.log("SIGNUP ERROR", error.response.data);
        setValues({ ...values, buttonText: "Submit" });
        toast.error(error.response.data.error);
      });
  };

  const signupForm = () => (
    <form className='form'>
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
        {isAuth() ? <Redirect to='/' /> : null}
        <h1 className='text-center my-5'>Signup</h1>
        {signupForm()}
      </div>
    </Layout>
  );
};

export default Signup;

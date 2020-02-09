/*

Not working yet, because email is required in model
1. Either create a random email and save it in the database,
2. Or change the required email field

--> I prefere option one, because then the functionality of signing up without an email is seperate and therefor easier to remove

--> PROBLEM: Signin ha to be changed as well, because you sign in with an email address

*/

import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Layout from "../core/Layout";
import axios from "axios";
import { isAuth } from "./helpers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const SignupWithoutEmail = () => {
  const [values, setValues] = useState({
    name: "",
    password: "",
    buttonText: "Submit"
  });

  const { name, password, buttonText } = values;

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = event => {
    event.preventDefault();
    setValues({ ...values, buttonText: "Submitting" });

    const email = `justARandomEmail${Math.random()}@web.de`;

    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/signup-without-email`,
      data: { name, email, password }
    })
      .then(response => {
        console.log("SIGNUP WITHOUT EMAIL SUCCESS", response);
        setValues({
          ...values,
          name: "",
          password: "",
          buttonText: "Submitted"
        });
        toast.success(response.data.message);
      })
      .catch(error => {
        console.log("SIGNUP WITHOUT EMAIL ERROR", error.response.data);
        setValues({ ...values, buttonText: "Submit" });
        toast.error(error.response.data.error);
      });
  };

  const signupForm = () => (
    <form className='form my-3'>
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
        <h1 className='text-center my-5'>Signup Without Email</h1>
        {signupForm()}
        <Link to='/auth/password/forgot' className='btn btn-outline-danger'>
          Forgot Password
        </Link>
      </div>
    </Layout>
  );
};

export default SignupWithoutEmail;

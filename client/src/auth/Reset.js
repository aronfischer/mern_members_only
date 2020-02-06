import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import jwt from "jsonwebtoken";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const Reset = ({ match }) => {
  const [values, setValues] = useState({
    name: "",
    token: "",
    newPassword: "",
    buttonText: "Reset password"
  });

  useEffect(() => {
    let token = match.params.token;
    let { name } = jwt.decode(token);
    if (token) {
      setValues({ ...values, name, token });
    }
  }, []);

  const { name, token, newPassword, buttonText } = values;

  const handleChange = event => {
    setValues({ ...values, newPassword: event.target.value });
  };

  const clickSubmit = event => {
    event.preventDefault();
    setValues({ ...values, buttonText: "Submitting" });

    axios({
      method: "PUT",
      url: `${process.env.REACT_APP_API}/reset-password`,
      data: { newPassword, resetPasswordLink: token }
    })
      .then(response => {
        console.log("RESET PASSWORD SUCCESS", response);
        toast
          .success(response.data.message)
          .setValues({ ...values, buttonText: "Done" });
      })
      .catch(error => {
        console.log("RESET PASSWORD ERROR", error.response.data);
        toast.error(error.response.data.error);
        setValues({ ...values, buttonText: "Reset password" });
      });
  };

  const resetPasswordForm = () => (
    <form className='form'>
      <div className='form-group'>
        <label>New Password</label>
        <input
          onChange={handleChange}
          value={newPassword}
          type='password'
          className='form-control'
          placeholder='Type new password'
          required
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
        <h1 className='text-center my-5'>Hey {name}, Type your new password</h1>
        {resetPasswordForm()}
      </div>
    </Layout>
  );
};

export default Reset;

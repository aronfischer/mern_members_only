import React from "react";
import "../style/message.css";
import { isAuth } from "../auth/helpers";

const Message = props => {
  const { message } = props;
  return (
    <div className='card border-0 p-0 my-2'>
      <div className='card-body m-0 py-2 col-md-8 border af-card'>
        <p className={`my-0 p-1 af-sec-msg ${isAuth() ? "af-blur" : ""}`}>
          {message.author}
        </p>
        <p className='my-0 p-1'>{message.message}</p>
        <p className='my-0 p-1 af-sec-msg'>{message.date}</p>
      </div>
    </div>
  );
};

export default Message;

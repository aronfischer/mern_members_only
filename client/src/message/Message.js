import React from "react";
import "../style/message.css";
import { isAuth } from "../auth/helpers";
import moment from "moment";

const Message = props => {
  const { message, deleteMessage } = props;
  return (
    <div className='card border-0 p-0 my-2 col-9 af-card'>
      <div className='card-header border-0 bg-transparent row mx-1 mb-0 pb-0'>
        <p
          className={`d-inline my-0 p-1 af-sec-msg ${
            !isAuth() ? "af-blur" : ""
          }`}
        >
          {message.author}
        </p>
        {isAuth() && isAuth().name === message.author ? (
          <i
            className='far fa-trash-alt ml-auto mt-1 '
            onClick={() => deleteMessage(message._id)}
          ></i>
        ) : null}
      </div>
      <div className='card-body m-0 pb-2 mt-0 pt-0 border-0'>
        <p className='my-0 p-1'>{message.message}</p>
        <p className='my-0 p-1 af-sec-msg'>
          {moment(message.createdAt).calendar()}
        </p>
      </div>
    </div>
  );
};

export default Message;

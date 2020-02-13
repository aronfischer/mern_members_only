import React from "react";
import Message from "./Message";

const MyMessages = props => {
  const { messages, deleteMessage } = props;

  return (
    <div>
      <h3>Private Message Board</h3>
      <div className='af-card-container mt-3'>
        {messages
          ? messages.map(message => {
              return (
                <Message
                  deleteMessage={deleteMessage}
                  key={message._id}
                  message={message}
                />
              );
            })
          : null}
      </div>
    </div>
  );
};

export default MyMessages;

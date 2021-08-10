import React from 'react';

export const MessageTemplate = ({ message }) => {
  return message ? <p className="error-msg">{message}</p> : "";
};


// src/renderEmail.js
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Order_Email from './Order_Email';
import Order_status_changes from './Order_status_changes';

export const renderWelcomeEmail = (order,type,status) => {
  console.log("oksofjor",order)
  return type == "1"
    ? ReactDOMServer.renderToStaticMarkup(<Order_Email order={order} />)
    : ReactDOMServer.renderToStaticMarkup(<Order_status_changes order={order} status={status} />);
};

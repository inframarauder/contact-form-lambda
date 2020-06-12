"use strict";

module.exports.staticSiteMailer = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(event.body, null, 2),
  };
};

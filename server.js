const axios = require("axios");
require("dotenv").config();
const { mongoose } = require("./db");
const baseUrl = "https://smsc.hubtel.com/v1/messages/send?";
const clientsecret = process.env.HUBTEL_CLIENTSECRET;
const clientid = process.env.HUBTEL_CLIENT_ID;
const senderId = "eliteinc";

const hubtell = async (send, message) => {
  try {
    const response = await axios.get(
      `${baseUrl}clientsecret=${clientsecret}&clientid=${clientid}&from=${senderId}&to=${send}&content=${message}`
    );

    const data = {
      statusCode: response.data.status,
      status: state(response.data.status),
      destinationNumber: send,
      textDecoded: message,
      messageId: response.data.messageId,
      date: response.headers.date,
    };
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
const state = (statusCode) => {
  if (statusCode === 0) {
    return "Success";
  }
  if (statusCode === 1) {
    return "done";
  }
};

module.exports = {
  hubtell,
};

import axios from "axios";

import { data } from "./data/data.mjs";

export const handler = async (event) => {

  const VERIFY_TOKEN = process.env.VERIFY_TOKEN;
  const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;

  let response;
  if (event?.requestContext?.http?.method === "POST") {

    let body = JSON.parse(event.body);
    let entries = body.entry;
    for (let entry of entries) {
      for (let change of entry.changes) {
        let value = change.value;
        if (value != null) {
          let phone_number_id = value.metadata.phone_number_id;
          // get the reciver number
          if (value.messages != null) {
            for (let message of value.messages) {
              const from = message.from;
              if (message.type === "text") {
                let message_body = message.text.body;
                //check whether the message is from one of the mobile numbers in reciever's list from db
                //get the whatsapp token from db
                //get the button set to reply from db
                let config = {
                    method: "post",
                    url: `https://graph.facebook.com/v17.0/${phone_number_id}/messages`,
                    headers: {
                      Authorization: `Bearer ${WHATSAPP_TOKEN}`,
                      "Content-Type": "application/json",
                    },
                    data: data,
                  };
                await axios.request(config);
                const responseBody = "Done";
                response = {
                  statusCode: 200,
                  body: JSON.stringify(responseBody),
                  isBase64Encoded: false,
                };
              }
            }
          } else if (value.statuses != null) {
            for (let status of value.statuses) {
              const newStatus = status.status;
              console.log(status.id);
              if (
                newStatus === "sent" ||
                newStatus === "delivered" ||
                newStatus === "read"
              ) {
                console.log(newStatus);
                const responseBody = "Done";
                response = {
                  statusCode: 200,
                  body: JSON.stringify(responseBody),
                  isBase64Encoded: false,
                };
              }
            }
          }
        }
      }
    }
  } else {
    const responseBody = "Unsupported method";
    response = {
      statusCode: 403,
      body: JSON.stringify(responseBody),
      isBase64Encoded: false,
    };
  }

  return response;
};



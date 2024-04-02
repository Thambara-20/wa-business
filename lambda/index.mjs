import axios from "axios";
import { sendInteractiveMessage } from "./buttons.mjs";

export const handler = async (event) => {
  const VERIFY_TOKEN = process.env.VERIFY_TOKEN;
  const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
  let buttons;

  let response;
  if (event?.requestContext?.http?.method === "GET") {

    let queryParams = event?.queryStringParameters;
    if (queryParams != null) {
      const mode = queryParams["hub.mode"];
      if (mode == "subscribe") {
        const verifyToken = queryParams["hub.verify_token"];
        if (verifyToken == VERIFY_TOKEN) {
          let challenge = queryParams["hub.challenge"];
          response = {
            statusCode: 200,
            body: parseInt(challenge),
            isBase64Encoded: false,
          };
        } else {
          const responseBody = "Error, wrong validation token";
          response = {
            statusCode: 403,
            body: JSON.stringify(responseBody),
            isBase64Encoded: false,
          };
        }
      } else {
        const responseBody = "Error, wrong mode";
        response = {
          statusCode: 403,
          body: JSON.stringify(responseBody),
          isBase64Encoded: false,
        };
      }
    } else {
      const responseBody = "Error, no query parameters";
      response = {
        statusCode: 403,
        body: JSON.stringify(responseBody),
        isBase64Encoded: false,
      };
    }
  }
  if (event?.requestContext?.http?.method === "POST") {
    let body = JSON.parse(event.body);
    let entries = body.entry;
    for (let entry of entries) {
      for (let change of entry.changes) {
        let value = change.value;
        if (value != null) {
          let phone_number_id = value.metadata.phone_number_id;
          const isValid = axios.get("https://api.example.com/validate", {
            // to be tested
            params: {
              phone_number: from,
              tel: phone_number_id,
            },
          });

          if (isValid) {
            buttons = axios.get(
              // to be tested
              `https://api.example.com/buttons/${phone_number}`
            );
          }
          if (value.messages != null) {
            for (let message of value.messages) {
              const from = message.from;
              if (message.type === "text") {
                let message_body = message.text.body;

                if (isValid && buttons) {
                  sendInteractiveMessage(
                    phone_number_id,
                    WHATSAPP_TOKEN,
                    from,
                    buttons
                  );
                }
              } else if (message.type === "interactive") {
                const button_id = message.interactive.button_reply.id;
                const mapping = buttons[button_id].mapping;
                const link = buttons[button_id].link;
                const data = axios.get(link); // to be tested
                const mappedData = data[mapping]; // to be tested
                await sendTextReply(
                  phone_number_id,
                  WHATSAPP_TOKEN,
                  from,
                  mappedData
                );
                const responseBody = "Done";
                response = {
                  statusCode: 200,
                  body: JSON.stringify(responseBody),
                  isBase64Encoded: false,
                };
              } else {
                console.log("unhandled message type.");
                console.log(message.type);
                console.log({ message });
                const responseBody = "Done";
                response = {
                  statusCode: 200,
                  body: JSON.stringify(responseBody),
                  isBase64Encoded: false,
                };
              }
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

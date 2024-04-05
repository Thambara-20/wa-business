import axios from "axios";
import { sendTextReply } from "./textReply.mjs";
import { sendInteractiveMessage } from "./buttonReply.mjs";

export const handler = async (event) => {
  const VERIFY_TOKEN = process.env.VERIFY_TOKEN;
  const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
  const BACKEND_URL = process.env.URL;

  let response;
  if (event?.requestContext?.http?.method === "GET") {
    let queryParams = event?.queryStringParameters;
    if (queryParams != null) {
      const mode = queryParams["hub.mode"];
      if (mode == "subscribe") {
        const verifyToken = queryParams["hub.verify_token"];
        if (verifyToken == VERIFY_TOKEN) {
          let challenge = queryParams["hub.challenge"];
          console.log("called verification");
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
  } else if (event?.requestContext?.http?.method === "POST") {
    // process POST request (WhatsApp chat messages)
    // https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks/payload-examples#text-messages
    // to learn about WhatsApp text message payload structure
    let body = JSON.parse(event.body);
    let entries = body.entry;
    for (let entry of entries) {
      for (let change of entry.changes) {
        let value = change.value;
        if (value != null) {
          let phone_number_id = value.metadata.phone_number_id;
          if (value.messages != null) {
            for (let message of value.messages) {
              const from = message.from;
              if (message.type === "text") {
                try {
                  let message_body = message.text.body;
                  console.log("called post method", phone_number_id, from);

                  const body = {
                    phoneId: phone_number_id,
                    from: "0766827280",
                  };

                  const response = await axios.post(
                    `${BACKEND_URL}/template/buttons`,
                    body
                  );

                  const templateName = response.data?.template?.name;

                  console.log("backend response", templateName);
                  const buttons = response.data?.buttons;
                  const waToken = response.data?.user?.whatsappToken;
                  console.log("buttons", buttons);

                  if (buttons.length > 3) {
                    let firstThreeButtons = buttons.slice(0, 3);
                    let otherButtons = buttons.slice(3);
                    await sendInteractiveMessage(
                      phone_number_id,
                      waToken,
                      from,
                      templateName,
                      firstThreeButtons
                    );
                    await sendInteractiveMessage(
                      phone_number_id,
                      waToken,
                      from,
                      templateName,
                      otherButtons
                    );
                  } else {
                    await sendInteractiveMessage(
                      phone_number_id,
                      waToken,
                      from,
                      templateName,
                      buttons
                    );
                  }

                  const responseBody = "Done";
                  return {
                    statusCode: 200,
                    body: JSON.stringify(responseBody),
                    isBase64Encoded: false,
                  };
                } catch (error) {
                  console.error("Error:", error);
                  return {
                    statusCode: 500,
                    body: JSON.stringify({ message: "Internal Server Error" }),
                    isBase64Encoded: false,
                  };
                }
              } else if (message.type === "interactive") {
                const button_id = message.interactive.button_reply.id;

                const body = {
                  phoneId: phone_number_id,
                  from: from,
                };

                const response = await axios.post(
                  `${url}/template/buttons`,
                  body,
                  {}
                );
                WHATSAPP_TOKEN = response.data.user.whatsappToken;
                buttons = response.data.buttons;
                console.log("buttons", buttons, "token", WHATSAPP_TOKEN);

                const button = buttons.find((b) => b.id === button_id);
                const mapping = button.mapping;
                const link = button.link;

                const data = await axios.get(link);
                const mappedData = mapDataToMessages(data, mapping);

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

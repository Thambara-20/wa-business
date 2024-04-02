import axios from "axios";

const defaultBody = [
  {
    text: "Welcome!",
    options: [
      { id: 1, text: "Health & Lifestyle", link: "www.google.com" },
      { id: 2, text: "Work Challenges", link: "www.google.com" },
      { id: 3, text: "Study Overwhelm", link: "www.google.com" },
    ],
  },
];
export const sendInteractiveMessage = async (
  phone_number_id,
  whatsapp_token,
  to,
  body = defaultBody
) => {
  try {
    const options = body[0].options;
    const texts = options.map((option) => option.text);

    let data = JSON.stringify({
      messaging_product: "whatsapp",
      to: to,
      type: "interactive",
      interactive: {
        type: "button",

        body: {
          text: "text",
        },

        action: {
          buttons: [
            {
              type: "reply",
              reply: {
                id: "1",
                title: texts[0],
              },
            },
            {
              type: "reply",
              reply: {
                id: "2",
                title: texts[1],
              },
            },
            {
              type: "reply",
              reply: {
                id: "3",
                title: texts[2],
              },
            },
          ],
        },
      },
    });

    let config = {
      method: "post",
      url: `https://graph.facebook.com/v17.0/${phone_number_id}/messages`,
      headers: {
        Authorization: `Bearer ${whatsapp_token}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    const waResponse = await axios.request(config);
    console.log(waResponse);
  } catch (error) {
    console.log({ error });
  }
};

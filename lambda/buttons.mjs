import axios from "axios";

const defaultBody = [
  { id: 1, text: "Lifestyle", link: "www.google.com", mapping: [] },
  { id: 2, text: "Work Challenges", link: "www.google.com", mapping: [] },
  { id: 3, text: "Study Overwhelm", link: "www.google.com", mapping: [] },
];

export const sendInteractiveMessage = async (
  phone_number_id,
  whatsapp_token,
  to,
  buttons = defaultBody
) => {
  try {

    let actionButtons = buttons.map((button, index) => ({
      type: "reply",
      reply: {
        id: (button.id).toString(),
        title: button.text,
      },
    }));

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
          buttons: actionButtons,
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

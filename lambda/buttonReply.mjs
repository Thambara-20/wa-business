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
    title,
    buttons = defaultBody
) => {
    try {
        console.log("called buttonReply")
        const actionButtons = buttons.map((button) => ({
            type: "reply",
            reply: {
                id: button.id.toString(),
                title: button.name,
            },
        }));

        console.log("action buttons in buttonReply", actionButtons);
        const data = {
            messaging_product: "whatsapp",
            to: to,
            type: "interactive",
            interactive: {
                type: "button",
                body: {
                    text: title.toString(),
                },
                action: {
                    buttons: actionButtons,
                },
            },
        };
        console.log("data in buttonReply", data)

        const response = await axios.post(
            `https://graph.facebook.com/v17.0/${phone_number_id}/messages`,
            data, {
                headers: {
                    Authorization: `Bearer ${whatsapp_token}`,
                    "Content-Type": "application/json",
                },
            }
        );

        console.log(response.data);
    }
    catch (error) {
        console.error("Error sending interactive message:", error);
    }
};

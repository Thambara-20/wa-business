import axios from "axios";

export const RequestManager = async (link, method, jsonBody, headers) => {
  let data;
  const headersList = {};
  headers?.map((header) => {
    headersList[header.key] = header.value;
  });
  if (
    method === "GET" ||
    method === null ||
    method === undefined ||
    method === ""
  ) {
    try {
      const response = await axios.get(link, {
        headers: {
          ...headersList,
          "Content-Type": "application/json",
        },
      });
      data = response.data;
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  if (method === "POST") {
    try {
      console.log(jsonBody, headersList);
      const response = await axios.post(link, jsonBody, {
        headers: {
          ...headersList,
          "Content-Type": "application/json",
        },
      });
      data = response.data;
      return data;
    } catch (error) {
      console.error("Error posting data:", error);
    }
  }
};

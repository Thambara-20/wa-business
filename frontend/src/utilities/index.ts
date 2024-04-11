import { GridRowsProp } from "@mui/x-data-grid";
import { AnyAsyncThunk } from "@reduxjs/toolkit/dist/matchers";

export const calculateAge = (dateOfBirth: Date) => {
  if (!dateOfBirth) {
    return null;
  }

  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};

export const formatDate = (value: string | null): string => {
  const dateObject = value ? new Date(value) : new Date();

  return dateObject
    ? `${dateObject.toLocaleDateString("en-US", { weekday: "short" })}
         ${dateObject.toLocaleDateString("en-US", { month: "short" })} 
         ${dateObject.toLocaleDateString("en-US", { day: "numeric" })} 
         ${dateObject.toLocaleDateString("en-US", { year: "numeric" })}`
    : "";
};

export const formatMobileDisplay = (mobile: string) => {
  const numericMobile = mobile.replace(/\D/g, "");
  if (numericMobile.startsWith("94")) {
    const formattedMobile = "0" + numericMobile.slice(2);

    return formattedMobile.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
  } else {
    return numericMobile
      .replace(/^\+/, "")
      .replace(/(\d{3})(\d{3})(\d{3,})/, "$1-$2-$3");
  }
};

export const generateNewId = (data: GridRowsProp) => {
  const maxId = data.reduce((max, item) => (item.id > max ? item.id : max), -1);
  return maxId + 1;
};

export const Columns = [
  "id",
  "name",
  "address",
  "gender",
  "mobile",
  "birthday",
  "age",
  "action",
];

export const emptyRows = [
  {
    id: 1,
    error: true,
  },
  {
    id: 2,
    error: true,
  },
  {
    id: 3,
    error: true,
  },
  {
    id: 4,
    error: true,
  },
  {
    id: 5,
    error: true,
  },
];

export enum NotificationTypes {
  LOGOUT_USER = "LOGOUT_USER",
  SUCCESS_REGISTER_OBSERVER = "SUCCESS_REGISTER_OBSERVER",
  SUCCESS_SEND_EMAIL = "SUCCESS_SEND_EMAIL",
  FAIL_SEND_EMAIL = "FAIL_SEND_EMAIL",
  SUCCESS_SAVE_TEMPLATE = "SUCCESS_SAVE_TEMPLATE",
  SUCCESS_SAVE_SETTINGS = "SUCCESS_SAVE_SETTINGS",
  SETTINGS_UPDATE_WARNING = "SETTINGS_UPDATE_WARNING",
  FAIL_SAVE_TEMPLATE = "FAIL_SAVE_TEMPLATE",
}

export const NotificationTexts: Record<NotificationTypes, string> = {
  [NotificationTypes.LOGOUT_USER]: "Are you sure you want to logout?",
  [NotificationTypes.SUCCESS_REGISTER_OBSERVER]:
    "Your account has been successfully created.",
  [NotificationTypes.SUCCESS_SEND_EMAIL]:
    "A password creation link has been sent to the provided email address.",
  [NotificationTypes.FAIL_SEND_EMAIL]:
    "Failed to send the password creation link. Please try again later.",
  [NotificationTypes.SUCCESS_SAVE_TEMPLATE]: "Template saved successfully.",
  [NotificationTypes.SUCCESS_SAVE_SETTINGS]:
    "Updated and saved Settings successfully.",
  [NotificationTypes.FAIL_SAVE_TEMPLATE]: "Failed to save the template.",
  [NotificationTypes.SETTINGS_UPDATE_WARNING]:
    "Please ensure that the settings are updated correctly to activate your account. Additionally, kindly provide the correct details to prevent any potential issues.",
};

export const mapDataToMessages = (jsonObj: any, keysToExtract: any) => {
  if (keysToExtract.length === 0) {
    if (Array.isArray(jsonObj)) {
      return formatJSON(JSON.stringify(jsonObj));
    }
    return formatJSON(JSON.stringify(jsonObj));
  } else {
    let extractedData = extractKeys(jsonObj, keysToExtract);
    console.log("Extracted data:", extractedData);
    return (extractedData as Array<any>).map((data) =>
      formatJSON(JSON.stringify(data))
    );
  }
};

function formatJSON(jsonString: any) {
  let result = "";
  let indent = 0;
  for (let i = 0; i < jsonString.length; i++) {
    const char = jsonString[i];
    if (char === "{" || char === "[") {
      result += char;
      indent++;
      result += "\n" + " ".repeat(indent * 4);
    } else if (char === "}" || char === "]") {
      indent--;
      result += "\n" + " ".repeat(indent * 4);
      result += char;
    } else if (char === ",") {
      result += char + "\n" + " ".repeat(indent * 4);
    } else {
      result += char;
    }
  }
  return result;
}

function extractKeys(jsonObj: any, keysToExtract: any) {
  let extractedData: any = {};

  function traverse(obj: any, path = "") {
    if (typeof obj === "object" && !Array.isArray(obj)) {
      for (let key in obj) {
        let newPath = path ? `${path}.${key}` : key;
        if (keysToExtract.includes(newPath)) {
          if (!extractedData[newPath]) {
            extractedData[newPath] = [];
          }
          extractedData[newPath].push(obj[key]);
        }
        traverse(obj[key], newPath);
      }
    } else if (Array.isArray(obj)) {
      obj.forEach((item, i) => {
        let newPath = `${path}[]`;
        traverse(item, newPath);
      });
    }
  }

  traverse(jsonObj);
  return Object.values(extractedData);
}

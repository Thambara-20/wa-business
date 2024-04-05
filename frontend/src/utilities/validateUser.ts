import { template } from "../redux/template/slice";

const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return email === "" || (emailRegex.test(email) && email.length <= 255);
};
const isValidName = (name: string) => {
  return name.length >= 0 && name.length <= 50;
};

const validatePassword = (inputPassword: string) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
  return (
    (passwordRegex.test(inputPassword) && inputPassword.length <= 30) ||
    inputPassword.length === 0
  );
};

const isValidphoneIdink = (link: any) => {
  const linkRegex = /^(http|https):\/\/[^ "]+$/;
  return (
    link != "" &&
    link != undefined &&
    link != null &&
    linkRegex.test(link) &&
    link.length <= 255
  );
};

const isValidTemplate = (template: template) => {
  return (
    template.name.length > 0 &&
    template.buttons.every((button) => {
      return button.name.length > 0 && isValidphoneIdink(button.link);
    })
  );
};

const isValidMobile = (mobile: string) => {
  const mobileRegex = /^\d{10}$/;
  return mobileRegex.test(mobile);
};

const isValideMobileNumberList = (mobileNumbers: string[]) => {
  return mobileNumbers.every((mobile) => isValidMobile(mobile));
};

export {
  isValidEmail,
  isValideMobileNumberList,
  isValidMobile,
  isValidName,
  validatePassword,
  isValidphoneIdink,
  isValidTemplate,
};

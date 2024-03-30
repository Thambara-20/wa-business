import * as React from "react";
import {
  Dialog,
  DialogContent,
  Typography,
  Button,
  Backdrop,
} from "@mui/material";
import styled from "styled-components";

interface ErrorPopupProps {
  open: boolean;
  onSubmit: () => void;
  onClose: () => void;
  type: string;
}

const ButtonWrapper = styled.div`
  padding: 20px 0 0 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const StyledBackdrop = styled(Backdrop)`
  background-color: rgba(0, 0, 0, 0.5) !important;
`;

const StyledDialogContent = styled(Dialog)`
  && {
    .MuiPaper-root.MuiDialog-paper {
      margin: 0 !important;
      border-radius: 10px;
      background-color: #fff;
      box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.2);
    }
  }

  && {
    .MuiDialogContent-root {
      padding: 20px !important;
      min-width: 350px !important;
    }
  }
`;

const StyledButton = styled(Button)`
  border-radius: 5px !important;
  margin-left: 8px !important;
  padding: 10px 20px !important;
`;

import { NotificationTypes, NotificationTexts } from "../../utilities";

const NotificationPopup: React.FC<ErrorPopupProps> = ({
  open,
  onClose,
  type,
  onSubmit,
}) => {
  let errorMessage = "";
  let buttonText = "";

  if (type === NotificationTypes.LOADING_DATA) {
    errorMessage = NotificationTexts[NotificationTypes.LOADING_DATA];
    buttonText = "OK";
  } else if (type === NotificationTypes.MISSING_FIELDS) {
    errorMessage = NotificationTexts[NotificationTypes.MISSING_FIELDS];
    buttonText = "Keep Editing";
  } else if (type === NotificationTypes.DISCARD_CHANGES || type === NotificationTypes.LOGOUT_USER) {
    errorMessage = NotificationTexts[type];
    buttonText = "Confirm";
  } else if (type === NotificationTypes.SUCCESS_REGISTER_OBSERVER || type === NotificationTypes.SUCCESS_SEND_EMAIL || type === NotificationTypes.FAIL_SEND_EMAIL) {
    errorMessage = NotificationTexts[type];
    buttonText = "OK";
  }

  function breakText(text: string) {
    if (text.length > 45) {
      const firstLine = text.substring(0, 45);
      const secondLine = text.substring(45);
      return `${firstLine}\n${secondLine}`;
    }
    return text;
  }

  return (
    <StyledBackdrop open={open}>
      <StyledDialogContent open={open} onClose={onClose}>
        <DialogContent>
          <Typography variant="body1">
            {errorMessage === NotificationTexts[NotificationTypes.SUCCESS_SEND_EMAIL]
              ? breakText(errorMessage)
              : errorMessage}
          </Typography>
          <ButtonWrapper>
            <StyledButton variant="contained" color="primary" onClick={onSubmit}>
              {buttonText}
            </StyledButton>
            <StyledButton variant="outlined" color="primary" onClick={onClose}>
              Dismiss
            </StyledButton>
          </ButtonWrapper>
        </DialogContent>
      </StyledDialogContent>
    </StyledBackdrop>
  );
};

export default NotificationPopup;


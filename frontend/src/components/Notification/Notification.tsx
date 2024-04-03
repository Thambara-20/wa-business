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
  background-color: rgba(0, 0, 0, 0.0) !important;
`;

const StyledDialogContent = styled(Dialog)`
  && {
    .MuiPaper-root.MuiDialog-paper {
      margin: 20px !important;
      border-radius: 20px;
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
  border-radius: 25px !important;
  margin-left: 8px !important;
  text-transform: none !important;
  min-width: 100px !important;
  padding: 5px 15px !important;
`;

const StyledTypography = styled(Typography)`
  font-size: 16px !important;
  justify-content: center !important;
  text-align: center !important;
  display: flex !important;
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

  if (type === NotificationTypes.LOGOUT_USER) {
    errorMessage = NotificationTexts[type];
    buttonText = "Confirm";
  } else if (type === NotificationTypes.SETTINGS_UPDATE_WARNING) {
    errorMessage = NotificationTexts[type];
    buttonText = "Change Settings";
  } else if (
    type === NotificationTypes.SUCCESS_SAVE_TEMPLATE ||
    type === NotificationTypes.SUCCESS_REGISTER_OBSERVER ||
    type === NotificationTypes.SUCCESS_SEND_EMAIL ||
    type === NotificationTypes.FAIL_SEND_EMAIL ||
    type === NotificationTypes.SUCCESS_SAVE_SETTINGS
  ) {
    errorMessage = NotificationTexts[type];
    buttonText = "OK";
  }

  return (
    <StyledBackdrop open={open}>
      <StyledDialogContent open={open} onClose={onClose}>
        <DialogContent>
          <StyledTypography variant="body1">{errorMessage}</StyledTypography>
          <ButtonWrapper>
            <StyledButton
              variant="contained"
              color="primary"
              onClick={buttonText === "OK" ? onClose : onSubmit}
            >
              {buttonText}
            </StyledButton>
            {buttonText != "OK" && (
              <StyledButton
                variant="outlined"
                color="primary"
                onClick={onClose}
              >
                Dismiss
              </StyledButton>
            )}
          </ButtonWrapper>
        </DialogContent>
      </StyledDialogContent>
    </StyledBackdrop>
  );
};

export default NotificationPopup;

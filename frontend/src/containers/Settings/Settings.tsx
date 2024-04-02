import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Snackbar,
  IconButton,
  Chip,
  Autocomplete,
  InputAdornment,
} from "@mui/material";
import Aos from "aos";
import {
  FileCopy as FileCopyIcon,
  CloudUpload as CloudUploadIcon,
} from "@mui/icons-material";
import styled from "styled-components";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { updateUser, updateUserSettings } from "../../redux/user/slice";
import LoadingComponent from "../../components/Loading/Loading";
import {
  getMobileNumbers,
  updateMobileNumbers,
} from "../../redux/template/slice";

const StyledButton = styled(Button)`
  border-radius: 20px !important;
  text-transform: none !important;
  width: 20% !important;
  min-width: 150px !important;
`;

const SettingsPage = () => {
  const allowedPhoneNumbers = useAppSelector(
    (state) => state.template.allowedMobileNumbers
  );
  const tel = useAppSelector((state) => state.user.tel);
  const socketId = useAppSelector((state) => state.user.socketId);
  const WhatsappToken = useAppSelector((state) => state.user.whatsappToken);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [webhookUrl, setWebhookUrl] = useState("");
  const [telError, setTelError] = useState(false);
  const [tokenError, setTokenError] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("webhook.json");
      setWebhookUrl(res.data.url);
    };

    dispatch(getMobileNumbers());
    fetchData();
  }, []);
  
  const validateFields = () => {
    let isValid = true;
    
    if (!WhatsappToken) {
      setTokenError(true);
      isValid = false;
    } else {
      setTokenError(false);
    }

    if (!tel) {
      setTelError(true);
      isValid = false;
    } else {
      setTelError(false);
    }

    if (allowedPhoneNumbers.length === 0) {
      setPhoneNumberError(true);
      isValid = false;
    } else {
      setPhoneNumberError(false);
    }

    return isValid;
  };

  const handleApiKeyChange = (event: any) => {
    const whatsappToken = event.target.value;
    dispatch(updateUser({ whatsappToken }));
    setTokenError(false);
  };

  const handleTelephoneChange = (event: any) => {
    const tel = event.target.value;
    dispatch(updateUser({ tel }));
    setTelError(false);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    if (!validateFields()) {
      return;
    }

    dispatch(
      updateUserSettings({
        phoneNumbers: allowedPhoneNumbers,
        whatsappToken: WhatsappToken,
        mobile: tel,
        socketId: socketId,
      })
    );
  };

  const handleRemovePhoneNumber = (phoneNumber: any) => {
    dispatch(
      updateMobileNumbers(
        allowedPhoneNumbers?.filter((number) => number !== phoneNumber)
      )
    );
  };

  const handleCopyButtonClick = () => { 
    navigator.clipboard.writeText(webhookUrl);
    setSnackbarMessage("Webhook URL copied to clipboard.");
    setSnackbarOpen(true);
  }

  useEffect(() => {
    Aos.init({
      duration: 1000,
    });
  }, []);

  if (allowedPhoneNumbers === undefined) {
    return <LoadingComponent />;
  }

  return (
    <Box
      maxWidth="md"
      style={{
        zIndex: 0,
        padding: "30px",
        backgroundColor: "#fff",
        borderRadius: "20px",
        width: "75%",
        boxShadow: "5px 5px 15px -5px rgba(0, 0, 0, 0.2)",
      }}
      data-aos="fade-up"
    >
      <Typography variant="h4" gutterBottom>
        Configurations
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box display="flex" alignItems="flex-start">
          <TextField
            fullWidth
            variant="outlined"
            disabled
            value={webhookUrl}
            style={{ marginBottom: "20px", marginRight: "8px" }}
            InputProps={{
              style: {
                borderRadius: "20px",
              },
              startAdornment: (
                <InputAdornment position="start">WebHook Url</InputAdornment>
              ),
            }}
          />
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            height="100%"
            margin={1}
          >
            <IconButton onClick={handleCopyButtonClick}>
              <FileCopyIcon />
            </IconButton>
          </Box>
        </Box>
        <TextField
          fullWidth
          variant="outlined"
          value={WhatsappToken}
          onChange={handleApiKeyChange}
          style={{ marginBottom: "20px" }}
          error={tokenError}
          helperText={ "API Key is required."}
          InputProps={{
            style: {
              borderRadius: "20px",
            },
            startAdornment: (
              <InputAdornment position="start">
                Your Whatsapp Token
              </InputAdornment>
            ),
          }}
        />{" "}
        <TextField
          fullWidth
          variant="outlined"
          value={tel}
          onChange={handleTelephoneChange}
          style={{ marginBottom: "20px" }}
          error={telError}
          helperText={ "Telephone number is required."}
          InputProps={{
            style: {
              borderRadius: "20px",
            },
            startAdornment: (
              <InputAdornment position="start">
                Your Whatsapp Number
              </InputAdornment>
            ),
          }}
        />
        <div>
          <Typography variant="subtitle1">
            Allowed Mobile Numbers:({allowedPhoneNumbers?.length})
          </Typography>
          <Autocomplete
            multiple
            freeSolo
            options={allowedPhoneNumbers as string[]}
            value={allowedPhoneNumbers}
            onChange={(event, newValue) => {
              dispatch(updateMobileNumbers(newValue));
            }}
            renderTags={(value) =>
              value.map((option, index) => (
                <Chip
                  key={index}
                  label={option}
                  color="primary"
                  onDelete={() => handleRemovePhoneNumber(option)}
                  style={{ margin: "8px 8px 8px ", backgroundColor: "grey" }}
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                multiline
                InputProps={{
                  ...params.InputProps,
                  style: {
                    borderRadius: "20px", // Adjust the border radius here for the TextField input
                  },
                }}
                style={{
                  marginBottom: "20px",
                  width: "100%",
                  maxHeight: "100px",
                  overflowY: "auto",
                  minHeight: "50px",
                }}
                error={phoneNumberError}
                helperText={ "At least one mobile number is required."}
              />
            )}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <label htmlFor="upload-numbers">
            <Button
              variant="contained"
              component="span"
              style={{
                borderRadius: "20px",
                textTransform: "none",
                minWidth: "20%",
              }}
              startIcon={<CloudUploadIcon />}
            >
              Upload Mobiles
            </Button>
          </label>
          <StyledButton variant="contained" color="primary" type="submit">
            Save
          </StyledButton>
        </div>
      </form>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={() => setSnackbarOpen(false)}
          >
            x
          </IconButton>
        }/>

    </Box>
  );
};

export default SettingsPage;

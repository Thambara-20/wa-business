import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Snackbar,
  FormControlLabel,
  Switch,
} from "@mui/material";
import Aos from "aos";

const SettingsPage = () => {
  const [webhookUrl, setWebhookUrl] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [autoLogoutEnabled, setAutoLogoutEnabled] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleWebhookUrlChange = (event: any) => {
    setWebhookUrl(event.target.value);
  };

  const handleApiKeyChange = (event: any) => {
    setApiKey(event.target.value);
  };

  const handleNotificationsToggle = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  const handleAutoLogoutToggle = () => {
    setAutoLogoutEnabled(!autoLogoutEnabled);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    // Validate input fields
    if (!webhookUrl || !apiKey) {
      setSnackbarMessage("WebHook URL and API Key are required.");
      setSnackbarOpen(true);
      return;
    }
    // Perform actions with webhookUrl and apiKey (e.g., save to database)
    console.log("Webhook URL:", webhookUrl);
    console.log("API Key:", apiKey);
    console.log("Notifications Enabled:", notificationsEnabled);
    console.log("Auto Logout Enabled:", autoLogoutEnabled);
    // Display success message
    setSnackbarMessage("Settings saved successfully.");
    setSnackbarOpen(true);
    // Clear input fields
    setWebhookUrl("");
    setApiKey("");
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    Aos.init({
      duration: 1000,
    });
  }, []);
  
  return (
    <Box
      maxWidth="md"
      style={{
        zIndex: 50,
        padding: "30px",
        backgroundColor: "#fff",
        borderRadius: "20px",
        width: "75%",
        boxShadow: "5px 5px 15px -5px rgba(0, 0, 0, 0.2)",
      }}
      data-aos="fade-up"
    >
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="WebHook URL"
          variant="outlined"
          value={webhookUrl}
          onChange={handleWebhookUrlChange}
          style={{ marginBottom: "20px" }}
        />
        <TextField
          fullWidth
          label="API Key"
          variant="outlined"
          value={apiKey}
          onChange={handleApiKeyChange}
          style={{ marginBottom: "20px" }}
        />
        <FormControlLabel
          control={
            <Switch
              checked={notificationsEnabled}
              onChange={handleNotificationsToggle}
            />
          }
          label="Enable Notifications"
          style={{ marginBottom: "20px" }}
        />
        <FormControlLabel
          control={
            <Switch
              checked={autoLogoutEnabled}
              onChange={handleAutoLogoutToggle}
            />
          }
          label="Enable Auto Logout"
          style={{ marginBottom: "20px" }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            variant="contained"
            type="submit"
            style={{ borderRadius: "20px", textTransform: "none" }}
          >
            Save Changes
          </Button>
        </div>
      </form>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </Box>
  );
};

export default SettingsPage;

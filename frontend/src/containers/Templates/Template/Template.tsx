import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  IconButton,
} from "@mui/material";
import { GridDeleteIcon } from "@mui/x-data-grid";

function TemplateCreationPage() {
  const [templateName, setTemplateName] = useState("");
  const [templateContent, setTemplateContent] = useState("");
  const [buttons, setButtons] = useState([{ text: "", link: "" }]);

  const handleTemplateNameChange = (event: any) => {
    setTemplateName(event.target.value);
  };

  const handleButtonTextChange = (index: any, event: any) => {
    const newButtons = [...buttons];
    newButtons[index].text = event.target.value;
    setButtons(newButtons);
  };

  const handleButtonLinkChange = (index: any, event: any) => {
    const newButtons = [...buttons];
    newButtons[index].link = event.target.value;
    setButtons(newButtons);
  };

  const handleAddButton = () => {
    setButtons([...buttons, { text: "", link: "" }]);
  };

  const handleDeleteButton = (index: number) => {
    if (buttons.length === 1) {
      return;
    }
    const newButtons = [...buttons];
    newButtons.splice(index, 1);
    setButtons(newButtons);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log("Template Name:", templateName);
    console.log("Template Content:", templateContent);
    console.log("Buttons:", buttons);
    setTemplateName("");
    setTemplateContent("");
    setButtons([{ text: "", link: "" }]);
  };

  return (
    <Box
      maxWidth="md"
      style={{
        padding: "1px 30px 20px 30px",
        margin: "20px 10px 0 10px",
        display: "flex",
        border: "1px #000",
        backgroundColor: "#f0f0f0",
        borderRadius: "20px",
        boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.4)",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        style={{ padding: "20px 10px 10px 10px" }}
      >
        Your Template
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid
          container
          spacing={3}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            maxHeight: "430px",
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          <Grid item xs={12}>
            <Typography variant="h6" style={{ textAlign: "start" }}>
              Template Name:
            </Typography>
            <TextField
              variant="outlined"
              fullWidth
              style={{
                margin: "10px 0",
                backgroundColor: "white",
                borderRadius: "5px",
              }}
              label="Template Name"
              value={templateName}
              onChange={handleTemplateNameChange}
              required
            />
          </Grid>
          <Grid item xs={12} style={{ padding: "0px 0px 10px 0px" }}>
            <Typography variant="h6" style={{ margin: "25px 0px 10px 25px" }}>
              Buttons: Max(6)
            </Typography>
            {buttons.map((button, index) => (
              <div
                key={index}
                style={{
                  margin: "10px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    margin: "0 0 0 20px",
                  }}
                >
                  <Typography variant="subtitle1">
                    Button {index + 1}:
                  </Typography>
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleDeleteButton(index)}
                  >
                    <GridDeleteIcon />
                  </IconButton>
                </div>
                <TextField
                  style={{ margin: "10px 0px 0 13px", width: "99%" }}
                  label="Button Text"
                  value={button.text}
                  onChange={(event: any) =>
                    handleButtonTextChange(index, event)
                  }
                  required
                />
                <TextField
                  style={{ margin: "10px 0px 0 13px", width: "99%" }}
                  label="Button Link"
                  type="url"
                  value={button.link}
                  onChange={(event) => handleButtonLinkChange(index, event)}
                  required
                />

                <div
                  style={{
                    height: "2px",
                    width: "100%",
                    backgroundColor: "grey",
                    margin: "10px 0 0 10px",
                  }}
                ></div>
              </div>
            ))}
          </Grid>
        </Grid>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "99.5%",
            padding: "20px 0",
          }}
        >
          <Button
            variant="contained"
            onClick={handleAddButton}
            style={{ width: "45%" }}
            disabled={buttons.length >= 6}
          >
            Add Button
          </Button>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            style={{ width: "45%" }}
          >
            Save Template
          </Button>
        </div>
      </form>
    </Box>
  );
}

export default TemplateCreationPage;

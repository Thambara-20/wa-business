import React, { useState } from "react";
import { TextField, Button, Typography, Box, Grid } from "@mui/material";

function TemplateCreationPage() {
  const [templateName, setTemplateName] = useState("");
  const [templateContent, setTemplateContent] = useState("");
  const [buttons, setButtons] = useState([{ text: "", link: "" }]);

  const handleTemplateNameChange = (event: any) => {
    setTemplateName(event.target.value);
  };

  const handleTemplateContentChange = (event: any) => {
    setTemplateContent(event.target.value);
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
        padding: "20px 10px 20px 10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Typography variant="h4" gutterBottom style={{ padding: "0 10px 20px 10px" }}>
        Create Template
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid
          container
          spacing={3}
          style={{
            maxHeight: "400px",
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Template Name"
              value={templateName}
              onChange={handleTemplateNameChange}
              required
            />
          </Grid>

          <Grid item xs={12} style={{ padding: "25px 0px 10px 0px" }}>
            <Typography variant="h6" style={{ margin: "25px 0px 10px 25px" }}>
              Buttons:
            </Typography>
            {buttons.map((button, index) => (
              <div key={index} style={{ margin: "10px" }}>
                <TextField
                  style={{ margin: "10px 0px 0 13px", width: "99.5%"}}
                  label="Button Text"
                  value={button.text}
                  onChange={(event: any) =>
                    handleButtonTextChange(index, event)
                  }
                  required
                />
                <TextField
                  style={{ margin: "10px 0px 0 13px", width: "99.5%"}}
                  label="Button Link"
                  type="url"
                  value={button.link}
                  onChange={(event) => handleButtonLinkChange(index, event)}
                  required
                />
              </div>
            ))}
          </Grid>
        </Grid>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            padding: "20px 0px 20px 0px",
          }}
        >
          <Button variant="contained" onClick={handleAddButton}>
            Add Button
          </Button>
          <Button variant="contained" color="primary" type="submit">
            Save Template
          </Button>
        </div>
      </form>
    </Box>
  );
}

export default TemplateCreationPage;

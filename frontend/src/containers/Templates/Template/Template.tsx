import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  IconButton,
} from "@mui/material";
import { EditOutlined } from "@mui/icons-material";
import { GridDeleteIcon } from "@mui/x-data-grid";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  updatetemplate,
  updateButton,
  deleteButton,
} from "../../../redux/template/slice";
import InputAdornment from "@mui/material/InputAdornment";

const TemplateBox = styled(Box)`
  max-width: md;
  padding: 1px 30px 20px 30px;
  margin: 20px 10px 0 10px;
  display: flex;
  background-color: #f0f0f0;
  border-radius: 20px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.4);
  flex-direction: column;
  justify-content: center;

  @media (max-width: 700px) {
    margin: 0px 10px;
  }
`;

const TemplateTypography = styled(Typography)`
  padding: 20px 10px 10px 10px;
  display: flex;
  justify-content: space-between;
  @media (max-width: 700px) {
   padding: 15px 0
  }
`;

const StyledTextField = styled(TextField)<{ editable: any }>`
  margin: 10px 0px 0 13px !important;
  width: 99%;
  
  background-color: ${({ editable }) => (editable ? "white" : "lightgray")};
  border-radius: 5px;
`;

const Divider = styled.div`
  height: 2px;
  width: 99%;
  background-color: grey;
  margin: 10px 0 0 10px;
`;

const StyledButton = styled(Button)`
  width: 45%;
  border-radius: 20px !important;
  text-transform: none !important;


  @media (max-width: 700px) {
    width: 48%;
  }
`;

const EditText = styled.div`
  display: flex;
  font-size: 19px;
  color: 'blue'!important;
  justify-content: center;
  align-items: center;
  margin: 0 10px;
`;

function TemplateCreationPage() {
  const [editable, setEditable] = useState(false);
  const template = useAppSelector((state) => state.template);
  const buttons = useAppSelector((state) => state.template.buttons);
  const dispatch = useAppDispatch();

  const handleTemplateNameChange = (event: any) => {
    dispatch(updatetemplate({ name: event.target.value }));
  };

  const handleButtonTextChange = (index: any, event: any) => {
    dispatch(updateButton({ _id: index, name: event.target.value }));
  };

  const handleButtonLinkChange = (index: any, event: any) => {
    dispatch(updateButton({ _id: index, link: event.target.value }));
  };

  const handleAddButton = () => {
    const id = Math.max.apply(
      Math,
      buttons.map(function (button) {
        return button._id;
      })
    );
    dispatch(
      updatetemplate({
        buttons: [...buttons, { _id: id + 1, link: "", name: "Test", type: "" }],
      })
    );
  };

  const handleDeleteButton = (index: any) => {
    if (buttons.length === 1) {
      return;
    }
    dispatch(deleteButton(index));
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log("Template Name:", template.name);
    console.log("Buttons:", buttons);
    // API call to save the template

    setEditable(!editable);
    // setTemplateName("");
    // setButtons([{ text: "", link: "" }]);
  };

  return (
    <TemplateBox>
      <TemplateTypography variant="h4" gutterBottom>
        Your Template
        {!editable && (
          <IconButton onClick={() => setEditable(!editable)}>
            <EditOutlined />
            <EditText >Edit</EditText>
          </IconButton>
        )}
      </TemplateTypography>
      <form onSubmit={handleSubmit}>
        <Grid
          container
          spacing={3}
          style={{ height: "420px", overflowY: "auto" }}
        >
          <Grid item xs={12}>
            <Typography variant="h6" style={{ textAlign: "start" }}>
              Template Name:
            </Typography>
            <TextField
              variant="outlined"
              style={{
                margin: "10px 0",
                width: "99.5%",
              }}
              value={template.name}
              onChange={handleTemplateNameChange}
              required
              InputLabelProps={{ hidden: true }}
              disabled={!editable}
            />
          </Grid>
          <Grid item xs={12} style={{ padding: "0px 0px 10px 0px" }}>
            <Typography variant="h6" style={{ margin: "25px 0px 10px 25px" }}>
              Buttons: Max(6)
            </Typography>
            {buttons.map((button, index) => (
              <div
                key={button._id}
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
                    onClick={() => handleDeleteButton(button._id)}
                  >
                    <GridDeleteIcon />
                  </IconButton>
                </div>
                <StyledTextField
                  value={button.name}
                  onChange={(event) =>
                    handleButtonTextChange(button._id, event)
                  }
                  required
                  disabled={!editable}
                  editable={editable}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        Button text
                      </InputAdornment>
                    ),
                  }}
                />
                <StyledTextField
                  type="url"
                  value={button.link}
                  onChange={(event) =>
                    handleButtonLinkChange(button._id, event)
                  }
                  required
                  disabled={!editable}
                  editable={editable}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        Button link
                      </InputAdornment>
                    ),
                  }}
                />

                <Divider />
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
          <StyledButton
            variant="contained"
            onClick={handleAddButton}
            disabled={buttons.length >= 6 || !editable} // Disable when not editable
          >
            Add Button
          </StyledButton>
          <StyledButton variant="contained" color="primary" type="submit">
            Save Template
          </StyledButton>
        </div>
      </form>
    </TemplateBox>
  );
}

export default TemplateCreationPage;

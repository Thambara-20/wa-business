import React, { useEffect, useState } from "react";
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
  saveTemplate,
} from "../../../redux/template/slice";
import InputAdornment from "@mui/material/InputAdornment";
import Aos from "aos";

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
    margin: 0 10px;
    justify-content: flex-end;
  }
`;

const TemplateTypography = styled(Typography)`
  padding: 20px 10px 10px 10px;
  display: flex;
  justify-content: space-between;
  @media (max-width: 700px) {
    padding: 15px 0;
  }
`;

const StyledTextField = styled(TextField)<{ editable: any }>`
  margin: 10px 0px 0 13px !important;
  width: 99%;

  background-color: ${({ editable }) => (editable ? "white" : "lightgray")};
  border-radius: 20px;
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
  color: "blue" !important;
  justify-content: center;
  align-items: center;
  margin: 0 10px;
`;

const StyledButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 99.5%;
  padding: 20px 0;
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
    dispatch(updateButton({ id: index, name: event.target.value }));
  };

  const handleButtonLinkChange = (index: any, event: any) => {
    dispatch(updateButton({ id: index, link: event.target.value }));
  };

  const handleAddButton = () => {
    const id = Math.max.apply(
      Math,
      buttons.map(function (button) {
        return button.id;
      })
    );
    dispatch(
      updatetemplate({
        buttons: [...buttons, { id: id + 1, link: "", name: "Test", type: "" }],
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

    dispatch(saveTemplate(template));

    setEditable(!editable);
    // setTemplateName("");
    // setButtons([{ text: "", link: "" }]);
  };
  useEffect(() => {
    Aos.init({
      duration: 1000,
    });
  }, []);

  return (
    <TemplateBox data-aos="fade-up">
      <TemplateTypography variant="h4" gutterBottom>
        Your Template
        {!editable && (
          <IconButton onClick={() => setEditable(!editable)}>
            <EditOutlined />
            <EditText>Edit</EditText>
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
              InputProps={{
                style: {
                  borderRadius: "20px",
                },
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
              <Box
                key={button.id}
                style={{
                  margin: "10px",
                }}
              >
                <Box
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
                    onClick={() => handleDeleteButton(button.id)}
                  >
                    <GridDeleteIcon />
                  </IconButton>
                </Box>
                <StyledTextField
                  value={button.name}
                  onChange={(event) => handleButtonTextChange(button.id, event)}
                  required
                  disabled={!editable}
                  editable={editable}
                  InputProps={{
                    style: {
                      borderRadius: "20px",
                    },
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
                  onChange={(event) => handleButtonLinkChange(button.id, event)}
                  required
                  disabled={!editable}
                  editable={editable}
                  InputProps={{
                    style: {
                      borderRadius: "20px",
                    },
                    startAdornment: (
                      <InputAdornment position="start">
                        Button link
                      </InputAdornment>
                    ),
                  }}
                />
                <Divider />
              </Box>
            ))}
          </Grid>
        </Grid>
        <StyledButtonWrapper>
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
        </StyledButtonWrapper>
      </form>
    </TemplateBox>
  );
}

export default TemplateCreationPage;

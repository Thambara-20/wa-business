import React, { isValidElement, useEffect, useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  IconButton,
  Chip,
  Autocomplete,
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
import {
  isValidTemplate,
  isValidateLink,
} from "../../../utilities/validateUser";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
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

const StyledTextField = styled(TextField)<{ editable: any; title?: any }>`
  margin: ${({ title }) =>
    title ? "10px 0px 5px 0px !important;" : "10px 0px 5px 13px !important;"};
  width: 99%;

  background-color: ${({ editable }) => (editable ? "white" : "lightgray")};
  border-radius: 20px;

  &.Mui-error {
    border-color: darkred;
  }

  & + .error-message {
    position: relative;
    color: darkred;
    font-size: 0.8rem;
    width: 99%;
    margin: 2px 0 0 20px;
    padding: 0;
    display: block;
  }

  textarea {
    height: auto;
    min-height: 40px;
    max-height: 192px;
    overflow-y: auto;
  }
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
  width: 100%;
  padding: 20px 0;
`;

function TemplateCreationPage() {
  const [editable, setEditable] = useState(false);
  const template = useAppSelector((state) => state.template);
  const buttons = useAppSelector((state) => state.template.buttons);
  const socketId = useAppSelector((state) => state.user.socketId);
  const dispatch = useAppDispatch();
  const [mappingInput, setMappingInput] = useState("");

  const handleTemplateNameChange = (event: any) => {
    dispatch(updatetemplate({ name: event.target.value }));
  };

  const handleButtonTextChange = (index: any, event: any) => {
    dispatch(updateButton({ id: index, name: event.target.value }));
  };

  const handleButtonLinkChange = (index: any, event: any) => {
    dispatch(updateButton({ id: index, link: event.target.value }));
  };


  const handleDeleteMapping = (button: any, mapping: any) => {
    dispatch(
      updateButton({
        id: button.id,
        mapping: button.mapping.filter((item: any) => item !== mapping),
      })
    );
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
        buttons: [
          ...buttons,
          { id: id + 1, link: "", name: "Test", mapping: [] },
        ],
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
    if (!editable) {
      return;
    }
    const data = {
      template: template,
      socketId: socketId,
    };
    dispatch(saveTemplate(data));
    setEditable(!editable);
  };
  useEffect(() => {
    Aos.init({
      duration: 1000,
    });
    console.log("Template", template);
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
          style={{ height: "420px", overflowY: "auto", maxWidth: "120vh" }}
        >
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
            }}
          >
            <Typography variant="h6" style={{ textAlign: "start" }}>
              Template Name:
            </Typography>
            <StyledTextField
              fullWidth
              variant="outlined"
              InputProps={{
                style: {
                  borderRadius: "20px",
                },
              }}
              value={template.name}
              onChange={handleTemplateNameChange}
              error={template.name === ""}
              InputLabelProps={{ hidden: true }}
              editable={editable}
              title={true}
              disabled={!editable}
            />
            {template.name.length < 1 && (
              <div className="error-message">Name cannot be empty.</div>
            )}
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
                  error={button.name === ""}
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
                  error={!isValidateLink(button.link)}
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
                <Autocomplete
                  multiple
                  style={{
                    width: "99%",
                  }}
                  freeSolo
                  autoComplete={false}
                  disabled={!editable}
                  options={[] as string[]}
                  value={button.mapping}
                  onChange={(event: any, newValue: any) => {
                    if (button.mapping === null) {
                      dispatch(
                        updateButton({
                          id: button.id,
                          mapping: [newValue[newValue.length - 1]],
                        })
                      );
                    }
                    dispatch(
                      updateButton({
                        id: button.id,
                        mapping: newValue,
                      })
                    );
                  }}
                  renderTags={(value: any) =>
                    value.map((option: any, index: any) => (
                      <Chip
                        key={index}
                        label={option}
                        color="primary"
                        disabled={!editable}
                        onDelete={() => handleDeleteMapping(button, option)}
                        style={{
                          margin: "8px 8px 8px 8px",
                          backgroundColor: "grey",
                        }}
                      />
                    ))
                  }
                  renderInput={(params: any) => (
                    <StyledTextField
                      {...params}
                      disabled={!editable}
                      editable={editable}
                      
                      placeholder={(button.mapping===null || button.mapping.length===0) && "Mappings: Any" }
                      InputProps={{
                        ...params.InputProps,
                        disabled: !editable,
                        style: {
                          borderRadius: "20px",
                          autoComplete: "disabled",
                        },
                      }}
                      style={{
                        marginBottom: "20px",
                        width: "100%",
                        maxHeight: "100px",
                        overflowY: "auto",
                      }}
                    />
                  )}
                />

                <div className="error-message">
                  {!isValidateLink(button.link) && button.name.length >= 1 && (
                    <span>Please enter a valid link.</span>
                  )}
                  {button.name.length < 1 && isValidateLink(button.link) && (
                    <span>Please enter a valid name.</span>
                  )}
                  {!isValidateLink(button.link) && button.name.length < 1 && (
                    <span>Please enter a valid link and name.</span>
                  )}
                </div>

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
          <StyledButton
            variant="contained"
            color="primary"
            type="submit"
            disabled={isValidTemplate(template) && editable ? false : true}
          >
            Save Template
          </StyledButton>
        </StyledButtonWrapper>
      </form>
    </TemplateBox>
  );
}

export default TemplateCreationPage;

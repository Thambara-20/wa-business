import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Grid, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";

import { useEffect, useState } from "react";
import styled from "styled-components";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import TemplateCreationPage from "./Template/Template";
import MobileScreenWithButton from "./Mobile/Mobile";

export const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 100vh;
`;

export const ContainerWrapper = styled.div`
  display: flex;
  border-radius: 20px;
  flex-direction: row;
  width: 100%;
  height: 85vh;
  justify-content: space-around;
  align-items: center;

  @media (max-width: 700px) {
    flex-direction: column;
  }
`;
export const ButtonWrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  width: 100%;
  height: auto;
  justify-content: flex-end;
  align-items: center;
  padding: 0 20px;
`;


const StyledDialogContent = styled(Dialog)`
  && {
    .MuiPaper-root.MuiDialog-paper {
      margin: 0 !important;
      border-radius: 20px;
    }

  && {
    .MuiDialogContent-root {
        padding: 15px 20px 15px 20px !important;
        min-width: 300px !important;
      }}
`;

const TemplatesPage = () => {
  const templates = [
    "Template 1",
    "Template 2",
    "Template 3",
    "Template 4",
    "Template 5",
    "Template 6",
    "Template 7",
    "Template 8",
    "Template 9",
    "Template 10",
    "Template 7",
    "Template 8",
    "Template 9",
    "Template 10",
  ];

  const [openDialog, setOpenDialog] = useState(false);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Container style={{ height: "100vh" }}>
      <Typography
        variant="h4"
        gutterBottom
        style={{ padding: "10px 10px 10px 10px" }}
      >
        Templates
      </Typography>
      <Grid container spacing={2} style={{ height: "60vh" }}>
        {templates.map((template, index) => (
          <Grid item key={index} xs={12} md={6} lg={4}>
            <Link
              to={`/templates/${index + 1}`}
              style={{ textDecoration: "none" }}
            >
              <Button
                variant="outlined"
                fullWidth
                startIcon={<EditIcon />}
                style={{ borderRadius: "20px", textTransform: "none" }}
              >
                {template}
              </Button>
            </Link>
          </Grid>
        ))}
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
          style={{
            borderRadius: "20px",
            textTransform: "none",
            position: "fixed",
            bottom: "20px",
            right: "20px",
          }}
        >
          Create New Template
        </Button>
      </Grid>
      <StyledDialogContent
        open={openDialog}
        onClose={handleCloseDialog}
        sx={{ minWidth: "90vw" }}
        maxWidth={false}
        style={{borderRadius: "20px"}}
      >
        <DialogContent>
          <ContainerWrapper>
            <MobileScreenWithButton />
            <TemplateCreationPage />
          </ContainerWrapper>
        </DialogContent>
      </StyledDialogContent>
    </Container>
  );
};

export default TemplatesPage;

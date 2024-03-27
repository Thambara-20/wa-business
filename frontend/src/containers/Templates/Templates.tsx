import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Grid, Typography } from "@mui/material";

import styled from "styled-components";
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
  margin-top: 30px;
  flex-direction: row;
  width: 100%;
  height: auto;
  justify-content: space-around;
  align-items: center;

  @media (max-width: 800px) {
    flex-direction: column;
    margin-top: 50px;

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


const TemplatesPage = () => {

  return (
    <Container style={{ height: "100vh" }}>
      <Grid container spacing={2} style={{ height: "100vh" }}>
        <ContainerWrapper>
          <MobileScreenWithButton />
          <TemplateCreationPage />
        </ContainerWrapper>
      </Grid>
    </Container>
  );
};

export default TemplatesPage;

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
  height: 100%;
  min-height: 100vh;
`;

export const ContainerWrapper = styled.div`
  display: flex;
  border-radius: 20px;
  margin-top: 0px;
  flex-direction: row;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  justify-content: space-around;
  align-items: center;

  @media (max-width: 700px) {
    flex-direction: column;
    justify-content: center;
    margin-top: 20px;
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
    <ContainerWrapper>
      <TemplateCreationPage />
      <MobileScreenWithButton />
    </ContainerWrapper>
  );
};

export default TemplatesPage;

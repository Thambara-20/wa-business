import React, { useEffect } from "react";
import styled from "styled-components";
import Appbar from "../../components/Appbar/Appbar";
import TemplateCreationPage from "../Templates/Template/Template";
import MobileScreenWithButton from "../Templates/Mobile/Mobile";
import TemplatesPage from "../Templates/Templates";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "../../components/PrivateRoute/PrivateRoute";
import { Paths } from "../../App";
import HomePage from "./Home";

export const HomeWarpper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 100vh;
`;

export const ContainerWrapper = styled.div`
  display: flex;
  background-color: #f5f5f5;
  border-radius: 20px;
  flex-direction: row;
  width: 100%;
  height: 100vh;
  margin-top: 55px;
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

export default function Home() {
  return (
    <HomeWarpper>
      <Appbar />
      <ContainerWrapper>
        <HomePage />
      </ContainerWrapper>
    </HomeWarpper>
  );
}

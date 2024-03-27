import styled from "styled-components";
import Appbar from "../../components/Appbar/Appbar";
import SettingsPage from "./Settings";

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

export default function Settings() {
  return (
    <HomeWarpper>
      <Appbar />
      <ContainerWrapper>
        <SettingsPage />
      </ContainerWrapper>
    </HomeWarpper>
  );
}

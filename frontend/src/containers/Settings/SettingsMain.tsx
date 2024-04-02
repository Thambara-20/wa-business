import styled from "styled-components";
import Appbar from "../../components/Appbar/Appbar";
import  SettingsPage  from "./Settings";
import Footer from "../Footer/Footer";
import "aos/dist/aos.css";

export const HomeWarpper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 100vh;
`;

export const ContainerWrapper = styled.div`
  display: flex;
  background-color: #e0e0e0;
  flex-direction: row;
  width: 100%;
  min-height: 90vh;
  margin-top: 55px;
  justify-content: space-around;
  align-items: center;

  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

export default function Settings() {
  return (
    <HomeWarpper>
      <Appbar />
      <ContainerWrapper>
        <SettingsPage />
      </ContainerWrapper>
      <Footer />
    </HomeWarpper>
  );
}

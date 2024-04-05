import styled from "styled-components";
import Appbar from "../../components/Appbar/Appbar";
import SettingsPage from "./Settings";
import Footer from "../Footer/Footer";
import "aos/dist/aos.css";
import GuideComponent from "./Guide";

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
  height: 100%;
  margin-top: 55px;
  justify-content: center;
  align-items: center;
  background: #f0f0f0;
  background-image: url("./settings.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.6);
  }

  @media (max-width: 750px) {
    flex-direction: column;
    min-height: 160vh;
    margin-top: 10px;
    justify-content: flex-start;

`;

export default function Settings() {
  return (
    <HomeWarpper>
      <Appbar />
      <ContainerWrapper>
        <GuideComponent />
        <SettingsPage />
      </ContainerWrapper>
      <Footer />
    </HomeWarpper>
  );
}

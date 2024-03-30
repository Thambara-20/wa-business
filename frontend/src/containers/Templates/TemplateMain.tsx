import styled from "styled-components";
import Appbar from "../../components/Appbar/Appbar";
import TemplatesPage from "./Templates";
import Footer from "../Footer/Footer";

export const HomeWarpper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 100vh;
`;

export const ContainerWrapper = styled.div`
  display: flex;
  border-radius: 20px 20px 0px 0px;
  flex-direction: row;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  margin-top: 15px;
  justify-content: center;
  align-items: center;
  background: #f0f0f0;
  background-image: url("./mobile.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.2);
  }

  @media (max-width: 900px) {
    flex-direction: column;
    min-height: 165vh;
    align-items: flex-end;
  }

  @media (max-width: 400px) {
    min-height: 190vh;
    align-items: flex-end;
  }
`;

export default function Templates() {
  return (
    <HomeWarpper>
      <Appbar />
      <ContainerWrapper>
        <TemplatesPage />
      </ContainerWrapper>
      <Footer />
    </HomeWarpper>
  );
}
